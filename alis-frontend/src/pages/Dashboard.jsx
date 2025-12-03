import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export default function Dashboard(){
  const [stats, setStats] = useState({sessions:0, uploads:0});
  useEffect(()=>{
    axios.get(`${API_BASE}/api/admin/stats`).then(r=>setStats(r.data)).catch(()=>{});
  },[]);
  return (
    <div className="container">
      <div className="card">
        <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        <div className="mt-4">
          <div>Active sessions: <strong>{stats.sessions}</strong></div>
          <div>Uploads: <strong>{stats.uploads}</strong></div>
        </div>
      </div>
    </div>
  )
}
