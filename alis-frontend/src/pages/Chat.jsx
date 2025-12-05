// Chat.jsx (improved layout + background usage)
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import '../styles.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export default function Chat(){
  const [messages, setMessages] = useState([{from:'bot', agent:'ALIS', text:'Welcome to ALIS. Ask about loans, upload salary slip, or type PAN.'}]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [user, setUser] = useState({name:'Guest'});
  const chatRef = useRef();

  useEffect(()=>{ chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior:'smooth' }); }, [messages]);

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
    const text = input;
    push({from:'user', text});
    setInput('');
    try{
      const resp = await axios.post(`${API_BASE}/api/chat`, { message: text, sessionId, user });
      if(resp.data.sessionId) setSessionId(resp.data.sessionId);
      if(resp.data.reply) push({from:'bot', agent:resp.data.agent, text: resp.data.reply});
      if(resp.data.result && resp.data.agent==='UnderwritingAgent') push({from:'bot', agent:'UnderwritingAgent', text:`Score: ${resp.data.result.creditScore}, Risk: ${resp.data.result.risk}. Suggested loan: ₹${resp.data.result.suggestedLoanRange.min.toLocaleString()} - ₹${resp.data.result.suggestedLoanRange.max.toLocaleString()}`});
      if(resp.data.result && resp.data.agent==='SalesAgent') {
        (resp.data.result.offers || []).forEach(o => push({from:'bot', agent:'SalesAgent', text:`${o.plan}: ₹${o.amount.toLocaleString()} @${o.interest}% EMI ${o.emi}`}));
      }
    }catch(e){
      console.error(e); push({from:'bot', text:'Error processing request.'});
    }
  }

  async function handleUpload(e){
    const f = e.target.files[0]; if(!f) return;
    push({from:'user', text:`Uploaded ${f.name}`});
    const fd = new FormData(); fd.append('file', f);
    try{
      const r = await axios.post(`${API_BASE}/api/upload-salary`, fd, { headers:{ 'Content-Type':'multipart/form-data' }});
      if(r.data.url) push({from:'bot', agent:'VerificationAgent', text:'Salary slip uploaded.'});
    }catch(err){
      push({from:'bot', text:'Upload failed.'});
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
      <div className="nebula" aria-hidden="true"></div>

      <div className="container" style={{display:'flex', gap:20, alignItems:'flex-start'}}>
        <div style={{flex:1}}>
          <div className="card">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <h2 style={{margin:0}}>Chat — ALIS</h2>
                <div style={{color:'var(--muted)', marginTop:6}}>User: {user.name}</div>
              </div>
              <div style={{display:'flex', gap:8, alignItems:'center'}}>
                <button className="btn-ghost" onClick={googleSignIn}>Sign in with Google</button>
                <label className="btn-ghost" style={{cursor:'pointer'}}>
                  Upload Salary
                  <input type="file" onChange={handleUpload} style={{display:'none'}} />
                </label>
              </div>
            </div>

            <div className="mt-4 flex gap-6">
              <div style={{flex:1}}>
                <div className="chat-window" ref={chatRef}>
                  {messages.map((m,i)=> (
                    <div key={i} style={{display:'flex', flexDirection:'column', alignItems: m.from==='user' ? 'flex-end' : 'flex-start'}}>
                      <div className={`msg ${m.from==='user' ? 'msg-user msg-bubble' : 'msg-bot msg-bubble'}`} style={{maxWidth:'84%'}}>
                        {m.agent && <div className="agent-tag">{m.agent}</div>}
                        <div>{m.text}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4" style={{display:'flex', gap:10}}>
                  <input className="input" value={input} onChange={e=>setInput(e.target.value)} placeholder="Type: loan / PAN ABCDE1234F / salary 50000 / sanction" />
                  <button className="btn" onClick={sendMsg}>Send</button>
                </div>
              </div>

              <aside style={{width:320}} className="w-80">
                <div className="card quick-card">
                  <h4 style={{margin:0}}>Quick Actions</h4>
                  <div style={{marginTop:12, display:'flex', flexDirection:'column', gap:10}}>
                    <button className="btn" onClick={()=>setInput('I want a loan')}>Demo Loan</button>
                    <button className="btn" onClick={()=>setInput('PAN ABCDE1234F')}>Demo PAN</button>
                    <button className="btn" onClick={()=>setInput('salary 30000')}>Demo Salary</button>
                    <button className="btn" onClick={()=>setInput('sanction sample')}>Download Sample Sanction</button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
