import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_BACKEND_URL;

class LearningPathService {
    getLearingPathList(){
        // console.log(API_URL);
        return axios.get(API_URL+'/learningpath')
            .then(res=>{
                // console.log('cl',res);
                return res.data;
                
            })
            .catch(rej=>{
            // console.log('catch',rej)
            return rej.response
            })

        }
    getLearningPath(id){
        // console.log(id)
        return axios.get(API_URL+'/learningpath/'+id,
        { 
          headers: authHeader(),
        }) .then(res=>{
                // console.log('then',res);
                return res.data;
                
            })
            .catch(rej=>{
              // console.log('catch',rej.response)
              return rej.response
            })
    
        }
    enrollLearningPath(pathid){
      return axios.post(API_URL + `/dashboard/mylearningpaths/${pathid}`,
      {
        
      },
      { 
        headers: authHeader(),
      }).then(res=>{
        // console.log('then',res.data);
        return res.data
          
      })
    .catch(rej=>{
        // console.log('catch',rej.response);
        return rej.response;
    })
  }

  getLearningPaths(){
      // console.log(authHeader());
      return axios.get(API_URL + '/dashboard/mylearningpaths',
      { 
        headers: authHeader(),
      })
      .then(res=>{
        // console.log('then',res.data);
        return res.data; 
      })
      .catch(rej=>{
          // console.log('catch',rej.response);
          return rej.response;
      })
  }
}

export default new LearningPathService();