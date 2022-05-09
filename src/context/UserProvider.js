import authService from '../actions/services/auth.service';
import React from 'react'
import { createContext,useState } from 'react'



// interface IUser {
//     children?: React.ReactNode;
//     user:{
//         isadmin: boolean;
//         username: string;
//         email: string;
//     } | null | undefined,
//     setUser:React.Dispatch<React.SetStateAction<{
//         isadmin: boolean;
//         username: string;
//         email:string;
//     } | null | undefined>>,
// }

const defaultValue = {
    user:{},
    setUser:()=>{}
}

export const UserContext = createContext(defaultValue);

export const UserProvider = ({children}) => {
    
    const [user, setUser] = useState(authService.getCurrentUser())
    console.log({user});
    return (
        <UserContext.Provider value={{user,setUser}}>
            {
                children
            }
        </UserContext.Provider>
    )
}
