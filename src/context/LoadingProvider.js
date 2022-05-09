import React from 'react'
import { createContext,useState } from 'react'



interface ILoading {
    isloading:boolean;
    setLoading:React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
}

const defaultValue:ILoading = {
    isloading:true,
    setLoading:()=>{}
}

export const LoadingContext = createContext(defaultValue);

export const LoadingProvider: React.FC<ILoading> = ({children}) => {
    const [isloading, setLoading] = useState(false)
    return (
        <LoadingContext.Provider value={{isloading,setLoading}}>
            {
                children
            }
        </LoadingContext.Provider>
    )
}
