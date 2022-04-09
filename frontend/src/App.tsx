import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Dashboard, Sketch, Notepad } from './pages'
import { Header } from './components/dashboard'

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sketch" element={<Sketch />} />
        <Route path="/notepad" element={<Notepad />} />
      </Routes>
    </div>
  )
}

export default App
