const { Manifiestos, Ordenes } = require("../sequelize");
var Sequelize = require('sequelize');

module.exports = function (router) {

  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

  router.get("/api/getallmanifiestos", async (req, res) => {
    console.log('pasó por getallmanifiestos')
    Manifiestos.findAll({
      order: [['NumeroManifiesto', 'desc']]
    }).then(manifiestos => { res.json(manifiestos) })
  });

  router.put("/api/updatemanifiesto", (req, res) => {
    console.log('pasó por updatemanifiesto')
    console.log('req.body', req.body);
    Manifiestos.update(req.body, { where: { Id: req.body.Id } }).then(cliente => { res.json('Registro actualizado') })
  });

  router.post("/api/newmanifiesto", (req, res) => {
    console.log('pasó por newmanifiesto')
    let manifiesto = req.body.manifiesto
    let ordenes = req.body.ordenes

    // Verifica que no exista el número de manifiesto
    Manifiestos.findOne({ where: { NumeroManifiesto: manifiesto.NumeroManifiesto } })
      .then(man => {
        if (man != null) {
          res.status(403).json('El número de Orden se Servicio (N° manifiesto) ya existe');
          return
        } 
        else {
          //Crea el manifiesto
          Manifiestos.create(manifiesto).then(newmanifiesto => { res.json(newmanifiesto) }) 

          // Actualiza las OT indicando el número de Manifiesto
          Ordenes.bulkCreate(ordenes, { updateOnDuplicate: ['ManifiestoAsignado'] }).then(updated => { console.log('Ordenes updated'); })
        }
      })

  });

  router.delete("/api/deletemanifiesto/:id", (req, res) => {
    console.log('pasó por deletemanifiesto')
    if (req.params.id === null) {
      res.json('No viene el id');  
      return;
    }
    Manifiestos.destroy({ where: { Id: req.params.id } }).then(cliente => { res.json('Registro eliminado') })
  });


}