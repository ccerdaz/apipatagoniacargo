const { Eventos, Domicilios } = require("./sequelize");

var metodos = require('./metodos');

const express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let server = app.listen(3030);
let io = require('socket.io')(server);

var metodos = require('./metodos');

module.exports = {
    io: io,
    app: app,
    server: server
};

require("./routes/clientesRoutes")(app);
require("./routes/ordenesRoutes")(app);
require("./routes/remitentesRoutes")(app);
require("./routes/tiposobservacionesRoutes")(app);
require("./routes/tiposserviciosRoutes")(app);
require("./routes/tiposusuariosRoutes")(app);
require("./routes/usuariosRoutes")(app);
require("./routes/lugaresRoutes")(app);
require("./routes/mensajerosRoutes")(app);
require("./routes/tiposdepagosRoutes")(app);
require("./routes/tarifasRoutes")(app); 
require("./routes/rutasdiariasRoutes")(app); 