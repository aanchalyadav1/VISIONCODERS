import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import UIProvider from './context/UIContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Chat from './pages/Chat';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import { setPageBackground } from './utils/backgroundController';

export default function App(){
  const loc = useLocation();

  useEffect(()=>{
    setPageBackground(loc.pathname);
  }, [loc.pathname]);

  return (
    <AuthProvider>
      <UIProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </UIProvider>
    </AuthProvider>
  );
}
