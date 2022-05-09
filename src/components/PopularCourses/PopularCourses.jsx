import React, { Component,useState,useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import {  Link } from "react-router-dom";
import Results from 'components/Results/Results'
import courseService from 'actions/services/course.service'
import CourseComponent from 'components/CourseComponent/CourseComponent'


function PopularCourses (props) {
    const history = useHistory();
    const [course, setCourseList] = useState(null);

    useEffect(() => {
		console.log("Hiii",props)
		const funct = async () =>{
			let res =null;
			try {
				res = await courseService.getCourse("602a18ae05614a00218fa391");
				if(res.success){
                    console.log("btwyr",res)
					setCourseList(res.data);
                    console.log(course)
				}
				else{
					history.push('/somethingwentwrong')
				}
			} catch (error) {
				history.push('/somethingwentwrong')
			}
			
		}
		funct();
	}, [])

        return (
            <div className="container mb-5 text-center">
            <h3 className="text-center font-weight-bold">Popular Courses</h3>
            <p><b>Get started with these popular intro courses.</b></p>

             <div className="technologies  d-flex justify-content-center flex-wrap">
            
                
            </div>
            </div>
        )
}

export default PopularCourses