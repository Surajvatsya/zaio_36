import React,{useState, useEffect} from 'react'
import { Link,useParams,Routes,Route } from 'react-router-dom'
import Options from '../../components/Wrappers/Options/Options'
import Styles from './AdminPortal.module.css'
import WaitingList from '../../containers/WaitingList/WaitingList'
import PageWithOptions from '../../components/Wrappers/PageWithOptions/PageWithOptions'
import NewCourse from '../../containers/NewCourse/NewCourse'
import Results from '../../components/Results/Results'
import Course from '../../pages/Course/Course'
// import Loader from 'components/Loader/Loader'
import courseService from '../../actions/services/course.service'
import Users from '../../containers/Users'
import { useContext } from 'react'
import { LoadingContext } from '../../context/LoadingProvider'


export const AdminPortal = () => {
    const {setLoading} = useContext(LoadingContext)
    
    const [auth, setAuth] = useState(true)  
    // const section = useParams().section;
    
    if(auth){
        return (
            <PageWithOptions> 
                <div style={{height:'100%'}}>
                    <Options triggerName="Menu" lgSidebar >
                        <Link to='/admin/waitinglist' style={{padding:'0px'}}><p className={`${Styles.adminItems}`}>Registered in WaitingList</p></Link>
                        <Link to='/admin/users' style={{padding:'0px'}}><p className={`${Styles.adminItems}`}>All Users</p></Link>
                        <Link to='/admin/paid-users' style={{padding:'0px'}}><p className={`${Styles.adminItems}`}>Paid Users</p></Link>
                        <Link to='/admin/businessdemo' style={{padding:'0px'}}><p className={`${Styles.adminItems}`}>Business Form Responses</p></Link>
                        <Link to='/admin/newcourse' style={{padding:'0px'}}><p className={`${Styles.adminItems}`}>New Course</p></Link>
                        <Link to='/admin/mycourses' style={{padding:'0px'}}><p className={`${Styles.adminItems}`}>My Course</p></Link>
                    </Options>
                </div>
                <Routes>
                    <Route exact path='/admin/waitinglist'>
                        <WaitingList props_width="75" setLoading={setLoading}/>
                    </Route>
                    <Route exact path='/admin/users'>
                        <Users/>
                    </Route>]
                    <Route exact path='/admin/paid-users'>
                        <Users paid/>
                    </Route>
                    <Route exact path='/admin/newcourse'>
                        <NewCourse setLoading={setLoading}/>
                    </Route>
                    <Route exact path='/admin/mycourses'>
                        <Results explore setLoading={setLoading} service={courseService.getCourseList} redirect='edit'/>
                    </Route>
                    <Route exact path='/admin/course/:courseid'>
                        <div className='w-75'>
                            <Course setLoading={setLoading} edit/>
                        </div>
                    </Route>
                    <Route exact path="/admin">
                        <h2 className="w-100 ml-0 ml-md-5 p-2">Login Page</h2>
                    </Route>
                    <Route >
                        <h2 className="w-100 ml-0 ml-md-5 p-2">ERROR 404 : WRONG PATH</h2>
                    </Route>
                </Routes>
                </PageWithOptions>
        )
    }
    else{
        return(<h1>Enter Correct Id/Password</h1>)
    }
}
