import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

/* Firebase */
import firebase from '../utils/Firebase'
import 'firebase/compat/auth'

export default function Login() {
  const history = useNavigate()

  const [formValue, setFormValue] = useState(DefaultForm())

  const [formError, setFormError] = useState({})


  const onChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    /* Cancelar acción por default del navegador */
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

    // Almacenar errores en el estado
    setFormError(errors)

    if (formOkey) {
      // Login con email y contraseña
      firebase.auth().signInWithEmailAndPassword(formValue.email, formValue.password).then((res) => {
        history('/noticias')
        toast.success('Inicio de sesión satisfactorio')
      }).catch((e) => {
        HandlerErrors(e.code)
      })
    }
  }

  return (
    <div className='container p-5 col-md-8 col-sm-12'>
      <div className="card">
        <div className="card-header">
          <h4>Iniciar Sesión</h4>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <input type="email" className="form-control" name='email' onChange={onChange} required />
              {formError.email && (
                <span style={{ color: 'red' }} className='error-text'>Por favor, introduce un correo válido</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' onChange={onChange} required />
              {formError.email && (
                <span style={{ color: 'red' }} className='error-text'>Por favor, introduce una contraseña válida</span>
              )}
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-primary" type="button" onClick={onSubmit}>Iniciar Sesión</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

/* Toast para mostrar el error según su código */
function HandlerErrors(code) {
  switch (code) {
    case "auth/wrong/password":
      toast.warning('El usuario o la contraseña son incorrectos.')
      break
    case "auth/too-many-requests":
      toast.warning('Has enviado demasiadas solicitudes de reenvío de email de confirmación en muy poco tiempo.')
      break
    case "auth/user-not-found":
      toast.warning('El usuario o contraseña son incorrectos')
      break
    default:
      break
  }
}

function DefaultForm() {
  return {
    email: '',
    password: ''
  }
}

