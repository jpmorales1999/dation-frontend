import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

/* Firebase */
import firebase from '../utils/Firebase'
import 'firebase/compat/auth'

export default function Register() {
    const history = useNavigate()

    const [formValue, setFormValue] = useState(DefaultForm())

    const [formError, setFormError] = useState({})

    const onSubmit = (e) => {
        e.preventDefault()

        /* Limpiamos estado setFormError */
        setFormError({})

        /* Variable local para capturar los errores de la validación */
        let errors = {}

        /* Variable local para determinar si el formulario está Okey */
        let formOkey = true

        /* Validar campos */
        if (!formValue.email) {
            errors.email = true
            formOkey = false
        }   

        if (formValue.password.length < 6) {
            errors.password = true
            formOkey = false
        }

        if (!formValue.username) {
            errors.username = true
            formOkey = false
        }

        // Agregar errores al estado
        setFormError(errors)

        if (formOkey) {
            firebase.auth().createUserWithEmailAndPassword(formValue.email, formValue.password).then(() => {
                /* Si el registro fue correcto, llamos a la función para asignar nombre de usuario en firebase */
                changeUserName()
                toast.success('Su registro fue exitoso')
                history('/')
            }).catch(() => {
                toast.error('Error al crear la cuenta')
            })
        }   

        setFormValue(DefaultForm())
    }

    const changeUserName = () => {
        /* Por defecto se está creando el usuario en Firebase con email y contraseña, pero hace falta el nombre de usuario, de allí nace está función (DisplayName Campo especifico en Firebase) */
        firebase.auth().currentUser.updateProfile({
            displayName: formValue.username
        }).catch(() => {
            toast.error('Error al asignar el nombre de usuario')
        })
    }

    const onChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='container p-5 col-md-8 col-sm-12'>
            <div className="card">
                <div className="card-header">
                    <h4>Formulario de Registro</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Usuario</label>
                            <input type="text" className="form-control" name='username' onChange={onChange} required />
                            { formError.username && (
                                <span style={{color: 'red'}} className='error-text'>Por favor, introduce un usuario</span>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input type="email" className="form-control" name='email' onChange={onChange} required />
                            { formError.email && (
                                <span style={{color: 'red'}}>Por favor, introduce un correo electrónico válido.</span>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" name='password' onChange={onChange} required />
                            { formError.password && (
                                <span style={{color: 'red'}} className='error-text'>Por favor, introduce una contraseña mayor a 6 caracteres.</span>
                            )}
                        </div>
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" type="button" onClick={onSubmit}>Crear</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

function DefaultForm() {
    return {
        username: '',
        email: '',
        password: ''
    }
}
