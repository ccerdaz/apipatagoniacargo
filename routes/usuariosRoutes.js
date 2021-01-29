const { Usuarios } = require("../sequelize");
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

    router.get("/api/getallusuarios", async (req, res) => {
        console.log('pasó por getallusuarios')
        Usuarios.findAll().then(usuarios => { res.json(usuarios) })
    });

    router.put("/api/updateusuario", (req, res) => {
        console.log('pasó por updateusuario')
        Usuarios.update(req.body, { where: { Id: req.body.Id } }).then(usuario => { res.json('Registro actualizado') })
    });

    router.post('/api/login', (req, res) => {
        console.log('Pasó por login')
        console.log('123456: ' + metodos.encripta('123456'))
        Usuarios.findOne({
            where: { Email: req.body.Email },
        }).then(usuario => {
            if (usuario != null) {
                console.log('usuario.Password: ' + usuario.Password)
                //let passwordCheck = bcrypt.compareSync(req.body.Password, usuario.Password);
                if (req.body.Password === usuario.Password)
                    console.log('password ok');
                else {
                    res.status(403).json('Nombre de usuario o password incorrecta')
                    return;
                }

                if (usuario.Habilitado === false) {
                    res.status(403).json('Este usuario se encuentra deshabilitado del sistema')
                    return;
                }

                //Encripta usuario y lo envía dentro de token sin la password
                usuario.Password = ''

                jwt.sign({
                    usuario: usuario,
                    /**
                     * Aquí se pueden agregar más variables de configuración
                     */
                }, 'privatekey', { expiresIn: '8h' }, (err, token) => {
                    if (err) { console.log(err) }
                    res.json(token);
                });

                //Actualiza el UltimoAcceso
                Usuarios.update({ UltimoAcceso: new Date() }, {
                    where: {
                        Id: usuario.Id
                    }
                })
            }
            else
                res.status(403).json('Usuario o password incorrecta')
        })
    });

    router.post('/api/newusuario', (req, res) => {
        console.log('pasó por newusuario')

        //Verifico que email no exista
        Usuarios.findAll({ where: { Email: req.body.Email } })
            .then(usu => {
                if (usu.length > 0) {
                    res.status(403).json('Este Email ya existe en la base de datos');
                    return;
                }
                Usuarios.create(req.body).then(newusuario => res.json(newusuario))
            })
    });

    router.delete("/api/deleteusuario/:id", (req, res) => {
        console.log('pasó por deleteusuario. Id:', req.params.id)
        if (req.params.id === null) {
            res.json('No viene el id');
            return;
        }
        console.log('id es: ' + req.params.id);
        Usuarios.destroy({ where: { Id: req.params.id } }).then(usuario => { res.json('Registro eliminado') })
    });
}