module.exports = (sequelize, type) => {
    return sequelize.define('rutasdiarias', {
        Id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Fecha: type.DATE,
 
        IdRemitente: type.INTEGER,
        Remitente: type.STRING(100),
        DireccionRemitente: type.STRING(100),
        ContactosRem: type.STRING(100),
        TelefonosRem: type.STRING(100),
        ContactoRemitente: type.STRING(100),
        ComunaRemitente: type.STRING(100),
        HorarioRemitente: type.STRING(100),

        Estado: type.STRING(100),
        TipoServicio: type.STRING(100),
        TipoObservacion: type.STRING(100),

        IdCliente: type.INTEGER,
        Destinatario: type.STRING(100),
        RutDestinatario: type.STRING(100),
        DireccionDestinatario: type.STRING(100),
        ComunaDestinatario: type.STRING(100),
    })
}
