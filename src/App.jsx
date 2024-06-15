import { useState } from 'react'
import Nav from './components/Nav'
import './App.css'
import Search from './components/Search'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Nav />
      <Search/>
    </>
  )
}

export default App
