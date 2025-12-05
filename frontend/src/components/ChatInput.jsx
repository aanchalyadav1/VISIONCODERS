export default function ChatInput({value,onChange,onSend}){
  return (
    <div className='flex gap-2'>
      <input className='flex-1 bg-white/5 px-3 py-2 rounded' value={value} onChange={e=>onChange(e.target.value)} />
      <button className='bg-blue-500 px-4 py-2 rounded' onClick={onSend}>Send</button>
    </div>
  )
}