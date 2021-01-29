module.exports = (sequelize, type) => {
    return sequelize.define('tarifas', {
        Id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NombreTarifa: type.STRING(10),
        OSaPDocumentos: type.INTEGER,
        OSaPCarga4: type.INTEGER,
        OSaP150: type.INTEGER,
        OSaPMas150: type.INTEGER,
        ASaPDocumentos: type.INTEGER,
        ASaPCarga4: type.INTEGER,
        ASaP150: type.INTEGER,
        ASaPMas150: type.INTEGER,
        APaSDocumentos: type.INTEGER,
        APaSCarga4: type.INTEGER,
        APaS150: type.INTEGER,
        APaSMas150: type.INTEGER,
        ESaPMinimo: type.INTEGER,
        ESaP150: type.INTEGER,
        ESaPMas150: type.INTEGER,
        EPaSMinimo: type.INTEGER,
        EPaS150: type.INTEGER,
        EPaSMas150: type.INTEGER
    })
}