import './App.css'
import { Route, Routes } from 'react-router-dom'
import Deck from './components/Deck'
import Home from './components/Home'
import Header from './components/Header'

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/deck/:id" element={<Deck />} /> {/* Render DeckView for /deck/:id */}
    </Routes>
    </>
  )
}

export default App
