module.exports = (sequelize, type) => {
    return sequelize.define('documentos', {
        Id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        IdOrden: type.INTEGER,
        documento: type.STRING(50),
        numero: type.STRING(50),
        valor: type.INTEGER,
    })
}