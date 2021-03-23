const { Clientes, Remitentes, Ordenes } = require("../sequelize");
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

    router.get("/api/getallclientes", async (req, res) => {
        console.log('pasó por getallclientes')
        Clientes.findAll({
            order: [['NombreComun', 'asc']]
        }).then(clientes => { res.json(clientes) })
    });

    router.get("/api/getnumeros", async (req, res) => {
        console.log('pasó por getnumeros')
        let totalClientes
        let totalRemitentes

        let h = new Date()
        let desde = new Date(h.getFullYear(), h.getMonth(), h.getDate(), 0, 0, 0)
        let hasta = new Date(h.getFullYear(), h.getMonth(), h.getDate(), 23, 59, 59)

        // let primerDiaMes = new Date(h.getFullYear(), h.getMonth(), 1, 0, 0, 0)
        // let ultimoDiaMes = new Date(h.getFullYear(), h.getMonth(), metodos.getLastDayOfMonth(h.getMonth()), 23, 59, 59)

        Clientes.count().then(clientes => {
            totalClientes = clientes
            Remitentes.count().then(remitentes => {
                totalRemitentes = remitentes

                Ordenes.count({
                    where: {
                        FechaRetiro: { [Op.between]: [desde, hasta] } 
                    }
                }).then(ordenes => {

                    res.json({
                        clientes: totalClientes,
                        remitentes: totalRemitentes,
                        rutadiaria: ordenes
                    })
                })

            })
        })
    });

    router.put("/api/updatecliente", (req, res) => {
        console.log('pasó por updatecliente')
        console.log('req.body', req.body);
        req.body.Rut = req.body.Rut.trim()
        Clientes.update(req.body, { where: { Id: req.body.Id } }).then(cliente => { res.json('Registro actualizado') })
    });

    router.post("/api/newcliente", (req, res) => {
        console.log('pasó por newcliente')
        Clientes.create(req.body).then(newcliente => { res.json(newcliente) })
    });

    router.delete("/api/deletecliente/:id", (req, res) => {
        console.log('pasó por deletecliente')
        if (req.params.id === null) {
            res.json('No viene el id');
            return;
        }
        Clientes.destroy({ where: { Id: req.params.id } }).then(cliente => { res.json('Registro eliminado') })
    });


}