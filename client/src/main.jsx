import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes.jsx'
import ContactContext from './Context/ContactContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContactContext>
      <RouterProvider router={router}/>
    </ContactContext>
  </StrictMode>,
)
