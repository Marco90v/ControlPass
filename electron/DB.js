const sqlite3 = require('sqlite3');

// global.rest = undefined;

// Conecta a la base de datos
const connect = () => {
    return new sqlite3.Database('./db/crypt.db', (err) => { if (err) {console.log("Error de coneccion");} }); 
}

// Ejecuta comandos sql, db = base de datos, sql = comando sql, variable = variables en orden
const run = (db,sql,variable=[]) => {
    return new Promise((resolve,reject) => {
        db.all(sql, variable, (err, rows) => {
                err ? reject(err) : resolve(rows);
        });
    });
}

// Crea tablas si no exiten, db = base d daros, sql = comando sql, se usa otra funcion distinta a la anterior ya que para crear es necesario el metodo run ejemplo, db,.run()
const createDB = (db,sql) => {
    return new Promise((resolve,reject) => {
        db.run(sql,[],(err,arg)=>{
            err ? reject(err) : resolve(arg);
        });
    });
}

module.exports = {connect, run, createDB}