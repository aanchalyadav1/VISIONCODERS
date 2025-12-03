import axios from 'axios'
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export async function sendChat(message, sessionId, user){ return axios.post(`${API_BASE}/api/chat`, { message, sessionId, user }).then(r=>r.data); }
export async function uploadSalary(file){ const fd = new FormData(); fd.append('file', file); return axios.post(`${API_BASE}/api/upload-salary`, fd, { headers: {'Content-Type':'multipart/form-data'} }).then(r=>r.data); }
export async function requestSanction(payload){ return axios.post(`${API_BASE}/api/sanction`, payload, { responseType:'blob' }).then(r=>r.data); }
export async function authVerify(idToken){ return axios.post(`${API_BASE}/auth/verify`, { idToken }).then(r=>r.data); }
export async function getStats(){ return axios.get(`${API_BASE}/api/admin/stats`).then(r=>r.data); }
