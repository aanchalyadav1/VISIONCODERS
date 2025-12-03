import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { auth } from '../firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export default function Chat(){
  const [messages, setMessages] = useState([{from:'bot', agent:'ALIS', text:'Welcome to ALIS. Ask about loans or upload salary.'}]);
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
    push({from:'user', text:input});
    try{
      const resp = await axios.post(`${API_BASE}/api/chat`, { message: input, sessionId, user });
      if(resp.data.sessionId) setSessionId(resp.data.sessionId);
      if(resp.data.reply) push({from:'bot', agent:resp.data.agent, text: resp.data.reply});
      if(resp.data.result && resp.data.agent==='UnderwritingAgent') push({from:'bot', agent:'UnderwritingAgent', text:`Score: ${resp.data.result.creditScore}, Risk: ${resp.data.result.risk}`});
      if(resp.data.result && resp.data.agent==='SalesAgent') {
        (resp.data.result.offers || []).forEach(o => push({from:'bot', agent:'SalesAgent', text:`Offer ${o.plan}: ₹${o.amount} @${o.interest}% EMI ₹${o.emi}`}));
      }
      if(resp.data.pdfInfo){
        // download
        const blob = await axios.post(`${API_BASE}/api/sanction`, { name: user.name, amount: 300000, interest: 11.5, tenure: '36 months', refId: resp.data.pdfInfo.refId }, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([blob.data]));
        const a = document.createElement('a'); a.href = url; a.download = `sanction_${resp.data.pdfInfo.refId}.pdf`; a.click(); a.remove();
        push({from:'bot', agent:'SanctionAgent', text:'Sanction letter downloaded.'});
      }
    }catch(e){
      console.error(e); push({from:'bot', text:'Error processing request.'});
    }
    setInput('');
  }

  async function handleUpload(e){
    const f = e.target.files[0]; if(!f) return;
    push({from:'user', text:`Uploaded ${f.name}`});
    const fd = new FormData(); fd.append('file', f);
    const r = await axios.post(`${API_BASE}/api/upload-salary`, fd, { headers:{ 'Content-Type':'multipart/form-data' }});
    if(r.data.url) push({from:'bot', agent:'VerificationAgent', text:'Salary slip uploaded.'});
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
    <div className="container">
      <div className="card flex items-center justify-between">
        <div><h2 className="text-lg font-semibold">Chat — ALIS</h2><div className="text-sm text-gray-300">User: {user.name}</div></div>
        <div className="flex gap-2 items-center">
          <button className="btn" onClick={googleSignIn}>Sign in with Google</button>
          <input type="file" onChange={handleUpload} />
        </div>
      </div>

      <div className="card mt-4 flex gap-4">
        <div className="flex-1">
          <div className="chat-window" ref={chatRef}>
            {messages.map((m,i)=> (
              <div key={i} className={`mb-2 ${m.from==='user' ? 'text-right' : 'text-left'}`}>
                <div className={`msg ${m.from==='user' ? 'msg-user' : 'msg-bot'}`}>
                  {m.agent && <div className="agent-tag">{m.agent}</div>}
                  <div>{m.text}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <input className="input" value={input} onChange={e=>setInput(e.target.value)} placeholder="Type: loan / PAN ABCDE1234F / salary 50000 / sanction" />
            <button className="btn" onClick={sendMsg}>Send</button>
          </div>
        </div>
        <div className="w-80">
          <div className="card">
            <h4 className="font-semibold">Quick Actions</h4>
            <div className="mt-2 flex flex-col gap-2">
              <button className="btn" onClick={()=>{ setInput('I want a loan'); }}>Demo Loan</button>
              <button className="btn" onClick={()=>{ setInput('PAN ABCDE1234F'); }}>Demo PAN</button>
              <button className="btn" onClick={()=>{ setInput('salary 60000'); }}>Demo Salary</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
