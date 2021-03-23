module.exports = (sequelize, type) => {
    return sequelize.define('clientes', {
        Id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Rut: type.STRING(15),
        RazonSocial: type.STRING(100),
        NombreComun: type.STRING(100),
        Giro: type.STRING(100),
        Direccion: type.STRING(100),
        Region: type.STRING(45),
        Comuna: type.STRING(20),
        Ciudad: type.STRING(50),
        Horario: type.STRING(150),
        Contacto: type.STRING(100),
        Telefono: type.STRING(100), 
        Email: type.STRING(100),
        NombreTarifa: type.STRING(10),
        FormaPago: type.STRING(100),
        BoletaFactura: type.STRING(20)
    })
}
