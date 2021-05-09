import lock from '../assets/lock.jpg';
import { useEffect, useState } from 'react';
import { ipcR } from "../functions/ipcR";
import { useForm } from '../hooks/useForm';
// import { setSessionStorage } from "../functions/sesion";
import { FormLoging } from './FromLogin';

export const Login = ({setSession}) => {

    const [{password}, captura] = useForm({password:''});
    const [animacion, setAnimacion] = useState('animate__bounceIn');
    const [salida, setSalida] = useState('animate__backInLeft');
    const [acercade,setAcercade] = useState(false);
    const [{alert, mensaje},setAlert] = useState({alert:false,mensaje:''});

    useEffect(() => {
        ipcR().on('r003', (event, arg) => {
            if(arg){
                ipcR().removeAllListeners('r003');
                setSalida('animate__backOutLeft');
                setTimeout(() => { setSession(arg); }, 700);
            }else{ activateAlert('Contraseña incorrecta'); }
        });
        return () => { ipcR().removeAllListeners('r003');  }
    }, []);

    const activateAlert = (mensaje) => {
        setAlert({alert:true, mensaje});
        setAnimacion('animate__bounceIn');
        setTimeout(() => { setAnimacion('animate__bounceOut'); }, 3000);
        setTimeout(() => { setAlert({alert:false,mensaje:''}); }, 4000);
    }

    const inicio = (e)=>{
        e.preventDefault();
        password !== '' ? ipcR().send('003', password) : activateAlert('Debe ingresar una contraseña');
    }

    const acercaDe = () => {
        if(acercade){
            const clases = document.getElementById("salir").getAttribute("class");
            document.getElementById("salir").setAttribute("class",clases+" animate__fadeOutRight");
            setTimeout(() => { setAcercade(!acercade); }, 500);
        }else{ setAcercade(!acercade); }
    }

    return(

        <FormLoging
            salida={salida}
            lock={lock}
            password={password}
            captura={captura}
            inicio={inicio}
            alert={alert}
            animacion={animacion}
            mensaje={mensaje}
            acercaDe={acercaDe}
            acercade={acercade}
        />
    );
    
}