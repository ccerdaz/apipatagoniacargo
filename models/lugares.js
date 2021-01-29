module.exports = (sequelize, type) => {
    return sequelize.define('lugares', {
        Id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Designador: type.STRING(3),
        NombreLugar: type.STRING(50),
    })
}
