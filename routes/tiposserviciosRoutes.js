const { TiposServicios } = require("../sequelize");

module.exports = function (router) {

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });

    router.get("/api/getalltiposservicios", async (req, res) => {
        console.log('pasó por getalltiposervicios')
        TiposServicios.findAll({order: ['NombreServicio']}).then(tiposservicios => { res.json(tiposservicios) })
    });

    router.put("/api/updatetiposervicio", (req, res) => {
        console.log('pasó por updatetiposervicio')
        TiposServicios.update(req.body, { where: { Id: req.body.Id } }).then(tiposervicio => { res.json('Registro actualizado') })
    });

    router.post("/api/newtiposervicio", (req, res) => {
        console.log('pasó por newtiposervicio')
        TiposServicios.create(req.body).then(newtiposervicio => { res.json(newtiposervicio) })
    });

    router.delete("/api/deletetiposervicio/:id", (req, res) => {
        console.log('pasó por deletetiposervicio')
        if (req.params.id === null) {
            res.json('No viene el id');
            return;
        }
        TiposServicios.destroy({ where: { Id: req.params.id } }).then(tiposervicio => { res.json('Registro eliminado') })
    });


}