const mysql = require('mysql');
import { promisify } from 'util';
const { database } = require('./conf');
console.log(database);
const pool = mysql.createPool(database);

pool.getConnection((err: any, conn: any) => {
    try {
        if (err) {
            console.log(err);
            if (err.code == "PROTOCOL_CONNECTION_LOST") {
                console.log("Se ha perdido Conexion con la base de Datos");
            }
            if (err.code == "ER_CON_COUNT_ERROR") {
                console.log("La Base de Datos ha sido saturada con demasiadas conexiones");
            }
            if (err.code == "ECONNREFUSED") {
                console.log("La Base de Datos Fue Rechazada");
            }
        }
        if (conn) conn.release();
        console.log("Base de Datos Iniciada");
    } catch (e) {
        console.log(e);
    }
    return;
});

pool.query = promisify(pool.query);
module.exports = pool;