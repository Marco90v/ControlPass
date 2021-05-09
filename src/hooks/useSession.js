import { useEffect, useState } from 'react';

export const useSession = () => {
    const [values, setValues] = useState();

    const setSessionStorage = (arg)=>{
        sessionStorage.setItem('inicio', arg);
        setValues(arg);
    }
    
    const getSessionStorage = ()=>{
        const session = JSON.parse(sessionStorage.getItem('inicio'));
        // return session == null ? false : session;
        (session == null) ? setValues(false) : setValues(session);
    }

    useEffect(() => {
        getSessionStorage();
    }, [])

    return [values, setSessionStorage];

}