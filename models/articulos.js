module.exports = (sequelize, type) => {
    return sequelize.define('articulos', {
        Id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        IdOrden: type.INTEGER,
        bultos: type.INTEGER,
        peso: type.INTEGER,
        alto: type.INTEGER,
        ancho: type.INTEGER,
        largo: type.INTEGER,
        pesovolumenlinea: type.INTEGER
    })
}