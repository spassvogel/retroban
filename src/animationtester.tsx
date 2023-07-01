import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'



const positions = [
  {x: 20, y: 20},
  {x: 400, y: 20},
  {x: 400, y: 400},
  {x: 20, y: 400},
]

const Tester = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(0)

  const next = () => {
    if (ref.current){
      console.log('stop transition')
      ref.current.style.transition = 'none'
    }
    requestAnimationFrame(() => {
      setI((i + 1) % positions.length)
    })
  }


  const position = positions[i]
  useEffect(() => {
    if (ref.current){
      console.log('start transition')
      ref.current.style.transition = '5s'
    }

  }, [i, position.x, position.y])


  return (
    <>
      <button onClick={next}>next</button>
      <div
        ref={ref}
        style={{
        backgroundColor: 'red',
        transition: '5s',
        width: '20px',
        height: '20px',
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
    </>
  )
}

const root = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(root).render(
  <Tester />
)
