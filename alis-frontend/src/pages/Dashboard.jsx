import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export default function Dashboard(){
  const [stats, setStats] = useState({sessions:0, uploads:0});
  useEffect(()=>{
    axios.get(`${API_BASE}/api/admin/stats`).then(r=>setStats(r.data)).catch(()=>{});
  },[]);
  return (
    <div className="page-bg dashboard-page">
      <div className="nebula" aria-hidden="true"></div>

      <div className="container" style={{display:'flex', gap:20}}>
        <div className="left-sidebar card">
          <div style={{fontWeight:800}}>Admin</div>
          <div style={{marginTop:12, color:'var(--muted)'}}>Agents</div>
          <ul style={{marginTop:12, paddingLeft:16, color:'var(--muted)'}}>
            <li>UnderwritingAgent</li>
            <li>VerificationAgent</li>
            <li>SalesAgent</li>
          </ul>
        </div>

        <div style={{flex:1}}>
          <div className="card">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <h2 style={{margin:0}}>Admin Dashboard</h2>
                <div style={{color:'var(--muted)', marginTop:6}}>Monitoring ALIS demo usage</div>
              </div>
              <button className="btn-ghost">Export</button>
            </div>

            <div className="stats mt-4">
              <div className="stat">
                <div className="count">{stats.sessions ?? 0}</div>
                <p>Active sessions</p>
              </div>
              <div className="stat">
                <div className="count">{stats.uploads ?? 0}</div>
                <p>Uploads</p>
              </div>
              <div className="stat">
                <div className="count">₹ 5k+</div>
                <p>Typical demo loan range</p>
              </div>
              <div className="stat">
                <div className="count">LOW / MED</div>
                <p>Default risk buckets</p>
              </div>
            </div>

            <div className="card mt-4">
              <h4 style={{margin:0}}>Insights</h4>
              <p style={{color:'var(--muted)', marginTop:10}}>This dashboard is for demo monitoring. For production, connect a DB + analytics pipeline.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
