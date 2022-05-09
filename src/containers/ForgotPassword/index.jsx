import authService from '../../actions/services/auth.service';
import { LoadingContext } from '../../context/LoadingProvider';
import { useContext } from 'react';
import {useState,useEffect} from 'react'
import Form from "react-bootstrap/Form";
import {useNavigate} from 'react-router-dom';

function ForgotPassword(props) {
    const navigate = useNavigate();
    const {setLoading} = useContext(LoadingContext)
    const [data, setData] = useState({
        email:"",
        password:"",
        confirmPassword:"",
        getPassword:false,
        uid:""
    })

    useEffect(() => {
        const queries = new URLSearchParams(window.location.search);
        const uid = queries.get('uid');
        if(uid){
            setData({...data,getPassword:true,uid:uid})
        }
    }, [])

    if(data.getPassword){
        return (
            <div className="container">
                <Form className="form-group w-50 p-5 m-auto">
                  <label >Enter New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={data.password}
                    onChange={e=>setData({...data,password:e.target.value})}
                    placeholder="New Password"
                  />
                  <input
                    type="password"
                    className="form-control mt-2"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={e=>setData({...data,confirmPassword:e.target.value})}
                    placeholder="Confirm Password"
                  />
                  <button 
                    className="btn btn-primary mt-2" 
                    onClick={
                        async (e)=>{
                                e.preventDefault();
                                setLoading(true);
                                if(data.password===data.confirmPassword){
                                    const res = await authService.setNewPassword(data.uid,data.password);
                                    
                                    if(res.success){
                                        alert('Password successfully changed')
                                        navigate("/")
                                        
                                    }
                                    else{
                                        alert(res.message)
                                    }
                                }
                                else{
                                    alert('Passwords did not match'); 
                                }
                                setLoading(false);
                            }
                        }>Reset Password</button>
                </Form>
            </div>
            
        )
    }
    return (
        <div className="container">
            <Form className="form-group w-50 p-5 m-auto">
              <label >Enter Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={data.email}
                onChange={e=>setData({...data,email:e.target.value})}
                placeholder="email"
              />
              <button 
                className="btn btn-primary mt-2" 
                onClick={async e=>{
                    e.preventDefault();
                    setLoading(true);
                    await authService.forgotpassword(data.email);
                    setLoading(false);
                    alert('Password reset link sent')}}
                    >Send password reset link</button>
            </Form>
        </div>
        
    )
}

export default ForgotPassword
