import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Menu = ({setSession,change, buscar}) => {

    const inicio = [
        {active:'',link:'/listpass',title:'Inicio',ico:'bi-house-fill'},
        {active:'',link:'/nuevo',title:'Nuevo',ico:'bi-file-earmark-plus-fill'},
        {active:'',link:'/config',title:'Configuración',ico:'bi-sliders'},
        {active:'',link:'/acerca',title:'Acerca De',ico:'bi-question-square-fill'}
    ];
    const location = useLocation();
    const [menu, setMenu] = useState(inicio);
    
    useEffect(() => {
        setMenu(menu.map( (item,x) => {
            return (item.link === location.pathname) ? { ...item, active:'active'} : inicio[x];
        }));
        return () => { }
    }, [location]);

    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a href="#" className="navbar-brand" onClick={()=>{setSession(false)}} alt="Cerrar" title="Salir/Cerrar" >
                        <i className="bi bi-unlock-fill mx-3"></i>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" ></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {
                                menu.map((item,x)=>{
                                    return(
                                        <li className="nav-item" key={x}>
                                            <Link className={`nav-link ${item.active}`} to={item.link} >
                                                <i className={`bi ${item.ico} mx-1`}></i>
                                                {item.title}
                                            </Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        <form className="d-flex search">
                            <input className="form-control form-control-sm me-2" type="text" placeholder="Buscar" aria-label="buscar" name="buscar" id="buscar" value={buscar} onChange={(e)=>{change(e);}}/>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );

}