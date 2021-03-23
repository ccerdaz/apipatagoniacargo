const  Ordenes  = require("../sequelize");
module.exports = (sequelize, type) => {
  return sequelize.define('manifiestos', {
      Id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      NumeroManifiesto: type.INTEGER,
      Origen: type.STRING(30),
      Destino: type.STRING(30),
      Servicio: type.STRING(30),
      FechaRecepcion: type.STRING(12),
      FechaSalida: type.STRING(12),
      Transporte: type.STRING(30), 
      // Ordenes: Ordenes,   
      TotalValija: type.INTEGER, 
      TotalFuera: type.INTEGER,
      TotalKilos: type.INTEGER,
      TotalPesoVolumen: type.INTEGER,
      TotalValor: type.INTEGER,
      TotalOrdenes: type.INTEGER,
  })
}