module.exports = (sequelize, type) => {
    return sequelize.define('ordenes', {
        Id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NumeroOT: type.INTEGER,
        NumeroOTAsignado: type.BOOLEAN, //Indica si el número de OT ya existe y no se debe cambiar.
        //Artículos (van en una tabla relacionada)
        ComunaDestinatario: type.STRING(50),
        ComunaRemitente: type.STRING(50),
        ContactoRemitente: type.STRING(200),
        ContenidoDeclarado: type.STRING(200),
        DeclaraHazmat: type.STRING(2), //Si - No 
        Destinatario: type.STRING(100),
        Destino: type.STRING(3), //Designador
        DireccionDestinatario: type.STRING(50),
        DireccionRemitente: type.STRING(50),
        // DocumentosConcat: type.STRING(250), // Además van en una tabla relacionada Documentos
        EntregadoPor: type.STRING(50),
        EsValija: type.BOOLEAN,
        Estado: type.STRING(20),
        FechaRetiro: type.DATE, //type.STRING(12), //
        FleteCobrado: type.INTEGER,
        HorarioRemitente: type.STRING(100), // type.DATE, 
        IdCliente: type.INTEGER,
        FormaPago: type.STRING(100),
        IdRemitente: type.INTEGER,
        Iva: type.INTEGER,
        Neto: type.INTEGER,
        TipoObservacion: type.STRING(45),
        Observacion: type.STRING(255),
        Origen: type.STRING(3), //Designador
        OtrosCargos: type.INTEGER,
        Estacionamiento: { type: type.BOOLEAN, defaultValue: false },
        RetiroFueraArea: { type: type.BOOLEAN, defaultValue: false },
        TotalCargos: type.INTEGER,
        PesoCobrado: type.INTEGER,
        Remitente: type.STRING(100), //Nombre del remitente
        RutDestinatario: type.STRING(12),
        Seguro: type.INTEGER,
        SolicitadoPor: type.STRING(50),
        TarifaAplicada: type.INTEGER,
        TarifaCliente: type.STRING(20),
        TipoCarga: type.STRING(20),
        TipoServicio: type.STRING(20),
        Total: type.INTEGER,
        TotalArticulos: type.INTEGER,
        TotalPeso: type.INTEGER,
        TotalPesoVolumen: type.INTEGER,
        TotalValorDeclarado: type.INTEGER,
        Anulada: type.BOOLEAN,
        FechaAnulacion: type.DATE,
        QuienAnulo: type.STRING(45),
        MotivoAnulacion: type.STRING(100), 
        OrdenDeCompra: type.STRING(45),
        GiroDestinatario: type.STRING(100),
        EmailDestinatario: type.STRING(45),

        ManifiestoAsignado: { type: type.INTEGER, defaultValue: 0 },
        FechaEntrega: type.DATE,
        HoraEntrega: type.STRING(8),
        RecibidoPor: type.STRING(100),
        RutReceptor: type.STRING(15),
        FechaInicial: type.DATE,
        CreadoPor: type.STRING(45),
        NumeroFactura: type.STRING(20),
        MedioDePago: type.STRING(20),
        NombreMensajero: type.STRING(100),
        ContactoDestinatario: type.STRING(45),
        TelefonoDestinatario: type.STRING(45),

    })
}


// Check: type.BOOLEAN,
//         Cliente: type.STRING,
//         DeclaraHazmat: type.STRING,
//         Destino: type.STRING,
//         DocumentoAdjunto: { type: type.STRING, defaultValue: 'SIN DOC' },
// FacturaEnviada: { type: type.BOOLEAN, defaultValue: false },
// FormaPago: type.STRING,
// ImpresionRespaldo: type.STRING(50), //Se desconoce su uso
// ImpresionRespaldo: type.STRING(50), //Se desconoce su uso
// NumeroFactura: type.INTEGER,
// NumeroOT: type.INTEGER,
// 

// PagadoA: type.STRING(50),
// Pod: type.STRING(50), //Se desconoce su uso
// Rendicion: type.STRING(50),
// Sobre: type.STRING, // Se desconoce su uso
// TransDocEfectivo: type.STRING(50),