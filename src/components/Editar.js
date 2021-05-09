import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ipcR } from "../functions/ipcR";
import { useForm } from "../hooks/useForm";
import { FormRegister } from "./FormRegister";


export const Editar = ()=>{

    const [value, setValues, reset] = useForm({name:'',url:'',email:'',user:'',pass:''});
    const [animacion, setAnimacion] = useState('');
    const [{alert, mensaje},setAlert] = useState({alert:false,mensaje:''});
    const [tipoAlert, setTipoAlert] = useState('');

    const activateAlert = (mensaje,tipo) => {
        setAlert({alert:true, mensaje});
        setAnimacion('animate__bounceIn');
        setTipoAlert(tipo);
        setTimeout(() => { setAnimacion(''); }, 1000);
    }

    useEffect(() => {
        ipcR().on('r008', (event, arg) => {
            reset(arg);
            ipcR().removeAllListeners('r008');
        });
        ipcR().on('r009', (event, arg) => {
            arg ? activateAlert('Datos editados correctamente','alert-success') : activateAlert('Error al momento de editar','alert-danger');
        });
        return () => {
            ipcR().removeAllListeners('r008');
            ipcR().removeAllListeners('r009');
        }
    }, []);

    const { ID } = useParams();
    ID && ipcR().send('008', ID);

    const editar = (e)=>{
        e.preventDefault();
        let validacion = true;
        Object.values(value).map((e)=> {
            if(e === ""){ validacion = false; }
            return e;
        });
        validacion && ipcR().send('009', value); 
    };


    return(
        <FormRegister 
            value={value} 
            accion={editar} 
            setValues={setValues} 
            animacion={animacion} 
            alert={alert} 
            mensaje={mensaje} 
            tipoAlert={tipoAlert} 
            txtButton="Editar"
        />
    );


}