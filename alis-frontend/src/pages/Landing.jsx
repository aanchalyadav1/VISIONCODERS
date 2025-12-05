import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

export default function Landing(){
  const nav = useNavigate();
  return (
    <div className="page-bg landing-page">
      <div className="nebula" aria-hidden="true"></div>

      <div className="container hero">
        <div className="hero-left card pulse-wrap" style={{zIndex:3}}>
          <div style={{display:'flex', gap:12, alignItems:'center'}}>
            <img src="/team_logo.png" alt="VisionCoders" className="logo" />
            <div>
              <div style={{fontWeight:800, fontSize:18}}>ALIS — Agentic Loan Intelligence System</div>
              <div style={{color:'var(--muted)', marginTop:4}}>VisionCoders</div>
            </div>
          </div>

          <h1 className="hero-title mt-4">ALIS — Agentic Loan Intelligence System</h1>
          <p className="hero-lead">
            AI-powered multi-agent assistant for quick verification, underwriting & instant sanction letters — purpose built for micro & retail lending in India.
          </p>

          <div className="mt-4" style={{display:'flex', gap:10}}>
            <button className="btn" onClick={()=>nav('/chat')}>Start Demo</button>
            <button className="btn-ghost" onClick={()=>nav('/about')}>About</button>
          </div>

          <div className="features mt-6">
            <div className="feature">
              <div style={{width:12, height:48, background:'linear-gradient(180deg,var(--primary),var(--accent2))', borderRadius:8}} />
              <div>
                <div style={{fontWeight:800}}>Fast Verification</div>
                <div style={{color:'var(--muted)', marginTop:6}}>PAN & salary slip checks — automated & auditable.</div>
              </div>
            </div>

            <div className="feature">
              <div style={{width:12, height:48, background:'linear-gradient(180deg,var(--accent),var(--neon))', borderRadius:8}} />
              <div>
                <div style={{fontWeight:800}}>Smart Underwriting</div>
                <div style={{color:'var(--muted)', marginTop:6}}>Practical scoring tuned for Indian salary ranges and MSME needs.</div>
              </div>
            </div>

            <div className="feature">
              <div style={{width:12, height:48, background:'linear-gradient(180deg,var(--accent2),var(--primary))', borderRadius:8}} />
              <div>
                <div style={{fontWeight:800}}>Sanction Letters</div>
                <div style={{color:'var(--muted)', marginTop:6}}>Download branded sanction PDFs instantly for approvals & records.</div>
              </div>
            </div>
          </div>
        </div>

        <aside style={{width:320}} className="w-80">
          <div className="card">
            <h4 style={{margin:0}}>Demo</h4>
            <p style={{color:'var(--muted)', marginTop:8}}>Try a quick demo or go to the chat to start the ALIS flow.</p>
            <div style={{marginTop:12, display:'flex', gap:8}}>
              <button className="btn" onClick={()=>nav('/chat')}>Open Chat</button>
              <button className="btn-ghost" onClick={()=>nav('/dashboard')}>Admin</button>
            </div>
            <div style={{color:'var(--muted)', marginTop:10, fontSize:13}}>Tip: Upload a salary slip in chat to test underwriting.</div>
          </div>
        </aside>
      </div>

      <div className="container" style={{marginTop:28}}>
        <div className="card">
          <h3 style={{margin:0}}>What ALIS does</h3>
          <ul style={{marginTop:12, color:'var(--muted)'}}>
            <li>AI-powered multi-agent orchestration</li>
            <li>Fast approvals & personalized offers</li>
            <li>Downloadable sanction letter with VisionCoders branding</li>
          </ul>
        </div>
      </div>

      <div className="footer">© VisionCoders — ALIS</div>
    </div>
  );
}
