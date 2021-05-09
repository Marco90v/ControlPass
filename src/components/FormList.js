import { Link } from "react-router-dom";

export const FormList = ({temp,cambio,eliminar,capID, numID, nombre, valueMode})=>{

    return(
        <>
            <table id="salir" className={`table ${valueMode ? 'table-dark' : ''} table-striped table-hover animate__animated animate__fadeInLeft`}>
                <thead className="table-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Url</th>
                        <th>Correo</th>
                        <th>Usuario</th>
                        <th>Contraseña</th>
                        <th>Editar</th>
                        <th>Ver</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        temp.map((i,numItem)=>{
                            return(
                                <tr key={i.ID} id={i.ID}>
                                    <th scope="row">{i.name}</th>
                                    <td>{i.url}</td>
                                    <td>{i.email}</td>
                                    <td>{i.user}</td>
                                    <td className="boldPass">{i.state ? i.pass : '**********'}</td>
                                    <td>
                                        <Link type="button" className="btn btn-warning" to={`/editar/${i.ID}`} >
                                            <i className="bi bi-pencil-square" />
                                        </Link>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-success" onClick={()=>{cambio(numItem)}}>
                                            {
                                                i.state ? <i className="bi bi-eye-slash-fill" /> : <i className="bi bi-eye-fill" />
                                            }
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{capID(i.ID,i.name)}} >
                                            <i className="bi bi-trash-fill" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            
            {/* Modal */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Alerta</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>¿Estas seguro que deseas eliminar el registro con nombre: <strong className="nomEli">{ nombre }</strong>?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{eliminar(numID)}}>Aceptar</button>
                    </div>
                    </div>
                </div>
            </div>

        </>
    );


}