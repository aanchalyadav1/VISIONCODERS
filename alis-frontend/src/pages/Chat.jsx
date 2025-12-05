// src/pages/Chat.jsx
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export default function Chat(){
  const [messages, setMessages] = useState([{from:'bot', agent:'ALIS', text:'Welcome to ALIS. Ask about loans, upload salary slip, or type PAN.'}]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [user, setUser] = useState({name:'Guest'});
  const chatRef = useRef();

  useEffect(()=>{ chatRef.current?.scrollTo(0, chatRef.current.scrollHeight); }, [messages]);

  async function startSession(){
    try{
      const res = await axios.post(`${API_BASE}/api/chat`, { message: 'start session', user });
      if(res.data.sessionId) setSessionId(res.data.sessionId);
    }catch(e){ console.error(e); }
  }
  useEffect(()=>{ startSession(); }, []);

  function push(m){ setMessages(s=>[...s,m]); }

  async function sendMsg(){
    if(!input) return;
    const text = input.trim();
    if(!text) return;
    push({from:'user', text});
    setInput('');
    try{
      const resp = await axios.post(`${API_BASE}/api/chat`, { message: text, sessionId, user });
      if(resp.data.sessionId) setSessionId(resp.data.sessionId);

      if(resp.data.reply) push({from:'bot', agent:resp.data.agent, text: resp.data.reply});

      if(resp.data.result && resp.data.agent==='UnderwritingAgent') {
        // if your backend sends suggestedLoanRange, show it; else use fallback
        const r = resp.data.result;
        const sug = r.suggestedLoanRange ? `Suggested loan: ₹${r.suggestedLoanRange.min.toLocaleString()} - ₹${r.suggestedLoanRange.max.toLocaleString()}` : '';
        push({from:'bot', agent:'UnderwritingAgent', text:`Score: ${r.creditScore}, Risk: ${r.risk}. ${sug}`});
      }

      if(resp.data.result && resp.data.agent==='SalesAgent') {
        (resp.data.result.offers || []).forEach(o => push({from:'bot', agent:'SalesAgent', text:`${o.plan}: ₹${o.amount.toLocaleString()} @${o.interest}% EMI ${o.emi}`}));
      }

      if(resp.data.pdfInfo){
        // server returned PDF info (refId + filename)
        push({from:'bot', agent:'SanctionAgent', text:'Sanction letter ready. Click "Download Sanction" below.'});
      }

    }catch(e){
      console.error(e);
      push({from:'bot', text:'Error processing request.'});
    }
  }

  async function handleDownloadSanction(refId){
    try{
      // call same endpoint your server uses and return blob
      const r = await axios.post(`${API_BASE}/api/sanction`, { name: user.name, amount: 50000, interest: 12, tenure: '12 months', refId }, { responseType: 'blob' });
      const blob = new Blob([r.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = `sanction_${refId}.pdf`; document.body.appendChild(a); a.click(); a.remove();
      push({from:'bot', text:'Sanction letter downloaded.'});
    }catch(err){
      console.error(err);
      push({from:'bot', text:'Download failed.'});
    }
  }

  async function handleUpload(e){
    const f = e.target.files[0]; if(!f) return;
    push({from:'user', text:`Uploaded ${f.name}`});
    const fd = new FormData(); fd.append('file', f);
    try{
      const r = await axios.post(`${API_BASE}/api/upload-salary`, fd, { headers: { 'Content-Type':'multipart/form-data' }});
      if(r.data.url) push({from:'bot', agent:'VerificationAgent', text:'Salary slip uploaded.'});
    }catch(er){
      console.error(er); push({from:'bot', text:'Upload failed.'});
    }
  }

  async function googleSignIn(){
    const provider = new GoogleAuthProvider();
    try{
      const res = await signInWithPopup(auth, provider);
      const u = res.user; setUser({name: u.displayName || u.email, uid: u.uid});
      push({from:'bot', text:`Welcome ${u.displayName || u.email}`});
    }catch(e){ console.error(e); }
  }

  return (
    <div className="page-bg chat-page">
      <div className="container">
        <div className="card flex items-center justify-between">
          <div><h2 className="text-lg font-semibold">Chat — ALIS</h2><div className="text-sm" style={{color:'var(--muted)'}}>User: {user.name}</div></div>
          <div className="flex gap-2 items-center">
            <button className="btn" onClick={googleSignIn}>Sign in with Google</button>
            <label className="btn" style={{background:'transparent', border:'1px solid rgba(255,255,255,0.04)', color:'var(--text)'}}>
              Upload Salary
              <input type="file" onChange={handleUpload} style={{display:'none'}} />
            </label>
          </div>
        </div>

        <div className="card mt-4 flex gap-4" style={{alignItems:'flex-start'}}>
          <div style={{flex:1}}>
            <div className="chat-window" ref={chatRef}>
              {messages.map((m,i) => (
                <div key={i} style={{marginBottom:10, textAlign: m.from === 'user' ? 'right' : 'left' }}>
                  <div className={`msg ${m.from === 'user' ? 'msg-user' : 'msg-bot'}`} style={{display:'inline-block'}}>
                    {m.agent && <div className="agent-tag">{m.agent}</div>}
                    <div>{m.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{display:'flex', gap:8, marginTop:12}}>
              <input className="input" value={input} onChange={e=>setInput(e.target.value)} placeholder="Type: loan / PAN ABCDE1234F / salary 30000 / sanction" />
              <button className="btn" onClick={sendMsg}>Send</button>
            </div>
          </div>

          <div className="w-80">
            <div className="card quick-card">
              <h4 className="font-semibold">Quick Actions</h4>
              <div className="mt-2 flex flex-col gap-2">
                <button className="btn" onClick={()=>{ setInput('I want a loan'); }}>Demo Loan</button>
                <button className="btn" onClick={()=>{ setInput('PAN ABCDE1234F'); }}>Demo PAN</button>
                <button className="btn" onClick={()=>{ setInput('salary 30000'); }}>Demo Salary</button>
                <button className="btn" onClick={()=>handleDownloadSanction(`ALIS${Date.now()}`)}>Download Sample Sanction</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
