const { shell  } = window.require("electron");

export const Acercade = () => {

    const openLink = (e,item) => {
        e.preventDefault();
        shell.openExternal(item);
    }

    return(
        <>
            <div id="salir" className="container animate__animated animate__fadeInLeft" >
                <h1 className="my-3 underline" >Acerca De</h1>
                <p><i className="bi bi-person-circle mx-1" /><strong>Autor:</strong> Marco Velasquez</p>
                <p><i className="bi bi-github mx-1" /><strong>Github: </strong><a href="#" onClick={(e)=>openLink(e,'https://github.com/Marco90v')} className="link-success">https://github.com/Marco90v</a></p>

                <h4 className="underline" ><i className="bi bi-caret-right-fill" /> Funcionamiento</h4>
                <ul>
                    <li><strong>Salir o cerrar sesión:</strong> Click en el icono del candado que se encuentra arriba a la izquierda.</li>
                    <li><strong>Ver lista de contraseñas:</strong> Menú, click Inicio.</li>
                    <li><strong>Agregar nuevo:</strong> Menú, click Nuevo y rellenar los campos.</li>
                    <li><strong>Editar:</strong> En Inicio, ver el listado de contraseñas del lado derecho se encuentra el botón para editar.</li>
                    <li><strong>Eliminar:</strong> En Inicio, ver el listado de contraseñas del lado derecho se encuentra el botón para Eliminar.</li>
                    <li><strong>Dark/Light Mode:</strong> Intercambiar entre modo oscuro y claro</li>
                </ul>

                <h4 className="underline" ><i className="bi bi-caret-right-fill" /> Funcionamiento profundo</h4>
                <p className="mx-4 text-justify">Las contraseñas agregadas son almacenadas en una base de datos, cada contraseña es encriptada y para poder ser desencriptada de manera correcta es necesario la contraseña de inicio de sesión de la aplicación.</p>
                <p className="mx-4 text-justify">En la base de datos se conserva la clave de inicio de sesión la cual permanece encriptada, por lo que, si un Black Hat extrae esta data no podrá desencriptar la información almacenada, si o si es necesario la clave de inicio de sesión.</p>
                <p className="mx-4 text-justify">Se puede modificar la clave de inicio de sesión, en el proceso, todas las contraseñas serán desencriptadas y re-encriptadas con la nueva clave de inicio de sesión.</p>
                <p className="mx-4 text-justify">
                    Se puede realizar copias de la base de datos, estas copias son tal cual se encuentra la base de datos, con las contraseñas encriptadas y la clave de inicio de sesión encriptada, 
                    las exportaciones en formato CSV se realizan con las contraseñas desencriptadas, por lo que será totalmente visible para quien tenga acceso al CSV, se puede realizar la importación del archivo, 
                    al momento de la importación será encriptada con la contraseña de inicio de sesión que este registrada en el momento de la importación.
                </p>

                <h4 className="underline" ><i className="bi bi-caret-right-fill" /> Programación</h4>
                <ul>
                    <li><a href="#" onClick={(e)=>openLink(e,'https://es.reactjs.org/')} className="link-info">React App</a></li>
                    <li><a href="#" onClick={(e)=>openLink(e,'https://www.electronjs.org')} className="link-info">Electron Js</a></li>
                    <li><a href="#" onClick={(e)=>openLink(e,'https://getbootstrap.com/')} className="link-info">Bootstrap</a></li>
                    <li><a href="#" onClick={(e)=>openLink(e,'https://animate.style/')} className="link-info">Animate.css</a></li>
                    <li><a href="#" onClick={(e)=>{openLink(e,'https://www.npmjs.com/package/sqlite3');openLink(e,'https://www.sqlitetutorial.net/sqlite-nodejs/');}} className="link-info">SQLite</a></li>
                </ul>

                <h4 className="underline" ><i className="bi bi-caret-right-fill" /> Objetivo</h4>
                <p className="mx-4 text-justify">
                    El objetivo de esta aplicación tiene como finalidad darle un uso personal, mantener de manera centralizada todas mis contraseñas de inicio de sesión de mis cuentas online, 
                    esta idea surge del problema de olvidar las contraseñas de más de 50 cuentas varias en diferentes plataformas webs, se inició el almacenado de las contraseñas en el navegador web, 
                    pero ellas eran guardadas sin encriptado, por lo que era vulnerable a un ataque de malwares.
                </p>
                <p className="mx-4 text-justify">
                    Así mismo se inició este pequeño proyecto para practicas mis conocimientos en programación, y aprender más de React, ya que siempre he querido aprender a utilizar esta herramienta.
                </p>
                <p className="mx-4 text-justify">
                    También compartir y dar a conocer mis conocimientos, así como dar una herramienta a quien le pueda ser de utilidad, tanto para usar y centralizar sus contraseñas, 
                    como para ejemplo de programación en React y comunicación con Electrón.
                </p>
                <p className="mx-4 text-justify">
                    Por último, siempre quise aprender a crear mi propio código de encriptado así sea siempre e ir avanzado hasta un código de encriptado mas avanzado.
                </p>
            </div>
        </>
    );

}