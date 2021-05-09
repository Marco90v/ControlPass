import { useEffect, useState } from "react";
import { ipcR } from "../functions/ipcR";
import { useForm } from "../hooks/useForm";
import { FormRegister } from "./FormRegister";


export const Nuevo = ()=>{

    let mounted = true;
    useEffect(() => {
        mounted = true;
        ipcR().on('r004', (event, arg) => {
            if(arg){
                activateAlert('Datos agregados con en exito','alert-success');
                reset();
            }else{ activateAlert('Error al agregar los datos','alert-danger'); }
        });
        return () => {
            mounted = false;
            ipcR().removeAllListeners('r004');
        }
    },[]);

    const [value, setValues, reset] = useForm({name:'',url:'',email:'',user:'',pass:''});
    const [animacion, setAnimacion] = useState('animate__bounceIn');
    const [{alert, mensaje},setAlert] = useState({alert:false,mensaje:''});
    const [tipoAlert, setTipoAlert] = useState('');

    const activateAlert = (mensaje,tipo) => {
        setAlert({alert:true, mensaje});
        setAnimacion('animate__bounceIn');
        setTipoAlert(tipo);
        setTimeout(() => { mounted && setAnimacion('animate__bounceOut'); }, 3000);
        setTimeout(() => { mounted && setAlert({alert:false,mensaje:''}); }, 4000);
    }

    const add = (e)=>{
        e.preventDefault();
        let validacion = true;
        Object.values(value).map((e)=> {
            if(e === ""){ validacion = false; }
            return e;
        });
        validacion ? ipcR().send('004', value): activateAlert('Todos los campos son obligatoios','alert-danger');
    };


    return(
        <FormRegister 
            value={value} 
            accion={add} 
            setValues={setValues} 
            animacion={animacion} 
            alert={alert} 
            mensaje={mensaje} 
            tipoAlert={tipoAlert}
            txtButton="Agregar"
        />
    );

}