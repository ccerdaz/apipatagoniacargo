const { Remitentes } = require("../sequelize");

module.exports = function (router) {

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });

    router.get("/api/getallremitentes", async (req, res) => {
        console.log('pasó por getallremitentes')
        Remitentes.findAll({
            order: [['NombreComun', 'asc']]
        }).then(remitentes => { res.json(remitentes) })
    });

    router.put("/api/updateremitente", (req, res) => {
        console.log('pasó por updateremitente')
        Remitentes.update(req.body, { where: { Id: req.body.Id } }).then(remitente => { res.json('Registro actualizado') })
    });

    router.post("/api/newremitente", (req, res) => {
        console.log('pasó por newremitente')
        Remitentes.create(req.body).then(newremitente => { res.json(newremitente) })
    });

    router.delete("/api/deleteremitente/:id", (req, res) => {
        console.log('pasó por deleteremitente. Id: ', req.params.id)
        if (req.params.id === null) {
            res.json('No viene el id');
            return;
        }
        Remitentes.destroy({ where: { Id: req.params.id } }).then(remitente => { res.json('Registro eliminado') })
    });


}