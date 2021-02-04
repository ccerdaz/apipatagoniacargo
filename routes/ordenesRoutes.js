const { Ordenes, Documentos, Articulos } = require("../sequelize");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const metodos = require('../metodos')

module.exports = function (router) {

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });

    // Trae las que están completadas y las que no
    router.get("/api/getallordenesbydate/:year/:month/:day", async (req, res) => {
        console.log('pasó por getallordenesbydate')
        let year = req.params.year
        let month = req.params.month
        let day = req.params.day
        console.log('day', day);
        console.log('month', month);

        let desde = new Date(year, month - 1, day, 0, 0, 0)
        let hasta = new Date(year, month - 1, day, 23, 59, 59)
        console.log('desde', desde);
        console.log('hasta', hasta);
        Ordenes.findAll({
            where: {
                FechaRetiro: { [Op.between]: [desde, hasta] },
            }
        }).then(ordenes => { res.json(ordenes) })
    });

    //Trae sólo las que están en Estado=RETIRADO
    router.get("/api/getordenesmanifiesto/:year/:month/:day", async (req, res) => {
        console.log('pasó por getordenesmanifiesto')
        let year = req.params.year
        let month = req.params.month
        let day = req.params.day
        console.log('day', day);
        console.log('month', month);

        let desde = new Date(year, month - 1, day, 0, 0, 0)
        let hasta = new Date(year, month - 1, day, 23, 59, 59)
        console.log('desde', desde);
        console.log('hasta', hasta);
        Ordenes.findAll({
            where: {
                // Estado: 'RETIRADO'
                FechaRetiro: { [Op.between]: [desde, hasta] },
            }
        }).then(ordenes => { res.json(ordenes) })
    });

    //Trae sólo las que tienen número de OT asignado
    router.get("/api/getordenesbydate/:year/:month/:day", async (req, res) => {
        console.log('pasó por getordenesbydate')
        let year = req.params.year
        let month = req.params.month
        let day = req.params.day
        console.log('day', day);
        console.log('month', month);

        let desde = new Date(year, month - 1, day, 0, 0, 0)
        let hasta = new Date(year, month - 1, day, 23, 59, 59)
        console.log('desde', desde);
        console.log('hasta', hasta);
        Ordenes.findAll({
            where: {
                FechaRetiro: { [Op.between]: [desde, hasta] },
                NumeroOTAsignado: true
            }
        }).then(ordenes => { res.json(ordenes) })
    });

    //Trae por fecha y OT opcional
    router.get("/api/getordenesbydateandot/:year/:month/:day/:otasignado", async (req, res) => {
        console.log('pasó por getordenesbydateandot')
        let year = req.params.year
        let month = req.params.month
        let day = req.params.day
        let desde = new Date(year, month - 1, day, 0, 0, 0)
        let hasta = new Date(year, month - 1, day, 23, 59, 59)
        console.log('desde', desde);
        console.log('hasta', hasta);
        let otasignado = req.params.otasignado;
        let query = {
            FechaRetiro: {
                [Op.between]: [desde, hasta]
            }
        }
        if (otasignado == 'true') {
            query = {
                FechaRetiro: {
                    [Op.between]: [desde, hasta],
                    NumeroOTAsignado: 1
                }
            }
        }
        Ordenes.findAll({
            where: query
        }).then(ordenes => { res.json(ordenes) })
    });

    //Trae sólo las que tienen número de OT asignado Mes y Año
    router.get("/api/getordenesbyyearmonth/:year/:month", async (req, res) => {
        console.log('pasó por getordenesbyyearmonth')
        let year = req.params.year
        let month = req.params.month
        console.log('year', year);
        console.log('month', month);

        let lastDay = metodos.getLastDayOfMonth(+month)
        console.log('lastDay', lastDay);

        let desde = new Date(year, month - 1, 1, 0, 0, 0)
        let hasta = new Date(year, month - 1, lastDay, 23, 59, 59)
        console.log('desde', desde);
        console.log('hasta', hasta);
        Ordenes.findAll({
            where: {
                FechaRetiro: { [Op.between]: [desde, hasta] },
                // NumeroOTAsignado: true
            }
        }).then(ordenes => { res.json(ordenes) })
    });

    //Ordenes que pueden ser facturadas
    router.get("/api/getordenesfacturacion", async (req, res) => {
        console.log('pasó por getordenesfacturacion')
        Ordenes.findAll({
            where: {
                NumeroOTAsignado: true,
                [Op.or]: [
                    { Estado: 'ENVIADO' },
                    { Estado: 'ENTREGADO' }
                ]
            },
            include: [
                { model: Documentos },
                { model: Articulos },
            ],
            order: [['NumeroOT', 'desc']],
            limit: 200
        }).then(ordenes => { res.json(ordenes) })
    });

    //Últimas órdenes independiente de la fecha 
    router.get("/api/getlastordenes", async (req, res) => {
        console.log('pasó por getlastordenes')
        Ordenes.findAll({
            where: { NumeroOTAsignado: true },
            include: [
                { model: Documentos },
                { model: Articulos },
            ],
            order: [['NumeroOT', 'desc']],
            limit: 200
        }).then(ordenes => { res.json(ordenes) })
    });

    // router.get("/api/getordenesbyyearmonth/:year/:month", async (req, res) => {
    //     console.log('pasó por getordenesbyyearmonth')
    //     let year = req.params.year
    //     let month = req.params.month
    //     console.log('year', year);
    //     console.log('month', month);
    //     let lastday = metodos.getLastDayOfMonth(+month)
    //     console.log('lastday', lastday);
    //     let desde = new Date(year, month - 1, 1, 0, 0, 0)
    //     let hasta = new Date(year, month - 1, lastday, 23, 59, 59)
    //     console.log('desde', desde);
    //     console.log('hasta', hasta);
    //     Ordenes.findAll({
    //         where: {
    //             FechaRetiro: { [Op.between]: [desde, hasta] },
    //             NumeroOTAsignado: 1
    //         },
    //         include: [
    //             { model: Documentos },
    //             { model: Articulos },
    //         ],
    //         order: [['FechaRetiro', 'desc']]
    //     }).then(ordenes => { res.json(ordenes) })
    // });

    router.get("/api/getordenesbycliente/:idcliente", async (req, res) => {
        console.log('pasó por getordenesbycliente')
        Ordenes.findAll({
            where: {
                IdCliente: req.params.idcliente
            }
        }).then(ordenes => { res.json(ordenes) })
    });

    router.get("/api/getordenbyid/:id", async (req, res) => {
        console.log('pasó por getordenbyid')
        Ordenes.findOne({
            where: {
                Id: req.params.id
            },
            include: [
                { model: Documentos },
                { model: Articulos },
            ]
        }).then(orden => { res.json(orden) })
    });

    router.get("/api/getordenbyot/:numeroot", async (req, res) => {
        console.log('pasó por getordenbyot')
        Ordenes.findOne({
            where: {
                NumeroOT: req.params.numeroot
            }
        }).then(orden => { res.json(orden) })
    });


    router.put("/api/moveOrderNextDay", async function (req, res) {
        let id = req.body.id
        Ordenes.findOne({ where: { Id: id } })
            .then(orden => {
                let fecha = new Date(orden.FechaRetiro)
                fecha.setDate(fecha.getDate() + 1)
                Ordenes.update({ FechaRetiro: fecha }, { where: { Id: id } })
                    .then(updated => {
                        res.json('La orden fue trasladada al siguiente día')
                    })
            })
    });

    router.put("/api/updateorden", async function (req, res) {
        console.log('pasó por updateorden')
        if (req.body.NumeroOT === '')
            req.body.NumeroOT = null
        if (req.body.TarifaAplicada === '')
            req.body.TarifaAplicada = null

        req.body.FechaRetiro += ' 12:00:00'
        console.log('req.body.NumeroOTAsignado', req.body.NumeroOTAsignado);

        //Verifica que el NumeroOT no exista
        if (req.body.NumeroOT != null && !req.body.NumeroOTAsignado) {
            await Ordenes.findOne({ where: { NumeroOT: req.body.NumeroOT } })
                .then(orden => {
                    if (orden) {
                        res.status(403).json('Ya existe una OT con el número ' + req.body.NumeroOT)
                        return
                    }
                })
        }

        //Si viene un número de OT y NumeroOTAsignado=false => almaceno NumeroOTAsignado=true
        if (req.body.NumeroOT != null && !req.body.NumeroOTAsignado) {
            req.body.NumeroOTAsignado = true
        }

        let documentos = req.body.Documentos
        req.body.DocumentosConcat = ''
        //Concateno documentos para dejarlo en el campo Documentos
        if (documentos != undefined)
            documentos.forEach(doc => {
                req.body.DocumentosConcat += doc.documento + ': ' + doc.numero + '\n'
                if (doc.valor === '')
                    doc.valor = 0
            });

        let articulos = req.body.Articulos

        Ordenes.update(req.body, { where: { Id: req.body.Id } }).then(orden => {

            //Actualizar Documentos
            Documentos.destroy({ where: { IdOrden: req.body.Id } })
                .then(destroyed => {
                    if (documentos != undefined) {
                        documentos.forEach(doc => {
                            doc.IdOrden = req.body.Id
                            if (doc.valor === '')
                                doc.valor = 0
                        }); 
                        Documentos.bulkCreate(documentos).then()
                    }
                })

            //Actualizar Articulos
            Articulos.destroy({ where: { IdOrden: req.body.Id } })
                .then(destroyed => {
                    if (articulos != undefined) {
                        articulos.forEach(art => {
                            art.IdOrden = req.body.Id
                        });
                        Articulos.bulkCreate(articulos).then()
                    }
                })
            if (req.body.NumeroOT != null && !req.body.NumeroOTAsignado) {
                req.json({
                    NumeroOT: req.body.NumeroOT,
                    NumeroOTAsignado: true
                })
                return;
            } else
                res.json('Registro actualizado')
        })

    });

    router.post("/api/neworden", (req, res) => {
        console.log('pasó por neworden')
        if (req.body.NumeroOT === '')
            req.body.NumeroOT = null
        if (req.body.TarifaAplicada === '')
            req.body.TarifaAplicada = null

        req.body.FechaRetiro += ' 12:00:00'

        let documentos = req.body.Documentos
        let articulos = req.body.Articulos
        req.body.DocumentosConcat = ''
        //Concateno documentos para dejarlo en el campo Documentos
        if (documentos != undefined)
            documentos.forEach(doc => {
                req.body.DocumentosConcat += doc.documento + ': ' + doc.numero + '\n'
            });

        Ordenes.create(req.body).then(neworden => {
            if (documentos != undefined) {
                documentos.forEach(doc => {
                    doc.IdOrden = neworden.Id

                    if (doc.valor === '')
                        doc.valor = 0
                });
                Documentos.bulkCreate(documentos).then()
            }

            if (articulos != undefined) {
                articulos.forEach(art => {
                    art.IdOrden = neworden.Id
                });
                articulos.IdOrden = neworden.Id
                Articulos.bulkCreate(articulos).then()
            }

            res.json(neworden)
        })
    });

    router.put("/api/anulaorden", (req, res) => {
        console.log('pasó por anulaorden')
        if (req.params.id === null) {
            res.json('No viene el id');
            return;
        }
        Ordenes.update({
            Estado: 'NULO',
            Anulada: true,
            FechaAnulacion: new Date(),
            QuienAnulo: req.body.quienanulo
        }, { where: { Id: req.body.id } }).then(orden => { res.json('Registro anulado') })
    });

    router.delete("/api/deleteorden/:id", (req, res) => {
        console.log('pasó por deleteorden')
        if (req.params.id === null) {
            res.json('No viene el id');
            return;
        }
        Ordenes.destroy({ where: { Id: req.params.id } }).then(orden => { res.json('Registro eliminado') })
    });

}