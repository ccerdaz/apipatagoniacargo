const { Ordenes, Clientes, Remitentes, Documentos, Articulos } = require('../sequelize');
const axios = require('axios');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const variables = require('../variables.json')
const headers = { 'apikey': variables.apikey }
const emisor = variables.Emisor
const fs = require('fs')

var dateFormat = require('dateformat');

module.exports = function (router) {

  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

  //Crea una factura en base a los datos de una OT
  router.post('/api/newdtebyot', async (req, res) => {
    console.log('pasó por newdtebyot')
    let ot = req.body.ot
    let descripcion = req.body.descripcion
    let fecha = req.body.fecha
    let pagaremitente = req.body.pagaremitente
    let orden = await getOrden(ot)
    let idOrden = orden.Id
    let cliente
    if (pagaremitente)
      cliente = await getReceptorRemitente(orden.IdRemitente)
    else
      cliente = await getReceptorCliente(orden.IdCliente)

    if (cliente.Rut == '' || cliente.Rut == null) {
      res.status(403).json('El receptor de la factura no tiene información de RUT. Actualice la información en el mantenedor respectivo')
      return
    }

    if (cliente.RazonSocial == '' || cliente.RazonSocial == null) {
      res.status(403).json('El receptor de la factura no tiene información de Razón Social. Actualice la información en el mantenedor respectivo')
      return
    }

    if (cliente.Giro == '' || cliente.Giro == null) {
      res.status(403).json('El receptor de la factura no tiene información de Giro. Actualice la información en el mantenedor respectivo')
      return
    }

    if (cliente.Direccion == '' || cliente.Direccion == null) {
      res.status(403).json('El receptor de la factura no tiene información de Direccion. Actualice la información en el mantenedor respectivo')
      return
    }

    if (cliente.Comuna == '' || cliente.Comuna == null) {
      res.status(403).json('El receptor de la factura no tiene información de Comuna. Actualice la información en el mantenedor respectivo')
      return
    }

    let receptor = {
      RUTRecep: cliente.Rut.toString().replace('.', '').replace('.', ''),
      RznSocRecep: cliente.RazonSocial,
      GiroRecep: cliente.Giro,
      DirRecep: cliente.Direccion,
      CmnaRecep: cliente.Comuna
    }
    console.log('receptor', receptor);

    let iddoc = {
      TipoDTE: 33,
      Folio: 0,
      FchEmis: dateFormat(new Date(), 'yyyy-mm-dd'),
      TpoTranCompra: 1,
      TpoTranVenta: 1,
      FmaPago: 1
    }

    let totales = {
      MntNeto: orden.Neto,
      TasaIVA: '19',
      IVA: orden.Iva,
      MntTotal: orden.Total,
      MontoPeriodo: orden.Total,
      VlrPagar: orden.Total
    }

    let detalle = {
      NroLinDet: 1,
      NmbItem: descripcion,
      QtyItem: 1,
      PrcItem: orden.Neto,
      MontoItem: orden.Neto
    }

    let encabezado = {
      IdDoc: iddoc,
      Emisor: emisor,
      Receptor: receptor,
      Totales: totales
    }

    let data = {
      response: ["FOLIO"],
      dte: {
        Encabezado: encabezado,
        Detalle: [detalle]
      }
    }

    axios.post(variables.rutaHaulmer + 'document', data, { headers: headers })
      .then(function (response) {
        let folio = response.data.FOLIO;
        let token = response.data.TOKEN;
        let tipoDTE = data.dte.Encabezado.IdDoc.TipoDTE
        // console.log('folio', folio);
        // res.json(folio)
        generaPDF(folio, tipoDTE, token)
        Ordenes.update({ NumeroFactura: folio, FechaFactura: fecha, Token: token, TipoDTE: tipoDTE }, { where: { Id: idOrden } })
          .then(updated => {
            console.log('Factura emitida')
            res.json({ folio: folio })
          })
      })
      .catch(function (error) {
        // res.json('error', error)
        if ('response' in error) {
          if ('data' in error.response) {
            console.log('Error:', error.response.data);
            console.log('Details:', error.response.data.error.details);
          }
        }
        else {
          console.log(error);
        }
      });
  })



}

function revisaCampo() {

}

async function getOrden(ot) {
  return Ordenes.findOne({
    where: { NumeroOT: ot },
    include: [
      { model: Documentos, as: 'Documentos' },
      { model: Articulos, as: 'Articulos' },
    ]
  })
    .then(orden => {
      return orden
    })
    .catch(err => {
      console.log(err);
    })
}

async function getReceptorCliente(id) {
  return Clientes.findByPk(id)
    .then(cliente => {
      return cliente
    })
    .catch(err => {
      console.log(err);
    })
}
async function getReceptorRemitente(id) {
  return Remitentes.findByPk(id)
    .then(remitente => {
      return remitente
    })
    .catch(err => {
      console.log(err);
    })
}

function generaPDF(folio, tipo, token) {

  let rutEmisor = emisor.RUTEmisor
  axios.get(variables.rutaHaulmer + 'document/' + rutEmisor + '/' + tipo + '/' + folio + '/pdf', { headers: headers })
    .then(function (response) {
      //console.log('response', response);
      var Base64 = require('js-base64').Base64;

      let bin = Base64.atob(response.data.pdf);
      let filename = 'F' + folio + '_T' + tipo + '_' + token + '.pdf'

      fs.writeFile('../admin/dtes/' + filename, bin, 'binary', error => {
        if (error) {
          console.log('Error al tratar de guardar el archivo PDF');
          throw error;
        } else {
          console.log('binary saved!');
        }
      });
    })
    .catch(function (error) {
      console.log('Pasó por error de creación de PDF');
      if ('data' in error.response) { 
        console.log('Error:', error.response.data);
        if ('error' in error.response.data) {
          console.log('error:', error.response.data.error);
          if ('details' in error.response.data.error)
            console.log('Details:', error.response.data.error.details);
        }
      } else {
        console.log(error);
      }
    });
}
