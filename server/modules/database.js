"use strict";
const MongoClient = require("mongodb").MongoClient,
      esquemas    = {words : ""},
      database    = {
          name       : process.env.MONGO_DATABASE,
          user       : process.env.MONGO_USER,
          password   : process.env.MONGO_PASSWORD
      };

let conectaMongo = (callback) => {
    MongoClient.connect(`mongodb://${database.user}:${database.password}@ds151909.mlab.com:51909/${database.name}`, (err, database) => {
        if(err) throw err;
        esquemas.words = database.collection("words");
        callback(err, database);
    });
};

let closeMongo = () => {
    MongoClient.close();
}

//Para retornar las colecciones...
let coleccion = (esquema) => esquemas[esquema];
module.exports.coleccion = coleccion;
module.exports.conectaMongo = conectaMongo;
module.exports.closeMongo = closeMongo;
