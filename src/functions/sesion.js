export const setSessionStorage = (arg)=>{
    sessionStorage.setItem('inicio', arg);
}

export const getSessionStorage = ()=>{
    const session = JSON.parse(sessionStorage.getItem('inicio'));
    return session == null ? false : session;
}