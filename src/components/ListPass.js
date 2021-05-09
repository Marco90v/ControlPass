import { useState } from 'react';
import { useEffect } from "react";
import { ipcR } from "../functions/ipcR";
import { FormList } from './FormList';

export const ListPass=({valueMode,buscar})=>{

    const [valuePass, setvaluePass] = useState([]);
    const [temp, setTemp] = useState([]);
    const [{cID,name}, setCID] = useState({cID:'',name:''});

    const eliminar = ()=>{
        ipcR().on('r010', (event, arg) => {
            if(arg.r){
                document.getElementById(cID).setAttribute("class","animate__animated animate__bounceOut");
                setTimeout(() => {
                    setvaluePass(valuePass.filter(i => i.ID !== arg.ID));
                    ipcR().removeAllListeners('r010');
                }, 700);
            }
        });
        ipcR().send('010', cID);
    }

    const capID = (id,nombre) => { setCID({ cID:id, name:nombre }); }

    const cambio = (numItem)=>{
        setTemp(temp.map((i,x)=>{
            i.state = (x===numItem) ? !i.state : i.state;
            return i;
        }));
    }

    useEffect(() => {
        ipcR().on('r005', (event, rows) => {
            rows.length>0 && setvaluePass(rows);
            rows.length>0 && setTemp(rows);
            ipcR().removeAllListeners('r005');
        });
        ipcR().send('005', true);
        return () => {
            ipcR().removeAllListeners('r005');
            ipcR().removeAllListeners('r010');
        }
    }, []);

    useEffect(() => {
        setTemp(valuePass);
        return () => { ipcR().removeAllListeners('r010'); }
    }, [valuePass]);

    useEffect(() => {
        if(buscar !== undefined){
            setTemp(valuePass.filter(i => {
                return i.name.includes(buscar) || i.url.includes(buscar) || i.email.includes(buscar) || i.user.includes(buscar);
            }));
        }
        return () => { }
    }, [buscar]);


    return(
        <FormList 
            temp={temp} 
            cambio={cambio} 
            eliminar={eliminar} 
            capID={capID} 
            numID={cID} 
            nombre={name} 
            valueMode={valueMode}
        />
    );
    
}

