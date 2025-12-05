import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { 
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

const AuthCtx = createContext();
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({children}){
  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, u=>{
      if(u){
        setUser({
          uid:u.uid,
          name:u.displayName || u.email,
          email:u.email,
          guest:false
        });
      } else {
        setUser(false);
      }
      setLoading(false);
    });
    return ()=>unsub();
  },[]);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const login = async (email,password) => {
    await signInWithEmailAndPassword(auth,email,password);
  };

  const register = async (email,password,name) => {
    const res = await createUserWithEmailAndPassword(auth,email,password);
    if(name) await res.user.updateProfile({displayName:name});
  };

  const logout = async () => {
    await signOut(auth);
  };

  const guest = () => {
    setUser({name:'Guest',guest:true});
  };

  return (
    <AuthCtx.Provider value={{user,loading,googleSignIn,login,register,logout,guest}}>
      {children}
    </AuthCtx.Provider>
  );
}
