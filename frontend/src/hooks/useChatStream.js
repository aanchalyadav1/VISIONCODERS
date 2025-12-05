import { useState } from 'react'
import { sendChat } from '../utils/api'

export default function useChatStream(){
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [typing, setTyping] = useState(false);

  async function send(text, user){
    setMessages(prev => [...prev, { from:'user', text }]);
    setTyping(true);

    const resp = await sendChat(text, sessionId, user);
    if(resp.sessionId) setSessionId(resp.sessionId);

    setTyping(false);
    setMessages(prev => [...prev, { from:'bot', agent:resp.agent, text:resp.reply }]);

    return resp;
  }

  return {
    messages,
    typing,
    send
  };
}