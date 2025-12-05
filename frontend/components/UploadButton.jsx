export default function UploadButton({onUpload}){
  return (
    <label className='cursor-pointer px-3 py-2 bg-white/10 rounded'>
      Upload
      <input type='file' className='hidden' onChange={e=>onUpload(e.target.files[0])}/>
    </label>
  )
}