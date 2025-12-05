export default function Modal({open,onClose,children}) {
  if(!open) return null;

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50'>
      <div className='bg-white/10 p-6 rounded-xl relative border border-white/20 min-w-[320px]'>
        <button className='absolute top-2 right-2 text-white/70 hover:text-white' onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
}