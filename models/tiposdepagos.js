module.exports = (sequelize, type) => {
    return sequelize.define('tiposdepago', {
        Id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        TipoPago: type.STRING(50),
    })
}