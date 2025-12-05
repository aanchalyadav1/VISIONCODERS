import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export default function Dashboard(){
  const [stats, setStats] = useState({sessions:0, uploads:0});
  useEffect(()=>{
    axios.get(`${API_BASE}/api/admin/stats`).then(r=>setStats(r.data)).catch(()=>{});
  },[]);
  return (
    <div className="page-bg dashboard-page">
      <div className="container">
        <div className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <h2 className="text-lg font-semibold">Admin Dashboard</h2>
              <div style={{color:'var(--muted)', marginTop:6}}>Monitoring ALIS demo usage</div>
            </div>
            <div>
              <button className="btn">Export</button>
            </div>
          </div>

          <div className="stats mt-4">
            <div className="stat">
              <h3>{stats.sessions}</h3>
              <p>Active sessions</p>
            </div>
            <div className="stat">
              <h3>{stats.uploads}</h3>
              <p>Uploads</p>
            </div>
            <div className="stat">
              <h3>₹ 5k+</h3>
              <p>Typical demo loan range (tuned for India)</p>
            </div>
            <div className="stat">
              <h3>LOW / MEDIUM</h3>
              <p>Default risk buckets used in demo</p>
            </div>
          </div>

          <div className="card mt-6">
            <h4>Insights</h4>
            <p style={{color:'var(--muted)', marginTop:8}}>This dashboard is for demo monitoring. For production, connect a database and analytics pipeline to collect richer metrics (conversion, approvals, decline reasons).</p>
          </div>
        </div>
      </div>
    </div>
  )
}
