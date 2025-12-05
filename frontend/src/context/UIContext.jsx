import { createContext, useContext, useState } from 'react';

const UICtx = createContext();
export const useUI = () => useContext(UICtx);

export default function UIProvider({children}){
  const [toast,setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(()=>setToast(null),2000);
  };

  const [modal,setModal] = useState(null);

  return (
    <UICtx.Provider value={{toast,showToast,modal,setModal}}>
      {children}
    </UICtx.Provider>
  );
}
