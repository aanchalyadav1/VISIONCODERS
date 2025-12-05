import { uploadSalary } from '../utils/api'

export default function useUpload(){
  async function uploadFile(file){
    try{
      const res = await uploadSalary(file);
      return { ok:true, data:res };
    } catch(err){
      return { ok:false, error:String(err) };
    }
  }
  return { uploadFile };
}