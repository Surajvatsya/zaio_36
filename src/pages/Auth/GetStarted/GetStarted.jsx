import React from 'react'
import {Helmet} from "react-helmet";

import Curved from '../../assets/svg/Curved.svg'
import Girl from '../../assets/svg/Girl.svg'
import Boy from '../../assets/svg/Boy.svg'
import "./GetStarted.css";
import Results from '../../components/Results/Results'
import CurvedOval from '../../assets/svg/CurvedOval.svg'
import html from '../../assets/img/technologies/html.png'
import LearningPath from "components/ChoosePath/ChoosePath";

import {Link} from 'react-router-dom'
import { useState,useEffect } from 'react';
import courseService from 'actions/services/course.service';
import { CourseComponentSkeleton } from 'components/CourseComponent/CourseComponentSkeleton';
import { Carousel } from 'react-bootstrap';
import learningpathService from 'actions/services/learningpath.service'
import mixpanel from 'mixpanel-browser';
mixpanel.init('4e2be35d7debc0ad57db236937d08d8d'); 

export const GetStarted = (props) => {
    const [page, setPage] = useState(1)
    if(page===1)return(<Page1 setPage={setPage}/>)
    else if(page===2)return(<Page2 setPage={setPage}/>)
    else if(page===3)return(<Page3 setPage={setPage}/>)
    else if(page===4)return(<Page4 setPage={setPage}/>)
    else if(page===5)return(<Page5 setPage={setPage}/>)
    else if(page===6)return(<Page6 setPage={setPage}/>)
    else if(page===7)return(<Page7 setPage={setPage}/>)
    setPage(1)
    return(null)
}

const Page1 = ({setPage}) =>{
    useEffect(() => {
        mixpanel.track('/getstarted');      
      },[])

    return(
    <div >
        <Helmet>
                <meta charSet="utf-8" />
                <title>Select your course and start learning how to code | Zaio</title>
                <meta name="description" content="Here is everything there it is to know about all the course of Zaio. Choose the right course for you and set yourself up for the future" />
                <meta property="title" content="Select your course and start learning how to code | Zaio" />

                <meta name="og:description" content="Here is everything there it is to know about all the course of Zaio. Choose the right course for you and set yourself up for the future" />
                <meta property="og:title" content="Select your course and start learning how to code | Zaio" />
                <meta property="og:url" content="https://www.zaio.io/"/>
                <meta property="og:site_name" content="Zaio" />
                <meta property="og:type" content="article" />
        </Helmet>

        <img src={Curved} alt="curved" className="d-block w-100"/>
        <div className="container">
            <div className="d-flex align-items-center justify-content-center pb-0">
                <img src={Girl} alt="girl" className="mr-5 d-none d-sm-block"/>
                <div>
                    <div className="h1 sup-h3">Welcome to Zaio!</div>
                    <div className="sup-p pt-1">Select your course and start learning</div>
                </div>
                <img src={Boy} alt="boy" className="ml-5 d-none d-sm-block"/>
            </div>
            <div className="sup-p2 text-align-left mt-5 pt-2">Select a guided learning path</div>
            <div className="row">
            <LearningPath></LearningPath>

            </div>

            <div className="sup-p2 text-align-left mt-5 pt-2">Learn a new skill</div>
            <div className="row" >
                <Results explore service={courseService.getCourseList} redirect='view'>
                </Results>
            </div>
            {/* <div className="sup-p text-align-left mt-5 pt-5">Learn a new skill</div>
            
            <div className="sup-p text-align-left mt-5 pt-5">Learn a new skill</div>
            <Results/> */}
        </div>
    </div>
    )
}

const Page2 = ({setPage}) =>{
    const [courses, setCourses] = useState([])
    useEffect(() => {
        courseService.getCourseList().then(data=>{
            setCourses(data.data)
        })
        
    }, [])

    return(
        <div className="container pb-5">
            <div className="sup-tech-top">
                <img src={CurvedOval} alt="CurvedOval" className="mt-5"/>
                <img src={html} alt="HTML" className="sup-tech-image"/>
            </div>

            <div className="h3 text-center">
                HTML is a good choice!
            </div>
            <p className="w-50 h5 text-center ml-auto mr-auto mt-4">
            Zaio provides the following courses in your selected skill, and you will be automatically enrolled in these courses. Let us create a lesson plan to help you achieve your goals. 
            </p>
            <div className="d-flex align-items-center justify-content-center pb-5 mt-5">
                <img src={Girl} alt="girl" className="mr-5 d-none d-md-block"/>
                <Carousel className="w-100">
                    {
                        courses.map(course=>{
                            return(
                                <Carousel.Item>
                                    <img
                                    className="d-block w-100"
                                    src={course.coursethumbnailurl}
                                    alt={course.coursename}
                                    />
                                    <Carousel.Caption style={{background:'#00000030'}}>
                                    <h3>{course.coursename}</h3>
                                    <p>{course.courseteacher + " - "+ course.courseduration}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>
                <img src={Boy} alt="boy" className="ml-5 d-none d-md-block"/>
            </div>
            <div className="sup-customize-learning-path p-3" onClick={()=>setPage(3)}>
                Customize your learning plan &rarr;
            </div>
            <Link to="/pricing" className="sup-jump-pricing">
                or jump straight to your courses.
            </Link>
        </div>
    )
}

const Page3 = ({setPage}) =>{
    const onClickOption = () =>{
        setPage(4)
    }
    return(
        <div style={{paddingTop:'80px',paddingBottom:'70px'}}>
            <div className="sup-page3-heading">
                How much coding experience do you have?
            </div>
            <div className="sup-page3-options" onClick={onClickOption}>
                I have never coded before
            </div>
            <div className="sup-page3-options" onClick={onClickOption}>
            I have done a little bit of coding
            </div>
            <div className="sup-page3-options" onClick={onClickOption}>
            I have done quite a lot of coding
            </div>
        </div>
    )
}
const Page4 = ({setPage}) =>{
    const onClickOption = () =>{
        setPage(5)
    }
    return(
        <div style={{paddingTop:'80px',paddingBottom:'70px'}}>
            <div className="sup-page3-heading">
            Which one best describes you?
            </div>
            <div className="sup-page3-options" onClick={onClickOption} >
            Hobbyist (This is just a hobby for me)
            </div>
            <div className="sup-page3-options" onClick={onClickOption}>
            Tech Professional (My currrent work involves a lot of coding)
            </div>
            <div className="sup-page3-options" onClick={onClickOption}>
            Student (I’m busy studying but have some extra time)
            </div>
            <div className="sup-page3-options" onClick={onClickOption}>
            Business Person (I have technical aspects to my job)
            </div>
            <div className="sup-page3-options" onClick={onClickOption}>
            Non-technical Newbie (I’m looking to upskill myself)
            </div>
        </div>
    )
}
const Page5 = ({setPage}) =>{
    const onClickOption = () =>{
        setPage(6)
    }
    return(
        <div style={{paddingTop:'80px',paddingBottom:'70px'}}>
            <div className="sup-page3-heading">
            Set your daily learning goal.
            </div>
            
            <div className="sup-page3-options" onClick={onClickOption}>
            I’m easy going - 1 lesson a day
            </div>
            <div className="sup-page3-options" onClick={onClickOption}>
            I’m consistent - 3 lessons a day
            </div>
            
            <div className="sup-page3-options" onClick={onClickOption}>
            I’m on a mission -  5 lessons a day 
            </div>
            

            <div className="sup-page3-meta mt-5 pt-5">
            Dont worry. You can change this in your Profile later. 
            </div>
        </div>
    )
}
const Page6 = ({setPage}) =>{
    const onClickOption = () =>{
        setPage(7)
    }
    return(
        <div style={{paddingTop:'80px',paddingBottom:'70px'}}>
            <div className="sup-page3-heading">
            How old are you?
            </div>
            
            <div className="sup-page3-options" onClick={onClickOption} >
            13 - 18
            </div>
            <div className="sup-page3-options" onClick={onClickOption}>
            19 - 24
            </div>
            
            <div className="sup-page3-options" onClick={onClickOption}>
            25 - 34
            </div>
            <div className="sup-page3-options" onClick={onClickOption}>
            35 - 44
            </div>
            <div className="sup-page3-options" onClick={onClickOption}>
            Older than 45
            </div>
        </div>
    )
}
const Page7 = ({setPage}) =>{
    return(
        <div style={{paddingTop:'80px',paddingBottom:'70px'}} className="d-flex flex-column justify-content-center align-items-center">
            <div className="sup-page3-heading pb-0">
            You’re ready to go!
            </div>
            <div className="sup-page3-meta mt-2">
            Your learning plan is all set up and you’re ready to go ahead
            and start learning!
            </div>
            <Link to="/pricing">
                <div className="btn btn-primary pl-5 pr-5" style={{width:'fit-content'}}>
                Let’s go
                </div>
            </Link>
        </div>
    )
}