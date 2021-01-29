const { TiposObservaciones } = require("../sequelize");

module.exports = function (router) {

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });

    router.get("/api/getalltiposobservaciones", async (req, res) => {
        console.log('pasó por getalltiposobservaciones')
        TiposObservaciones.findAll().then(tiposobservaciones => { res.json(tiposobservaciones) })
    });

    router.put("/api/updatetipoobservacion", (req, res) => {
        console.log('pasó por updatetipoobservacion')
        TiposObservaciones.update(req.body, { where: { Id: req.body.Id } }).then(tipoobservacion => { res.json('Registro actualizado') })
    });

    router.post("/api/newtipoobservacion", (req, res) => {
        console.log('pasó por newtipoobservacion')
        TiposObservaciones.create(req.body).then(newtipoobservacion => { res.json(newtipoobservacion) })
    });

    router.delete("/api/deletetipoobservacion/:id", (req, res) => {
        console.log('pasó por deleteipoobservacion')
        if (req.params.id === null) {
            res.json('No viene el id');
            return;
        }
        TiposObservaciones.destroy({ where: { Id: req.params.id } }).then(tipoobservacion => { res.json('Registro eliminado') })
    });


}