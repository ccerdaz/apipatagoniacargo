module.exports = (sequelize, type) => {
    return sequelize.define('remitentes', {
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
        Comuna: type.STRING(20),
        Ciudad: type.STRING(50),
        Masindicaciones: type.STRING(100),
        Contacto: type.STRING(100),
        Telefono: type.STRING(100),
        Horario: type.STRING(150),
        CargaTipica: type.STRING(200)
    })
}
