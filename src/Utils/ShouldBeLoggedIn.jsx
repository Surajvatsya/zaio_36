import { UserContext } from '../context/UserProvider';
import React,{useEffect,useState} from 'react'
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom'
export default function ShouldBeLoggedIn({children}) {
    const {user} = useContext(UserContext)
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false)
    useEffect(() => {
        if(!user){
            navigate(`/getstarted?redirect=${window.location.pathname + window.location.search}`)
        }
        if(window.location.pathname==='/code'){
            const queries = new URLSearchParams(window.location.search);
            if(!queries.get('courseid') || !queries.get('lectureid') || !queries.get('courseid')){
                navigate("/allcourses")
            }
        }
        else if(window.location.pathname==='/dashboard'){
            if(user && user.isadmin)navigate.replace("/admin")
        }
        else if(window.location.pathname==='/admin'){
            if(user && !user.isadmin)navigate.replace("/dashboard")
        }
        setSuccess(true)

    },[navigate]) 
    if(success){
    return (
        <div>
            {children}
        </div>
    )
    }
    return null;
}
