import React from 'react';

export default function About(){
  return (
    <div className="page-bg about-page">
      <div className="container">
        <div className="card about-grid">
          <div>
            <h2 className="text-lg font-semibold">About ALIS</h2>
            <p style={{color:'var(--muted)', marginTop:8}}>ALIS (Agentic Loan Intelligence System) is a multi-agent demo built by VisionCoders for the EY Techathon. It demonstrates a compact, explainable lending flow suitable for micro, retail and MSME use-cases in India.</p>

            <div className="about-team mt-4">
              <h4>Design goals</h4>
              <ul style={{color:'var(--muted)', marginTop:8}}>
                <li>Fast, auditable verification (PAN format checks, salary slips)</li>
                <li>Simple underwriting tuned for low-ticket loans (₹5k–₹5L)</li>
                <li>Downloadable sanction letters with branding & reference IDs</li>
              </ul>
            </div>

            <div style={{marginTop:12}}>
              <h4>Team — VisionCoders</h4>
              <p style={{color:'var(--muted)'}}>We built ALIS to show how multiple small intelligent agents can be stitched into a practical product. Good for hackathons and quick prototyping.</p>
            </div>
          </div>

          <div>
            <div className="card">
              <h4>Tech stack</h4>
              <ul style={{color:'var(--muted)', marginTop:8}}>
                <li>React (frontend)</li>
                <li>Express (backend)</li>
                <li>Firebase storage + auth for demos</li>
                <li>Generative/LLM layer (Groq/Gemini/OpenAI) — pluggable</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
