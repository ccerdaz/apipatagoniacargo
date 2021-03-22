module.exports = (sequelize, type) => {
    return sequelize.define('tiposobservaciones', {
        Id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        TipoObservacion: type.STRING(30),
    })
}
