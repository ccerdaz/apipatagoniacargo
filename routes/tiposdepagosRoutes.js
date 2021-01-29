const { Tiposdepago } = require("../sequelize");

module.exports = function (router) {

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });

    router.get("/api/getalltiposdepagos", async (req, res) => {
        console.log('pasó por getalltiposdepagos')
        Tiposdepago.findAll().then(tiposdepago => { res.json(tiposdepago) })
    });

    router.put("/api/updatetipodepago", (req, res) => {
        console.log('pasó por updatetipodepago')
        Tiposdepago.update(req.body, { where: { Id: req.body.Id } }).then(cliente => { res.json('Registro actualizado') })
    });

    router.post("/api/newtipodepago", (req, res) => {
        console.log('pasó por newtipodepago')
        Tiposdepago.create(req.body).then(newtipodepago => { res.json(newtipodepago) })
    });

    router.delete("/api/deletetipodepago/:id", (req, res) => {
        console.log('pasó por deletetipodepago')
        if (req.params.id === null) {
            res.json('No viene el id');
            return;
        }
        Tiposdepago.destroy({ where: { Id: req.params.id } }).then(tipodepago => { res.json('Registro eliminado') })
    });


}