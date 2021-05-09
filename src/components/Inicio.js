import { useEffect, useState } from 'react';
import { Login } from "./Login";
import { NewUser } from "./NewUser";
import { Dashboard } from './Dashboard';
import { ipcR } from "../functions/ipcR";
import { useSession } from "../hooks/useSession";
import { Cargando } from './Cargando';
import { dark_light } from '../hooks/dark_light';

export const Inicio = () => {

    const [valueMode, changeMode] = dark_light();
    // console.log(valueMode);
    document.querySelector('body').setAttribute('class',valueMode ? 'darkMode' : '');

    const [loginNew,setloginNew]=useState(<Cargando />);
    const [session, setSessionStorage]=useSession();

    useEffect(() => {
        if(!session){
            ipcR().send('001', true);
            ipcR().on('r001', (event, arg) => {
                arg ? setloginNew(<Login setSession={setSessionStorage} />) : setloginNew(<NewUser/>);
                ipcR().removeAllListeners('r001');
            });
        }
        return () => { ipcR().removeAllListeners('r001'); }
    },[]);

    return(
        <>
            {
                session ? <Dashboard setSession={setSessionStorage} changeMode={changeMode} valueMode={valueMode} />
                : loginNew
            }
        </>
    );


}

