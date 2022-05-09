import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_BACKEND_URL;

class LectureService {

  postStudentProcess(lectureid){
    return axios.post(API_URL+'/studentprogress',{
      lectureid
    },{
      headers:authHeader()
    }).then(res=>{
      console.log('postStudentprogress',res);
      return res.data;
  })
  .catch(rej=>{
      // console.log('catch',rej.response);
      return rej.response;
  })
  }
  postLastWatched(lectureid,courseid){
    return axios.post(API_URL+'/course/'+courseid+'/resume',{
      lectureid
    },{
      headers: authHeader()
    }).then(res=>{
      // console.log('then',res);
      return res.data;
  })
  .catch(rej=>{
      // console.log('catch',rej.response);
      return rej.response;
  })
  }

  getLastWatched(courseid){
    return axios.get(API_URL+'/course/'+courseid+'/resume',
        {
            headers: authHeader()
        })
        .then(res=>{
            // console.log('then',res);
            return res.data;
            
        })
        .catch(rej=>{
            // console.log('catch',rej.response);
            return "error";
        })

    }
  postLecture(data){
    return axios.post(API_URL+'/lecture',
        data,
        {
            headers: authHeader()
        })
        .then(res=>{
            // console.log('then',res);
            return res.data;
            
        })
        .catch(rej=>{
            // console.log('catch',rej.response);
            return "error";
        })

    }
  deleteLecture(id){
    return axios.delete(API_URL+'/lecture/'+id,
    { 
      headers: authHeader(),
    })
        .then(res=>{
            // console.log('then',res);
            return res.data;
            
        })
        .catch(rej=>{
            // console.log('catch',rej.response)
            return "error"
        })

    }
  getLecture(id){
    // console.log(id)
    return axios.get(API_URL+'/lecture/'+id,
    { 
      headers: authHeader(),
    }).then(res=>{
            // console.log('then',res);
            return res.data;
            
        })
        .catch(rej=>{
          // console.log('catch',rej.response)
          return "error"
        })

    }
    putLecture(data){
      return axios.put(API_URL+'/lecture/'+data._id,
          data,
          {
              headers: authHeader()
          })
          .then(res=>{
              // console.log('then',res);
              return res.data;
              
          })
          .catch(rej=>{
              // console.log('catch',rej.response);
              return "error";
          })
  
      }
}

export default new LectureService();