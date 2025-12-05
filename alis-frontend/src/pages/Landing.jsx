import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing(){
  const nav = useNavigate();
  return (
    <div className="page-bg landing-page">
      <div className="container">
        <div className="hero card">
          <div className="hero-left">
            <img src="/team_logo.png" className="logo" alt="VisionCoders" />
            <h1 className="hero-title">ALIS — Agentic Loan Intelligence System</h1>
            <p className="hero-lead">AI-powered multi-agent assistant for quick verification, underwriting & instant sanction letters — purpose-built for micro & retail lending in India.</p>

            <div style={{marginTop:20}}>
              <button className="btn" onClick={()=>nav('/chat')}>Start Demo</button>
              <button style={{marginLeft:12}} className="btn" onClick={()=>nav('/about')}>About</button>
            </div>

            <div className="features mt-4">
              <div className="feature">
                <div style={{width:40,height:40, borderRadius:10, background:'linear-gradient(90deg,var(--primary),var(--accent2))'}} />
                <div>
                  <div style={{fontWeight:700}}>Fast Verification</div>
                  <div style={{color:'var(--muted)', fontSize:13}}>PAN & salary slip checks — automated & auditable.</div>
                </div>
              </div>

              <div className="feature">
                <div style={{width:40,height:40, borderRadius:10, background:'linear-gradient(90deg,var(--accent),var(--neon))'}} />
                <div>
                  <div style={{fontWeight:700}}>Smart Underwriting</div>
                  <div style={{color:'var(--muted)', fontSize:13}}>Practical scoring tuned for Indian salary ranges and MSME needs.</div>
                </div>
              </div>

              <div className="feature">
                <div style={{width:40,height:40, borderRadius:10, background:'linear-gradient(90deg,var(--accent2),var(--primary))'}} />
                <div>
                  <div style={{fontWeight:700}}>Sanction Letters</div>
                  <div style={{color:'var(--muted)', fontSize:13}}>Download branded sanction PDFs instantly for approvals & records.</div>
                </div>
              </div>
            </div>

          </div>

          <div style={{width:420}}>
            <div className="card">
              <h3 style={{margin:0}}>Demo</h3>
              <p style={{color:'var(--muted)', fontSize:13}}>Try a quick demo or go to the chat to start the ALIS flow.</p>
              <div style={{marginTop:12, display:'flex', gap:8}}>
                <button className="btn" onClick={()=>nav('/chat')}>Open Chat</button>
                <button className="btn" onClick={()=>nav('/dashboard')}>Admin</button>
              </div>
              <div style={{marginTop:12, fontSize:13, color:'var(--muted)'}}>Tip: Upload a salary slip in chat to test underwriting.</div>
            </div>
          </div>
        </div>

        <div className="card mt-6 section-orbit">
          <h3>What ALIS does</h3>
          <ul style={{marginTop:8, color:'var(--muted)'}}>
            <li>Orchestrates multiple micro-services/agents to emulate a lending flow.</li>
            <li>Designed for Indian salary ranges and micro loans (₹5,000+).</li>
            <li>Produces shareable sanction PDFs with audit-friendly data.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
