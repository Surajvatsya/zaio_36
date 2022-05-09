import React,{useState,useEffect} from 'react'

import TwoColumnDisplayItem from '../../components/TwoColumnDisplayItem/TwoColumnDisplayItem'
import Styles from './WaitingList.module.css'
import Services from '../../actions/services/admin.service'
// import Modal from 'components/Wrappers/Modal/Modal';

function WaitingList({setLoading,props_width}) {
    const [list,setList] = useState([]);
    
    useEffect(()=>{
        const funct = async() =>{
            setLoading(true)
            console.log('test')
            const res = await Services.getWaitingList();
            console.log(res);
            setList(res.data);
            setLoading(false);
        }
        // let userid = prompt('UserId');
        // let password = prompt('Password');
        // if(userid==='admin@zaio' && password==='zaio@password123'){
        //     setAuth(true);
        //     funct();
        // }
        funct();
    },[])
    return (
        <section className={`w-${props_width} ml-0 ml-md-5 p-2 ${Styles.section}`}>
                <h1>WAITING LIST Registered [{list.length}]</h1>
                <div className={`${Styles.list} bg-primary`}>
                    {
                        list.map(user=> <TwoColumnDisplayItem key={user._id} first={user.username} second={user.email}></TwoColumnDisplayItem>)
                    }   
                </div>
        </section> 
    )
}

export default WaitingList
