module.exports = (sequelize, type) => {
    return sequelize.define('mensajeros', {
        Id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NombreMensajero: type.STRING(50),
    })
}