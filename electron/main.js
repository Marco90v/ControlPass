/*
  Sistema para control y organiza contraseñas personales
  Si no existe base de datos creada, la crea y crea tabla pass junto con la clave
  La clave, sera encinptada con el proceso de encriptacion que se usara para encriptar las contraseñas de acceso a las cuentas de usuario ejemplo
  clave = 123456 sera encriptada opteniendo por ejemplo = asdfgh, estos carapteres seran usados para la encriptacion.
  para no almacenar la clave ingresada por el usuario o clave de encriptado, se sobre encriptara y se almacenara el encriptado y sera usado para la validacion del inicio de sesion
  ejemplo la clave "123456" sera encriptada con la clave de encriptado "asdfgh" opteniendo por ejemeplo "a1s2d3" y almacenando.

  001 Detecta si existe una contraseña de inicio de sesion.
  002 Se agrega una nueva contraseña de inicio de sesion de la app
  003
  004 Recibe los datos enviados desde from para agregar un nuevo registro
  005 Solicita los registros
  006 Desencryptar
  007 Encryptar
  008 Busqueda de un registro en espesifico
  009 Actualiza el registro
  010 Eliminar registro
  011 Copia de base de datos
  012 Exporta en CSV con los datos desencryptado
  013 Importa y encrypta desde un CSV
  014 Cargar Respaldo, solo agregar la base de datos previamente copiada
  015 Cambio de Contraseña de la APP
  mode Cambia entre el modo Dark y Light
*/

// const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer'); // REACT TOOLS
const isDev = require('electron-is-dev'); // libreria para determinar si estamos en desarrollo o produccion.
const { app, BrowserWindow, ipcMain, dialog, nativeTheme } = require('electron');
const path = require('path');
const { existsSync, mkdirSync, copyFile, writeFileSync, createReadStream } = require( 'fs');
const { enc, deCrypt, encPass } = require('./crypt');
const { connect, run, createDB } = require('./DB');


// veridica si esxiste la carpeta db, donde se esta la base de datos, si no existe la crea.
!existsSync('db') && mkdirSync('db');

// conecta a la base de datos
const db = connect();

// Se verifica si existe la tabla pass en la base de datos, esta alamcena la clave de inicio de sesion
run(db,"SELECT name FROM sqlite_master WHERE type='table' AND name='pass'").then(e=>{
  e.length <= 0 && createDB(db,"CREATE TABLE pass(clave text)").then(e=>console.log(e)).catch(e=>console.log(e));
}).catch(e=>{ console.log('Error: ',e); });

// Se verifica si existe la tabla data en la base de datos, esta almacena las contraseñas de las cuentas
run(db,"SELECT name FROM sqlite_master WHERE type='table' AND name='data'").then(e=>{
  e.length <= 0 && createDB(db,'CREATE TABLE data (ID integer, name text, url text, email text, user text, pass text, PRIMARY KEY("ID" AUTOINCREMENT) )').then(e=>console.log(e)).catch(e=>console.log(e));
}).catch(e=>{ console.log('Error: ',e); });

let clave = ''; // Clave de Inicio de sesion



// 001 Detecta si existe una contraseña de inicio de sesion.
ipcMain.on('001', (event, arg) => {
  run(db,"SELECT * FROM pass").then(rows=>{
    event.reply('r001', rows.length > 0 ? true : false);
  }).catch(e=>{ console.log('Error: ',e); });

});

// 002 Se agrega una nueva contraseña de inicio de sesion de la app
ipcMain.on('002', (event, arg) => {
  run(db,"INSERT INTO pass(clave) VALUES(?)",[enc(encPass(arg),arg)]).then(rows=>{
    event.reply('r002', true);
  }).catch(e=>{ console.log('Error: ',e); });

});

ipcMain.on('003', (event, arg) => {
  clave = encPass(arg);
  run(db,"SELECT * FROM pass WHERE clave = ?",[enc(clave,arg)]).then(rows=>{
    event.reply('r003', rows.length > 0 ? true : false);
  }).catch(e=>{ console.log('Error: ',e); });

});

// 004 Recibe los datos enviados desde from para agregar un nuevo registro
ipcMain.on('004', (event, arg) => {
  const {name, url, email, user, pass} = arg;
  const password = enc(clave, pass);

  run(db,"INSERT INTO data(name, url, email, user, pass) VALUES(?,?,?,?,?)",[name, url, email, user, password]).then(rows=>{
    event.reply('r004', true);
  }).catch(e=>{ console.log('Error: ',e); });

});

// 005 Solicita los registros
ipcMain.on('005', (event, arg) => {
  run(db,"SELECT * FROM data").then(rows=>{
    rows.map(i=>{  i.pass = deCrypt(clave,i.pass); });
    event.reply('r005', rows);
  }).catch(e=>{ console.log('Error: ',e); });

});


/**
 * 006 y 007 ya no se usan.
 * Estos eventos fueron desarrollados con la finalidad de mostrar y ocultar las contraseñas del usuario, una a la vez,
 * por hacer mas facil se dejaron de usar estos eventos, para mostrar y ocultar, se envian al frontend todas las contraseñas desencfriptadas
 * y se muestros o ocultan con funciones de javascript.
 * se conservan estos eventos para mantener el orden de las solicitudes y tener como refencia si se deseara implementar en un servidor web.
 * 006; recibe palabra clave encryptada y devuelve la palabra clave desencryptada
 * 007: recibe el ID de la palabra clave desencryptada para ser buscada en la base de datos y retornar de manera encryptada
 */
ipcMain.on('006', (event, arg) => { event.reply('r006', deCrypt(clave,arg)); });
ipcMain.on('007', (event, arg) => {
  const sql = "SELECT pass FROM data WHERE ID = ?";
  db.all(sql, [arg], function(err,rows) {
    if (err) { throw err;
    }else{  event.reply('r007', rows[0].pass); }
  });
});

// 008 Busqueda de un registro en espesifico
ipcMain.on('008', (event, ID) => {

  run(db,"SELECT * FROM data WHERE ID = ?",[ID]).then(row=>{
    row[0].pass = deCrypt(clave,row[0].pass);
    event.reply('r008', row[0]);
  }).catch(e=>{ console.log('Error: ',e); });

});

// 009 Actualiza el registro
ipcMain.on('009', (event, arg) => {

  const {ID, name, url, email, user, pass} = arg;
  const password = enc(clave, pass);

  run(db,"UPDATE data set name = ?, url = ?, email = ?, user = ?, pass = ?  WHERE ID = ?",[name, url, email, user, password, ID]).then(row=>{
    event.reply('r009', true);
  }).catch(e=>{ console.log('Error: ',e); });

});

// 010 Eliminar registro
ipcMain.on('010', (event, ID) => {

  run(db,"DELETE FROM data WHERE ID=?",[ID]).then(row=>{
    event.reply('r010', {r: true, ID});
  }).catch(e=>{ console.log('Error: ',e); });

});

// 011 Copia de base de datos
ipcMain.on('011', (event, arg) => {

  dialog.showOpenDialog({ properties: ['openFile', 'openDirectory'] })
  .then(result => {
    if(!result.canceled){
      const rutaDestino = result.filePaths[0].replaceAll('\\','/')+'/copia.db';
      console.log(rutaDestino);
      copyFile('./db/crypt.db', rutaDestino, (err) => {
        err ? event.reply('r011', event.reply('r011', {state:false,msg:"Error al realizar el respaldo"} )) : event.reply('r011', {state:true,msg:"Respaldo realizado"} );
      });
    }else{
      event.reply('r011', {state:false,msg:"Se a cancelado el respaldo"} );
    }
  })
  .catch(err => { console.log(err); event.reply('r011', {state:false,msg:"Error en la ejecucion del Dialog"} ); });

});

// 012 Exporta en CSV con los datos desencryptado
ipcMain.on('012', (event, arg) => {

  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  })
  .then(result => {
    if(!result.canceled){
      const ruta = result.filePaths[0].replaceAll('\\','/')+'/Copy Pass.csv';
      run(db,"SELECT * FROM data").then(rows=>{
        rows.map(i=>{ i.pass = deCrypt(clave,i.pass); });
        let data='NAME,URL,EMAIL,USER,PASS\n';
        rows.map(i=>{ data+=i.name+','+i.url+','+i.email+','+i.user+','+i.pass+'\n' });
        writeFileSync(ruta, data, function (err) {
          err? event.reply('r012', {state:false,msg:"Error al realizar Exportación"}) : event.reply('r012', {state:true,msg:"Exporte Realizado"}); 
        });
      }).catch(e=>{  console.log('Error: ',e); });
    }else{
      event.reply('r012', {state:false,msg:"Exportación cancelada"});
    }
  })
  .catch(err => { event.reply('r012', {state:false,msg:"Error en la ejecucion del Dialog"} ); });

});

// 013 Importa y encrypta desde un CSV
ipcMain.on('013', (event, arg) => {

  dialog.showOpenDialog({ properties: ['openFile'], filters: [ { name: 'File', extensions: ['csv'] } ]  })
  .then(result => {
    if(!result.canceled){
      const ruta = result.filePaths[0].replaceAll('\\','/');
      const readline = require("readline");
      const lector = readline.createInterface({ input: createReadStream(ruta) });
    
      lector.on("line", linea => {
          let [name, url, email, user, password] = linea.split(',');
          password =enc(clave,password);
          run(db,"INSERT INTO data(name, url, email, user, pass) VALUES(?,?,?,?,?)",[name, url, email, user, password]).then(row=>{
            console.log('Linea agregada: '+ linea);
          }).catch(e=>{ event.reply('r013', {state:false,msg:'Error al ingresar registros de datos'}); } );
      });
      event.reply('r013', {state:true,msg:'Inicio la importacion porfavor espere'});
    }else{
      event.reply('r013', {state:false,msg:'Importación cancelada'});
    }
  })
  .catch(err => { event.reply('r013', {state:false,msg:"Error en la ejecucion del Dialog"} ); });

});

// 014 Cargar Respaldo, solo agregar la base de datos previamente copiada
ipcMain.on('014', (event, arg) => {

  dialog.showOpenDialog({  filters: [ { name: 'File', extensions: ['db'] } ] })
  .then(result => {
    if(!result.canceled){
      const ruta = result.filePaths[0].replaceAll('\\','/');
      copyFileSync(ruta, './db/crypt.db', (err) => {
        err ? event.reply('r014', { state:false,msg:"Error al cargar respaldo" }) : event.reply('r014', { state:true,msg:"respaldo cargado" });
      });
    }else{
      event.reply('r014', {state:false,msg:"Se cancelo carga de respaldo"} );
    }
  })
  .catch(err => {  event.reply('r014', { state:false,msg:"Error en la ejecucion del Dialog" }); });

});

// 015 Cambio de Contraseña de la APP
ipcMain.on('015', (event, {passOld,newPass}) => {

  if(clave === encPass(passOld)){

    run(db,"SELECT * FROM data").then(rows=>{
      rows.map(i=>{
        const pass2 = enc( encPass(newPass), deCrypt(clave,i.pass) );
        const ID2 = i.ID;
        run(db,"UPDATE data set pass = ?  WHERE ID = ?",[pass2, ID2]).then(row=>{
          console.log(ID2, 'Actualizado');
        }).catch(e=>{ console.log('Error: ',e); });
      });

      run(db,"UPDATE pass set clave = ?  WHERE clave = ?",[enc( encPass(newPass), newPass ), enc(clave,passOld)]).then(row=>{
        clave = encPass(newPass);
        event.reply('r015', {state:true,msg:"Contraseña cambiada con éxito"});
      }).catch(e=>{ event.reply('r015', {state:false,msg:"Error al actualizar los datos"}); });

    }).catch(e=>{ event.reply('r015', {state:false,msg:"Error en consulta de base de datos"}); });

  }else{ event.reply('r015', {state:false,msg:"Contraseña no coincide"}); }

});

// Cambia entre el modo Dark y Light
ipcMain.on('mode', (event,mode)=>{
  mode ? nativeTheme.themeSource = 'dark' : nativeTheme.themeSource = 'light';
});




// Funciones para el inicio de la ventana de electron
function createWindow () {
  let win = new BrowserWindow({
    title:"ControlPass",
    width: 800,
    height: 600,
    icon: path.join(__dirname, '../lock.png'),
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`; // para identificar modo desarrollador y produccion
 
  win.loadURL(startURL);

  win.once('ready-to-show', () => win.show());
    win.on('closed', () => {
      db.close();
      app.quit();
      win = null;
  });

  win.maximize();
  win.focus();
}


// extencion de react tools
// app.whenReady().then(()=>{
//   installExtension(REACT_DEVELOPER_TOOLS)
//     .then((name) => console.log(`Added Extension:  ${name}`))
//     .catch((err) => console.log('An error occurred: ', err));
//   createWindow();
//   }
// );

app.on('ready', createWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});