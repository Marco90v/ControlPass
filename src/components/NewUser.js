import lock from '../assets/lock.jpg';
import { useEffect, useState } from 'react';
import { ipcR } from "../functions/ipcR";
import { useForm } from '../hooks/useForm';
import { Acercade } from './Acercade';

export const NewUser = () => {   

    useEffect(() => {
        ipcR().on('r002', (event, arg) => {
            if(arg){
                // history.push('/login');
                window.location.reload();
            }
        });
        return () => {
            ipcR().removeAllListeners('r002');
        }
    }, []);

    const [{alert, mensaje},setAlert] = useState({alert:false,mensaje:''});
    const [animacion, setAnimacion] = useState('animate__bounceIn');
    const [acercade,setAcercade] = useState(false);
    const [{password1, password2}, captura] = useForm({password1:'', password2:''});

    const activateAlert = (mensaje) => {
        setAlert({alert:true, mensaje});
        setAnimacion('animate__bounceIn');
        setTimeout(() => { setAnimacion('animate__bounceOut'); }, 3000);
        setTimeout(() => { setAlert({alert:false,mensaje:''}); }, 4000);

    }

    const validation = () => {
        if(password1 === '' || password2 === ''){
            activateAlert('Campos Vacios');
            return false;
        }
        if(password1.length < 8 || password2.length < 8){
            activateAlert('Minimo 8 caracteres');
            return false;
        }else if(password1 !== password2){
            activateAlert('Contraseña no coincide');
            return false;
        }
        return true;

    }

    const crear = ()=>{
        if (validation()){
            ipcR().send('002', password1);
        }

    }

    const cargar = ()=>{
        ipcR().send('014', true);
        ipcR().on('r014', (event, arg) => {
            arg && window.location.reload();
        });
    }

    const acercaDe = () => {
        setAcercade(!acercade);
    }


    return(
        <div className="row mx-auto newUser">
            <div className="card my-5 mb-3" >
                <div className="row g-0">

                    <div className="col-md-4 contenImgLook">
                        <img src={lock} alt="ControlPass" className="imglock" />
                    </div>

                    <div className="col-md-8">
                        <div className="card-body my-3">
                            <h5 className="card-title mx-auto textRegistro">Registro</h5>
                            <div className="card-text">
                                
                                {/* Nuevo Usuario */}
                                <div className="row my-3 justify-content-center">
                                    <div className="mb-3 row justify-content-md-center">
                                        <label htmlFor="pass1" className="col-sm-4 col-form-label">Nueva Contraseña</label>
                                        <div className="col-sm-6">
                                            <input type="password" className="form-control form-control-sm" id="pass1" placeholder="**********" name="password1" value={password1} onChange={captura} />
                                        </div>
                                    </div>
                                    <div className="mb-3 row justify-content-md-center">
                                        <label htmlFor="pass2" className="col-sm-4 col-form-label">Confirme Contraseña</label>
                                        <div className="col-sm-6">
                                            <input type="password" className="form-control form-control-sm" id="pass2" placeholder="**********" name="password2" value={password2} onChange={captura} />
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-success btn-sm mx-3 botonNewUser" onClick={crear}>Crear</button>
                                    <button type="button" className="btn btn-primary btn-sm mx-3 botonNewUser" onClick={cargar}>Cargar Respaldo</button>
                                </div>
                                {/* FIN de Nuevo Usuario */}


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
                acercade
                &&
                <Acercade />
            }
            
        </div>
    );

    
}