const mysql = require("mysql2/promise");

function conectar() {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "admin",
        database: "the_hub_walle"
    });
}

module.exports = conectar;
