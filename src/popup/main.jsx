import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Graph from './graph.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Graph/>
  </StrictMode>,
)
