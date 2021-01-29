const { Tarifas } = require("../sequelize");

module.exports = function (router) {

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });

    router.get("/api/getalltarifas", async (req, res) => {
        console.log('pasó por getalltarifas')
        Tarifas.findAll().then(tarifas => { res.json(tarifas) })
    });

    router.put("/api/updatetarifa", (req, res) => {
        console.log('pasó por updatetarifa')
        Tarifas.update(req.body, { where: { Id: req.body.Id } }).then(cliente => { res.json('Registro actualizado') })
    });

    router.post("/api/newtarifa", (req, res) => {
        console.log('pasó por newtarifa')
        Tarifas.create(req.body).then(newtarifa => { res.json(newtarifa) })
    });

    router.delete("/api/deletetarifa/:id", (req, res) => {
        console.log('pasó por deletetarifa')
        if (req.params.id === null) {
            res.json('No viene el id');
            return;
        }
        Tarifas.destroy({ where: { Id: req.params.id } }).then(tarifa => { res.json('Registro eliminado') })
    });


}