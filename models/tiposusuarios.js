module.exports = (sequelize, type) => {
    return sequelize.define('tiposusuarios', {
        Id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        TipoUsuario: type.STRING(20),
    })
}