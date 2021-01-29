module.exports = (sequelize, type) => {
    return sequelize.define('usuarios', {
        Id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: type.STRING(50),
        Email: type.STRING(50),
        Password: type.STRING(200),
        Habilitado: { type: type.BOOLEAN, defaultValue: true },
        TipoUsuario: { type: type.STRING(15), defaultValue: 'OBSERVADOR' },
        Rut: type.INTEGER,
        Telefono: type.STRING(50),
        UltimoAcceso: type.DATE, 
        CreadoPor: type.STRING(40),
        ModificadoPor: type.STRING(40),
    })
}

/**
 * Tipos de usuario:
 * 1: SUPERADMIN
 * 2: ADMIN
 * 3: OBSERVADOR
 */