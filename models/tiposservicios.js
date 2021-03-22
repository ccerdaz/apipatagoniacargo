module.exports = (sequelize, type) => {
    return sequelize.define('tiposservicios', {
        Id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NombreServicio: type.STRING(20),
    })
}
