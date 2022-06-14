import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { map } from 'lodash'
import { useNavigate } from 'react-router-dom'

/* Firebase */
import firebase from '../utils/Firebase'
import 'firebase/compat/auth'

export default function Noticias() {
  const history = useNavigate()

  const [news, setNews] = useState({})

  firebase.auth().onAuthStateChanged(currentUser => {
    if (!currentUser) {
      history('/')
    }
  })

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('https://dation-api.herokuapp.com/api/news')
        const data = response.data
        setNews(data)
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])

  const like = () => {
    toast.success('Te ha gustado está noticia')
  }

  const onChange = async (e) => {
    try {
      const response = await axios.get(`https://dation-api.herokuapp.com/api/news/${e.target.value}`)
      const data = response.data
      setNews(data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form className='col-md-6 col-sm-12 mx-auto mt-2'>
        <div className="mb-3">
          <input type="email" className="form-control" name='email' placeholder='Buscar Noticia...' onChange={onChange} />
        </div>
      </form>
      <div className='container row mx-auto'>
        {
          map(news, (noticia, index) => (
            <div style={{ width: '400px'}} className='card col-lg-4 col-md-6 col-sm-12 m-2'>
              <Noticia noticia={noticia} key={index} like={like} />
            </div>
          ))
        }
      </div>
    </>
  )
}

function Noticia(props) {
  const { noticia, like } = props

  return (
    <>
      <div className="card-header">
        <h4>{noticia.title}</h4>
      </div>
      <div className="card-body">
        <img className='img-fluid' style={{ width: '200px', height: '200px' }} src={noticia.imageURL} alt={noticia.title} />
      </div>
      <div className="card-footer">
        <p>
          {noticia.content}
        </p>
        <p style={{ fontWeight: 'bold' }}>
          Categoría: {noticia.category}
        </p>
        <button className='btn btn-success' onClick={like}>¡Me gusta!</button>
      </div>
    </>
  )
}
