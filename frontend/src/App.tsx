import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Dashboard } from './pages'
const App = () => {
  return (
    <div>
      <h1>Hello, React Router!</h1>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
