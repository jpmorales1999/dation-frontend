import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

// Components 

import Register from './components/Register'
import Menu from './components/Menu'
import Login from './components/Login'
import Noticias from './components/Noticias'
import NuevaNoticia from './components/NuevaNoticia'

/* Firebase */
import firebase from './utils/Firebase'
import 'firebase/compat/auth'

export default function App() {
  const [user, setUser] = useState(null)

  firebase.auth().onAuthStateChanged(currentUser => {
    // El interrogante se encarga de verificar que currentUser contenga emailVerified, la condición comprueba si aún no se ha verificado el email
    if (!currentUser) {
      setUser(null)
    } else {
      // En caso de que exista un usuario logueado guardamos su información
      setUser(currentUser)
    }
  })

  return (
    <div>
      <BrowserRouter>
        <Menu user={user} />

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/noticias' element={<Noticias />} />
          <Route path='/nueva-noticia' element={<NuevaNoticia  />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme='colored'
      />

    </div>
  );
}
