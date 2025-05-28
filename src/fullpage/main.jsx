import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Fullpage from './fullpage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Fullpage />
  </StrictMode>,
)
