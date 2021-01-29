const { Mensajeros } = require("../sequelize");

module.exports = function (router) {

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });

    router.get("/api/getallmensajeros", async (req, res) => {
        console.log('pasó por getallmensajeros')
        Mensajeros.findAll().then(mensajeros => { res.json(mensajeros) })
    }); 

    router.put("/api/updatemensajero", (req, res) => {
        console.log('pasó por updatemensajero')
        Mensajeros.update(req.body, { where: { Id: req.body.Id } }).then(cliente => { res.json('Registro actualizado') })
    });

    router.post("/api/newmensajero", (req, res) => {
        console.log('pasó por newmensajero')
        Mensajeros.create(req.body).then(newmensajero => { res.json(newmensajero) })
    });

    router.delete("/api/deletemensajero/:id", (req, res) => {
        console.log('pasó por deletemensajero')
        if (req.params.id === null) {
            res.json('No viene el id');
            return;
        }
        Mensajeros.destroy({ where: { Id: req.params.id } }).then(mensajero => { res.json('Registro eliminado') })
    });


}