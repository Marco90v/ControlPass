import { Acercade } from "./Acercade";

export const FormLoging = ({salida,lock,password,captura,inicio,alert,animacion,mensaje,acercaDe,acercade}) => {

    return(
        <>
            <div className={`row mx-auto loginUser animate__animated ${salida}`}>
                <div className="card my-5 mb-3" >
                    <div className="row g-0">

                        <div className="col-md-4 contenImgLook">
                            <img src={lock} alt="ControlPass" className="imglock" />
                        </div>

                        <div className="col-md-8">
                            <div className="card-body my-3">
                                <h5 className="card-title mx-auto textRegistro">Incio de Sesion</h5>
                                <div className="card-text">

                                    {/* Inicio de sesion */}
                                    <form onSubmit={inicio}>
                                        <div className="row my-3 justify-content-center">
                                            <div className="mb-3 row justify-content-md-center">
                                                <label htmlFor="pass1" className="col-sm-4 col-form-label">Contraseña</label>
                                                <div className="col-sm-6">
                                                    <input type="password" className="form-control form-control-sm" id="pass" placeholder="**********" name="password" value={password} onChange={captura} />
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-success btn-sm mx-3 botonIniciar"  >Iniciar</button>
                                        </div>
                                    </form>
                                    {/* FIN de Inicio de sesion */}

                                    {
                                        alert
                                        &&
                                        <div className={`alert alert-danger mx-auto alert animate__animated ${animacion}  animate__bounceIn`} role="alert">
                                            {mensaje}
                                        </div>
                                    }

                                </div>
                                <p className="card-text mx-auto detalle"><small className="text-muted acercade" onClick={acercaDe}>Acerca De</small></p>
                            </div>
                        </div>

                    </div>
                </div>
                {
                    acercade &&  <Acercade />
                }
            </div>
        </>
    );

}