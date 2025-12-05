export default function MessageBubble({ from, text, agent }) {
  return (
    <div className={from==='user'?'text-right':'text-left'}>
      <div className={'inline-block px-4 py-2 rounded-lg '+(from==='user'?'bg-blue-600':'bg-gray-800')}>
        {agent && <div className='text-xs opacity-60'>{agent}</div>}
        <div>{text}</div>
      </div>
    </div>
  )
}