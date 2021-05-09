import { useState } from "react";
import { Link } from "react-router-dom";

export const FormRegister = ({value,accion,setValues,animacion,alert,mensaje,tipoAlert,txtButton})=>{

    const {name, url, email, user, pass} = value;

    return(
        <>
            <form id="salir" className="row col-md-5 g-1 mt-5 mx-auto animate__animated animate__fadeInLeft" onSubmit={accion}>
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" >Nombre</span>
                    <input type="text" className="form-control form-control-sm" name="name" id="name" value={name} onChange={(e)=>{setValues(e);}} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" >Url</span>
                    <input type="text" className="form-control form-control-sm" name="url" id="url" value={url} onChange={(e)=>{setValues(e);}} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" >Correo</span>
                    <input type="text" className="form-control form-control-sm" name="email" id="email" value={email} onChange={(e)=>{setValues(e);}} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" >Usuario</span>
                    <input type="text" className="form-control form-control-sm" name="user" id="user" value={user} onChange={(e)=>{setValues(e);}} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" >Contraseña</span>
                    <input type="text" className="form-control form-control-sm" name="pass" id="pass" value={pass} onChange={(e)=>{setValues(e);}} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <button type="submit" className="btn btn-primary mb-3 position-absolute top-50 end-0 translate-middle-y">
                        {txtButton}
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
            </form>
        </>
    );
    
}