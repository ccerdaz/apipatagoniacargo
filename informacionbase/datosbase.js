const { TiposObservaciones, TiposServicios, Lugares, Tarifas } = require("../sequelize");

let tiposObservacionesBase = [
    { Id: 1, TipoObservacion: 'SIN OBSERVACION' },
    { Id: 2, TipoObservacion: 'LLAMAR MAS TARDE' },
    { Id: 3, TipoObservacion: 'FALTA PAGO' },
    { Id: 4, TipoObservacion: 'FALTA STOCK' },
    { Id: 5, TipoObservacion: 'LLAMAR MAÑANA' },
    { Id: 6, TipoObservacion: 'URGENTE' },
    { Id: 7, TipoObservacion: 'MUY URGENTE' },
    { Id: 8, TipoObservacion: 'COBRAR REBOTE' },
    { Id: 9, TipoObservacion: 'PASAR DE NUEVO' },
    { Id: 10, TipoObservacion: 'HOY SOLO HASTA' },
    { Id: 11, TipoObservacion: 'CASA PARTICULAR' },
    { Id: 12, TipoObservacion: '09:00 >>' },
    { Id: 13, TipoObservacion: '10:00 >>' },
    { Id: 14, TipoObservacion: '11:00 >>' },
    { Id: 15, TipoObservacion: '12:00 >>' },
    { Id: 16, TipoObservacion: '13:00 >>' },
    { Id: 17, TipoObservacion: '14:00 >>' },
    { Id: 18, TipoObservacion: '15:00 >>' },
    { Id: 19, TipoObservacion: '16:00 >>' },
    { Id: 20, TipoObservacion: '17:00 >>' },
    { Id: 21, TipoObservacion: '18:00 >>' },
    { Id: 22, TipoObservacion: 'ELLOS LLAMARAN' },
    { Id: 23, TipoObservacion: 'LLEGÓ A LA OFICINA' },
    { Id: 24, TipoObservacion: 'PASAR MAÑANA' },
    { Id: 25, TipoObservacion: 'POR PAGAR' }
];

function creaTiposObservaciones() {
    TiposObservaciones.bulkCreate(tiposObservacionesBase)
        .then(creados => {
            console.log('TiposObservaciones creados!');
        })
}

let tiposServiciosBase = [
    { Id: 1, NombreServicio: 'AEREO' },
    { Id: 2, NombreServicio: 'CABILDO' },
    { Id: 3, NombreServicio: 'DELIVERY' },
    { Id: 4, NombreServicio: 'EXPRESO' },
    { Id: 5, NombreServicio: 'LA LIGUA' },
    { Id: 6, NombreServicio: 'OVERNIGHT' },
    { Id: 7, NombreServicio: 'SERV. ESPECIAL' }
]

function creaServicios() {
    TiposServicios.bulkCreate(tiposServiciosBase)
        .then(creados => {
            console.log('TiposServicios creados!');
        })
}

let lugares = [
    { Id: 1, Designador: 'ARI', NombreLugar: 'ARICA' },
    { Id: 2, Designador: 'IQQ', NombreLugar: 'IQUIQUE' },
    { Id: 3, Designador: 'ANF', NombreLugar: 'ANTOFAGASTA' },
    { Id: 4, Designador: 'CJC', NombreLugar: 'CALAMA' },
    { Id: 5, Designador: 'CPO', NombreLugar: 'COPIAPO' },
    { Id: 6, Designador: 'LSC', NombreLugar: 'LA SERENA' },
    { Id: 7, Designador: 'SCL', NombreLugar: 'SANTIAGO' },
    { Id: 8, Designador: 'CCP', NombreLugar: 'CONCEPCION' },
    { Id: 9, Designador: 'ZCO', NombreLugar: 'TEMUCO' },
    { Id: 10, Designador: 'ZAL', NombreLugar: 'VALDIVIA' },
    { Id: 11, Designador: 'ZOS', NombreLugar: 'OSORNO' },
    { Id: 12, Designador: 'PMC', NombreLugar: 'PUERTO MONTT' },
    { Id: 13, Designador: 'MHC', NombreLugar: 'CASTRO' },
    { Id: 14, Designador: 'BBA', NombreLugar: 'BALMACEDA' },
    { Id: 15, Designador: 'PNT', NombreLugar: 'PUERTO NATALES' },
    { Id: 16, Designador: 'PUQ', NombreLugar: 'PUNTA ARENAS' },
    { Id: 17, Designador: 'IPC', NombreLugar: 'ISLA DE PASCUA' },
    { Id: 18, Designador: 'CLR', NombreLugar: 'LA CALERA' },
    { Id: 19, Designador: 'LMC', NombreLugar: 'LIMACHE' },
    { Id: 20, Designador: 'LGA', NombreLugar: 'LA LIGUA' },
    { Id: 21, Designador: 'CBD', NombreLugar: 'CABILDO' },
    { Id: 22, Designador: 'CHN', NombreLugar: 'CHILLAN' },
    { Id: 23, Designador: 'SJN', NombreLugar: 'SAN JAVIER' },
]

function creaLugares() {
    Lugares.bulkCreate(lugares)
        .then(creados => {
            console.log('Lugares creados!');
        })
}

let tarifa = 
    { 
        NombreTarifa: 'TF1',
        OSaPDocumentos: 15000,
        OSaPCarga4: 15000,
        OSaP150: 3750,
        OSaPMas150: 3200,
        ASaPDocumentos: 6000,
        ASaPCarga4: 7900,
        ASaP150: 2600,
        ASaPMas150: 2500,
        APaSDocumentos: 5500,
        APaSCarga4: 7200,
        APaS150: 2400,
        APaSMas150: 2200,
        ESaPMinimo: 21000,
        ESaP150: 700,
        ESaPMas150: 500,
        EPaSMinimo: 25000,
        EPaS150: 500,
        EPaSMas150: 450
     }

function creaTarifa() {
    Tarifas.create(tarifa)
        .then(tarifa => {
            console.log('Tarifas creados!');
        })
}

//creaServicios()
//creaTiposObservaciones()
//creaLugares()
//creaTarifa()