const { Lugares } = require("../sequelize");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const metodos = require('../metodos')

module.exports = function (router) {

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });

    router.get("/api/getalllugares", async (req, res) => {
        console.log('pasó por getalllugares')
        Lugares.findAll().then(lugares => { res.json(lugares) })
    });

    router.put("/api/updatelugar", (req, res) => {
        console.log('pasó por updatelugar')
        Lugares.update(req.body, { where: { Id: req.body.Id } }).then(lugar => { res.json('Registro actualizado') })
    });

    router.post('/api/newlugar', (req, res) => {
        console.log('pasó por newlugar')
        Lugares.create(req.body).then(newusuario => res.json(newusuario))
    });

    router.delete("/api/deletelugar/:id", (req, res) => {
        console.log('pasó por deletelugar')
        if (req.params.id === null) {
            res.json('No viene el id');
            return;
        }
        console.log('id es: ' + req.params.id);
        Lugares.destroy({ where: { Id: req.params.id } }).then(lugar => { res.json('Registro eliminado') })
    });
}