import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchFlight from './pages/searchFlight'
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SearchFlight />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
