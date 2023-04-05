import React from 'react'
import ReactDOM from 'react-dom/client'
import Converter from './Converter'

const root = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Converter />
  </React.StrictMode>,
)
