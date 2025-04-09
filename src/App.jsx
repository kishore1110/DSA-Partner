import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import ProblemList from './components/ProblemList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
    <ProblemList />
    </div>
  )
}

export default App
