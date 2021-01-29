const Sequelize = require('sequelize')
const UsuariosModel = require('./models/usuarios')
const RemitentesModel = require('./models/remitentes')
const ClientesModel = require('./models/clientes')
const TiposServiciosModel = require('./models/tiposservicios')
const TiposObservacionesModel = require('./models/tiposobservaciones')
const OrdenesModel = require('./models/ordenes')
const LugaresModel = require('./models/lugares')
const ArticulosModel = require('./models/articulos')
const DocumentosModel = require('./models/documentos')
const MensajerosModel = require('./models/mensajeros')
const TiposdepagoModel = require('./models/tiposdepagos')
const TarifasModel = require('./models/tarifas')
const RutasDiariasModel = require('./models/rutasdiarias')

const sequelize = new Sequelize('patagonia', 'zetta2019', 'zetta2019', {
  host: 'www.zst.cl', //'45.236.130.84', //
  dialect: 'mysql',
  logging: false,
  operatorsAliases: 0, 
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
  },
  timezone: '-03:00' // for write to database
})

const Usuarios = UsuariosModel(sequelize, Sequelize)
const Remitentes = RemitentesModel(sequelize, Sequelize)
const Clientes = ClientesModel(sequelize, Sequelize)
const TiposServicios = TiposServiciosModel(sequelize, Sequelize)
const TiposObservaciones = TiposObservacionesModel(sequelize, Sequelize)
const Ordenes = OrdenesModel(sequelize, Sequelize)
const Lugares = LugaresModel(sequelize, Sequelize)
const Articulos = ArticulosModel(sequelize, Sequelize)
const Documentos = DocumentosModel(sequelize, Sequelize)
const Mensajeros = MensajerosModel(sequelize, Sequelize)
const Tiposdepago = TiposdepagoModel(sequelize, Sequelize)
const Tarifas = TarifasModel(sequelize, Sequelize)
const RutasDiarias = RutasDiariasModel(sequelize, Sequelize)

// Documentos.belongsTo(Ordenes, { foreignKey: 'IdOrden', onDelete: 'cascade' })
// Articulos.belongsTo(Ordenes, { foreignKey: 'IdOrden', onDelete: 'cascade' })
Ordenes.hasMany(Documentos, { foreignKey: 'IdOrden', onDelete: 'cascade' })
Ordenes.hasMany(Articulos, { foreignKey: 'IdOrden', onDelete: 'cascade' })
// Usuarios.belongsTo(Comunidades, { foreignKey: 'IdComunidad', as: 'Comunidades', onDelete: 'cascade' })
// WebUsers.belongsTo(Comunidades, { foreignKey: 'IdComunidad', as: 'Comunidad', onDelete: 'cascade' })
// Usuarios.belongsTo(Domicilios, { foreignKey: 'IdDomicilio', as: 'Domicilio' })
// Comunidades.hasMany(Domicilios, { foreignKey: 'IdComunidad', as: 'Domicilios', onDelete: 'cascade' })

sequelize.sync({ force: 0 })  // Si pones force: 1 se borra toda la BD!!!!!!!!!
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  Usuarios,
  Remitentes,
  Clientes,
  TiposServicios,
  TiposObservaciones,
  Ordenes,
  Lugares,
  Articulos,
  Documentos,
  Mensajeros,
  Tiposdepago,
  Tarifas,
  RutasDiarias 
}