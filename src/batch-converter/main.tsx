import React from 'react'
import ReactDOM from 'react-dom/client'
import BatchConverter from './BatchConverter'

const root = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BatchConverter />
  </React.StrictMode>,
)
