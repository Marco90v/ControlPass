import { useEffect, useState } from "react";
import { ipcR } from "../functions/ipcR";


export const dark_light = () => {

    const [value, setValue] = useState();

    const getMode = () => {
        const mode = JSON.parse( localStorage.getItem('mode') );
        return (mode === null) ? false : mode;
    }
    
    const change = () =>{
        localStorage.setItem('mode',!value);
        setValue(!value)
    }

    useEffect(() => {
        setValue(getMode());
        return () => {}
    }, []);

    useEffect(() => {
        ipcR().send('mode',value);
        return () => {}
    }, [value])

    return [value, change];

}