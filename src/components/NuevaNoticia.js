import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

/* Firebase */
import firebase from '../utils/Firebase'
import 'firebase/compat/auth'
import { toast } from 'react-toastify'

export default function NuevaNoticia() {
    const history = useNavigate()

    const [formValue, setFormValue] = useState(DefaultForm())

    firebase.auth().onAuthStateChanged(currentUser => {
        if (!currentUser) {
            history('/')
        }
    })

    const onChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        try {
            await axios.post('https://dation-api.herokuapp.com/api/news', formValue)
            toast.success('Noticia creada correctamente')
            history('/noticias')
        } catch (error) {
            console.log(error);
        }
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
                            <label htmlFor="title" className="form-label">Título</label>
                            <input type="text" className="form-control" name='title' onChange={onChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Contenido</label>
                            <textarea type="text" className="form-control" name='content' onChange={onChange} required></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Categoría</label>
                            <input type="text" className="form-control" name='category' onChange={onChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="imageURL" className="form-label">URL Imágen</label>
                            <input type="text" className="form-control" name='imageURL' onChange={onChange} required />
                        </div>
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" type="button" onClick={onSubmit}>Crear Noticia</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

function DefaultForm() {
    return {
        title: '',
        content: '',
        category: '',
        imageURL: ''
    }
}
