export default function Toast({message}) {
  return (
    <div className='fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded shadow-lg animate-pulse'>
      {message}
    </div>
  );
}