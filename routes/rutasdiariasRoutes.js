const { RutasDiarias } = require("../sequelize");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const metodos = require('../metodos')

module.exports = function (router) {

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });

    router.get("/api/getallrutasdiarias", async (req, res) => {
        console.log('pasó por getallrutasdiarias')
        RutasDiarias.findAll({
            where: {
                Estado: { [Op.ne]: 'COMPLETADO' } 
            }
        }).then(rutasdiarias => { res.json(rutasdiarias) })
    });

    router.get("/api/getrutadiariabyid/:id", async (req, res) => {
        console.log('pasó por getrutadiariabyid:', req.params.id)
        RutasDiarias.findOne({
            where: {
                Id: req.params.id,
            }
        }).then(rutasdiarias => { res.json(rutasdiarias) })
    });

    router.put("/api/updaterutadiaria", (req, res) => {
        console.log('pasó por updaterutadiaria')
        console.log('req.body', req.body);
        RutasDiarias.update(req.body, { where: { Id: req.body.Id } }).then(rutadiaria => { res.json('Registro actualizado') })
    });

    router.post("/api/newrutadiaria", (req, res) => {
        console.log(req.body.Fecha);
        req.body.Fecha = new Date(req.body.Fecha + ' 12:00:00')
        console.log(req.body.Fecha);

        console.log('pasó por newrutadiaria')
        RutasDiarias.create(req.body).then(newrutadiaria => { res.json(newrutadiaria) })
    });

    router.delete("/api/deleterutadiaria/:id", (req, res) => {
        console.log('pasó por deleterutadiaria')
        if (req.params.id === null) {
            res.json('No viene el id');
            return;
        }
        RutasDiarias.destroy({ where: { Id: req.params.id } }).then(rutadiaria => { res.json('Registro eliminado') })
    });


}