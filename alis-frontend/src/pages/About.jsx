import React from 'react';
import '../styles.css';

export default function About(){
  return (
    <div className="page-bg about-page">
      <div className="nebula" aria-hidden="true"></div>

      <div className="container">
        <div className="card about-grid">
          <div>
            <h2 style={{margin:0}}>About ALIS</h2>
            <p style={{color:'var(--muted)', marginTop:12}}>ALIS is a multi-agent AI loan assistant built by VisionCoders for EY Techathon. It orchestrates verification, underwriting and sanction generation.</p>

            <div className="mt-4">
              <h4>Technical architecture</h4>
              <p style={{color:'var(--muted)'}}>Multi-agent microservices talk to scoring & verification modules and generate audit-ready PDFs.</p>
            </div>

            <div className="mt-4">
              <h4>Mission</h4>
              <p style={{color:'var(--muted)'}}>Make fast, fair, auditable credit decisions for micro and retail borrowers.</p>
            </div>
          </div>

          <aside className="card" style={{background:'linear-gradient(90deg,var(--primary),var(--accent2))', color:'#071019'}}>
            <div style={{fontWeight:900, fontSize:20}}>VisionCoders</div>
            <div style={{marginTop:8}}>Where vision meets innovation — building practical AI solutions for the real world.</div>
          </aside>
        </div>
      </div>
    </div>
  );
}
