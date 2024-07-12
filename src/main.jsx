import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Modalcontext from './Context/Modalcontext.jsx'

// Service Worker registration
import '../public/registerSW.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Modalcontext>
      <App />
    </Modalcontext>
  </React.StrictMode>
)
