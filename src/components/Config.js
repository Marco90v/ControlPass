import { useState } from "react";
import { ipcR } from "../functions/ipcR";
import { useForm } from "../hooks/useForm";
import { FormConfig } from "./FromConfig";

export const Config = ({changeMode,valueMode})=>{

    const [{passOld, pass1, pass2}, setValues] = useForm({passOld:'', pass1:'', pass2:''});
    const [animacion, setAnimacion] = useState('animate__bounceIn');
    const [{alert, mensaje},setAlert] = useState({alert:false,mensaje:''});
    const [tipoAlert, setTipoAlert] = useState('');

    const activateAlert = (mensaje,tipo) => {
        setAlert({alert:true, mensaje});
        setAnimacion('animate__bounceIn');
        setTipoAlert(tipo);
        setTimeout(() => { setAnimacion('animate__bounceOut'); }, 3000);
        setTimeout(() => { setAlert({alert:false,mensaje:''}); }, 4000);
    }

    const accion = (send, datos=true) => {
        ipcR().send(send, datos);
        ipcR().on('r'+send, (event, arg) => {
            arg.state ? activateAlert(arg.msg,"alert-success") : activateAlert(arg.msg,"alert-danger");
            ipcR().removeAllListeners('r'+send);
        });
        ipcR().on('insert', (event, arg) => {
            arg ? console.log(arg.msg) : console.log('Error');
        });
    } 

    const cambioPass = ()=>{
        if (pass1 === "" || pass2 === "" || passOld === ""){
            activateAlert("Todos los campos son obligatorios","alert-danger");
        }else if(pass1!==pass2){
            activateAlert("Contraseña no coincide","alert-danger");
        }else if(pass1.length < 8 ){
            activateAlert("La contraseña debe ser un mínimo de 8 caracteres","alert-danger");
        }else{
            const newPass = pass1;
            accion('015',{passOld,newPass});
        }
    }
    
    return(
        <>
            <FormConfig 
                passOld={passOld} 
                pass1={pass1} 
                pass2={pass2} 
                setValues={setValues} 
                cambioPass={cambioPass} 
                alert={alert} 
                tipoAlert={tipoAlert} 
                animacion={animacion} 
                mensaje={mensaje} 
                accion={accion}
                changeMode={changeMode}
                valueMode={valueMode}
            />
        </>
    );
}