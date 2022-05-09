import axios from 'axios'
// import env from "dotenv"
// import dotenv from 'dotenv'
import authHeader from './auth-header';
// import env from "dotenv";
// env.config();

// dotenv.config()
// require('dotenv').config();
// import 'dotenv/config'
// env.config()
// const API_URL = 'https://nameless-waters-24981.herokuapp.com'
const API_URL = process.env.REACT_APP_BACKEND_URL;
// const API_URL = 'http://localhost:5000'

const getDemo = {
	postBusinessDemoForm(data){
      return axios.post(API_URL+'/businessdemo',{
	            firstname:data.firstname,
	            lastname:data.lastname,
	            email:data.email,
	            phonenumber:data.phonenumber,
	            companyname:data.companyname,
	            jobtitle:data.jobtitle,
	            demoreason:data.demoreason,
	          })
	          .then(res=>{
	            //   console.log(res.data);
	              return res.data;
	          })
	          .catch(rej=> {
	          		// console.log(rej.data);
	          		return rej
	          	})

      },
      postSyllabusForm(data){
        return axios.post(API_URL+'/syllabus',{
                    fullname:data.fullname,
                    email:data.email,
                    contactnumber:data.contactnumber,
                    occupation:data.occupation,
                    firstcourse:data.firstcourse,
                    heardfrom:data.heardfrom
                })
                .then(res=>{
                  //   console.log(res.data);
                    return res.data;
                })
                .catch(rej=> {
                        // console.log(rej.data);
                        return rej
                    })
  
        },
      postAddToWaitingList(data){
        return axios.post(API_URL+'/waitinglist',{
                username:data.username,
                email:data.email
                })
            .then(res=>{
                // console.log('then',res.data);
                return res.data;
                
            })
            .catch(rej=>{
            	// console.log('catch',rej.response);
            	return rej.response
            })

        },
        getWaitingList(){
            return axios.get(API_URL+'/waitinglist')
                .then(res=>{
                    // console.log('then',res);
                    return res.data;
                    
                })
                .catch(rej=>{
                    // console.log('catch',rej.response)
                    return rej.response
                })
    
            },
        async getUsers(){
            return await axios.get(API_URL+'/users',
                { 
                    headers: authHeader(),
                });
        }
}

export default getDemo;
