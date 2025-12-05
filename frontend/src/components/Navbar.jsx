import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <nav className='flex items-center justify-between p-4 bg-black/20 backdrop-blur border-b border-white/10'>
      <div className='flex items-center gap-3'>
        <img src='/team_logo.png' alt='logo' className='w-10 h-10 rounded-md' />
        <div>
          <div className='font-bold text-white'>ALIS</div>
          <div className='text-xs text-white/60'>Agentic Loan Intelligence System</div>
        </div>
      </div>

      <div className='flex gap-4 text-white/80'>
        <Link to='/' className='hover:text-white'>Home</Link>
        <Link to='/chat' className='hover:text-white'>Chat</Link>
        <Link to='/dashboard' className='hover:text-white'>Dashboard</Link>
      </div>
    </nav>
  )
}