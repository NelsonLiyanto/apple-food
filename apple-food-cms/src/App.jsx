import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import router from './routers'
import { RouterProvider } from 'react-router-dom'

function App() {

  return (
            <>  
          <RouterProvider router={router}/>
        </>
  )
}

export default App
