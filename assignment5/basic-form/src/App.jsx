import './App.css'
import { useState } from 'react'
import BasicForm from './userReg'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <BasicForm />
    </div>
  )
}

export default App
