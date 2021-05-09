export const FormConfig = ({passOld,pass1,pass2,setValues,cambioPass,alert,tipoAlert,animacion,mensaje,accion,changeMode,valueMode}) => {

    return(
        <>
            <div id="salir" className="container animate__animated animate__fadeInLeft">
                <div>
                    <p className="configP">Dark/Light Mode</p>
                    <button type="button" className="btn btn-primary btn-sm" onClick={changeMode} >
                        {
                            valueMode ? 
                                <>Light <i className="bi bi-sun-fill mx-1" /></> 
                            : 
                                <>Dark <i className="bi bi-moon-fill mx-1" /></>
                        }
                    </button>
                </div>
                <hr/>
                <div>
                    <p className="configP">Crear un respaldo de la Base de Datos, elige un destino y se realizara una copia en el lugar escogido</p>
                    <button type="button" className="btn btn-primary btn-sm" onClick={()=>{accion("011")}} >
                        Crear Respaldo
                        <i className="bi bi-box-arrow-up-right mx-1" />
                    </button>
                </div>
                <hr/>
                <div>
                    <p className="configP">Cargar respaldo realizado previamente</p>
                    <button type="button" className="btn btn-primary btn-sm" onClick={()=>{accion("014")}} >
                        Carga Respaldo
                        <i className="bi bi-box-arrow-in-down-left mx-1" />
                    </button>
                </div>
                <hr/>
                <div>
                    <p className="configP">Exportar lista de contraseña en formato CSV sin encriptar</p>
                    <button type="button" className="btn btn-primary btn-sm" onClick={()=>{accion("012")}} >
                        Exportar CSV
                        <i className="bi bi-file-earmark-arrow-up-fill mx-1" />
                    </button>
                </div>
                <hr/>
                <div>
                    <p className="configP">Importar lista de contraseñas en formato CSV sera encriptado</p>
                    <button type="button" className="btn btn-primary btn-sm" onClick={()=>{accion("013")}} >
                        Importar CSV
                        <i className="bi bi-file-earmark-arrow-down-fill mx-1" />
                    </button>
                </div>
                <hr/>
                <div className="row my-3">
                    <p className="configP">Cambiar contraseña, para ello ingrese la contraseña actual y la nueva, toda la data sera desencripta y re-encriptada con la contraseña nueva</p>
                    <div className="mb-3 row">
                        <label htmlFor="pass1" className="col-sm-2 col-form-label">Contraseña Actual</label>
                        <div className="col-sm-6">
                            <input type="password" className="form-control form-control-sm" placeholder="**********" name="passOld" id="passOld" value={passOld} onChange={(e)=>{setValues(e);}} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="pass1" className="col-sm-2 col-form-label">Nueva Contraseña</label>
                        <div className="col-sm-6">
                            <input type="password" className="form-control form-control-sm" placeholder="**********" name="pass1" id="pass1" value={pass1} onChange={(e)=>{setValues(e);}} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="pass2" className="col-sm-2 col-form-label">Confirme Contraseña</label>
                        <div className="col-sm-6">
                            <input type="password" className="form-control form-control-sm" placeholder="**********" name="pass2" id="pass2" value={pass2} onChange={(e)=>{setValues(e);}} />
                        </div>
                    </div>
                    <button type="button" className="btn btn-success btn-sm mx-3 configCambiar" onClick={cambioPass} >
                        Cambiar
                        <i className="bi bi-file-earmark-plus-fill mx-1"></i>
                    </button>
                </div>
                {
                    alert
                    &&
                    <div className={`alert ${tipoAlert} mx-auto alert animate__animated ${animacion} `} role="alert">
                        {mensaje}
                    </div>
                }
            </div>
        </>
    );

}