const { TiposUsuarios } = require("../sequelize");

module.exports = function (router) {

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });

    router.get("/api/getalltiposusuarios", async (req, res) => {
        console.log('pasó por getalltiposusuarios')
        TiposUsuarios.findAll().then(tiposusuarios => { res.json(tiposusuarios) })
    });

    router.put("/api/updatetipousuario", (req, res) => {
        console.log('pasó por updatetipousuario')
        TiposUsuarios.update(req.body, { where: { Id: req.body.Id } }).then(tipousuario => { res.json('Registro actualizado') })
    });

    router.put("/api/newtipousuario", (req, res) => {
        console.log('pasó por newtipousuario')
        TiposUsuarios.create(req.body).then(newtipousuario => { res.json(newtipousuario) })
    });

    router.delete("/api/deletetipousuario/:id", (req, res) => {
        console.log('pasó por deletetipousuario')
        if (req.params.id === null) {
            res.json('No viene el id');
            return;
        }
        TiposUsuarios.destroy({ where: { Id: req.params.id } }).then(tipousuario => { res.json('Registro eliminado') })
    });


}