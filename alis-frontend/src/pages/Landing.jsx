import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing(){
  const nav = useNavigate();
  return (
    <div className="container">
      <div className="card flex gap-4 items-center">
        <img src="/team_logo.png" alt="VisionCoders" className="logo" />
        <div>
          <h1 className="text-2xl font-semibold">ALIS — Agentic Loan Intelligence System</h1>
          <p className="text-sm text-gray-300 mt-1">By VisionCoders — Automating the personal loan funnel: verification, underwriting, and instant sanction letters.</p>
          <div className="mt-4 flex gap-2">
            <button className="btn" onClick={()=>nav('/chat')}>Start Demo</button>
          </div>
        </div>
      </div>

      <div className="card mt-6">
        <h3 className="text-lg font-semibold">What ALIS does</h3>
        <ul className="list-disc ml-6 mt-2 text-sm text-gray-300">
          <li>AI-powered multi-agent orchestration</li>
          <li>Fast approvals & personalized offers</li>
          <li>Downloadable sanction letter with VisionCoders branding</li>
        </ul>
      </div>
    </div>
  )
}
