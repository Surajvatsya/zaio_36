import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_BACKEND_URL;

class UnitService {
    putUnit(unitId,data){
        return axios.put(API_URL+'/courseunit/'+unitId,
            data,
            {
                headers: authHeader()
            }
            )
            .then(res=>{
                // console.log('then',res);
                return res.data;
                
            })
            .catch(rej=>{
                // console.log('catch',rej.response);
                return rej.response
            })

        }
    postUnit(data){
        return axios.post(API_URL+'/courseunit',
            data,
            {
                headers: authHeader()
            }
            )
            .then(res=>{
                // console.log('then',res);
                return res.data;
                
            })
            .catch(rej=>{
                // console.log('catch',rej.response);
                return rej.response
            })

        }
        deleteUnit(unitid){
            return axios.delete(API_URL+'/courseunit/'+unitid,{
                headers: authHeader()
            })
                .then(res=>{
                    // console.log('then',res);
                    return res.data;
                    
                })
                .catch(rej=>{
                    // console.log('catch',rej.response)
                    return rej.response
                })
            }
    
            

}
export default new UnitService();