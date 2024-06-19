import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Modalcontext from './Context/Modalcontext.jsx'
import StoreIdcontext from './Context/StoreIdcontext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreIdcontext>
      <Modalcontext>
        <App />
      </Modalcontext>
    </StoreIdcontext>
  </React.StrictMode>,
)
