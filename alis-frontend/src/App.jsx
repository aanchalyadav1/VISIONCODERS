import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Landing from './pages/Landing'
import Chat from './pages/Chat'
import Dashboard from './pages/Dashboard'
import About from './pages/About'

export default function App(){
  return (
    <div>
      <nav className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <img src="/team_logo.png" alt="logo" className="logo" />
          <div>
            <div className="text-xl font-bold">ALIS — Agentic Loan Intelligence System</div>
            <div className="text-sm text-gray-300">VisionCoders</div>
          </div>
        </div>
        <div className="flex gap-3">
          <Link to="/" className="btn">Home</Link>
          <Link to="/chat" className="btn">Chat</Link>
          <Link to="/dashboard" className="btn">Dashboard</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </div>
  )
}
