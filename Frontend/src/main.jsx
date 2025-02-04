import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContext.jsx'
import CaptainContext from './context/Captaincontext.jsx'
import SocketProvider from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>

    <CaptainContext>
      <SocketProvider>
    <BrowserRouter>
      <App />

    </BrowserRouter>
    </SocketProvider>
    </CaptainContext>
    </UserContext>

  </StrictMode>,
)
