import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { Dashboard, Sketch } from './pages'

const App: React.FC = () => {
  return (
    <div>
      <h1>Dali</h1>
      <p>
        <Link to="/">Dashboard</Link>
      </p>
      <p>
        <Link to="/sketch">Sketch</Link>
      </p>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sketch" element={<Sketch />} />
      </Routes>
    </div>
  )
}

export default App
