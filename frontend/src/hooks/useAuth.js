import { useAuth } from '../context/AuthContext'

// Lightweight hook wrapper for easier usage
export default function useAuthHook(){
  const ctx = useAuth();
  return {
    user: ctx.user,
    loading: ctx.loading,
    login: ctx.login,
    register: ctx.register,
    logout: ctx.logout,
    googleSignIn: ctx.googleSignIn,
    guest: ctx.guest
  };
}