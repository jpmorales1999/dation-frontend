import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

/* Firebase */
import firebase from '../utils/Firebase'
import 'firebase/compat/auth'

export default function Menu(props) {

    const { user } = props

    const history = useNavigate()
    
    const logout = () => {
        // Métodos para cerrar sesión desde la dependencia Logout
        firebase.auth().signOut()
        history('/')
        toast.success('Cerró sesión satisfactoriamente')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            { !user ? (
                                <>
                                    <li className="nav-item">
                                        <Link to={'/'} className="nav-link">
                                            Iniciar Sesión
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/register'} className="nav-link">
                                            Registro
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link to={'/nueva-noticia'} className="nav-link">
                                            Nueva Noticia
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/noticias'} className="nav-link">
                                            Noticias
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className='btn btn-primary' onClick={logout}>Cerrar Sesión</button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
