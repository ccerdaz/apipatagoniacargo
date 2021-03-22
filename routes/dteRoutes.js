const { Ordenes, Clientes } = require('../sequelize');
const axios = require('axios');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const variables = require('../variables.json')
const headers = { 'apikey': variables.apikey }
const Emisor = variables.Emisor

module.exports = function (router) {

  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

  //Crea una factura en base a los datos de una OT
  router.get('/api/newdtebyot/:ot', (req, res) => {
    console.log('pasó por newdtebyot')
    let ot = req.params.ot
    Ordenes.findOne({ where: { NumeroOT: ot } })
      .then(orden => {
        let idReceptorFactura
        let receptor

        // Identifica quien paga para extraer los datos para facturación
        if (orden.PagaRemitente) {
          idReceptorFactura = orden.IdRemitente
          
        }
        else {
          idReceptorFactura = orden.IdCliente
        }


        let receptor = {
          RUTRecep: orden.RutDestinatario,
          RznSocRecep: orden.Destinatario,
          GiroRecep: orden.GiroDestinatario,
          DirRecep: ARTURO PRAT 527 3 pis OF 1,
          CmnaRecep: Curicó
        }
        res.json('ok')
      })
  });


}



