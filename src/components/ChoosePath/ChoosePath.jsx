import React, { Component } from 'react'
import {  Link } from "react-router-dom";

export default class ChoosePath extends Component {
    render() {
        return (
            <div className="container text-center">
               
                <div className="technologies  d-flex justify-content-center flex-wrap">
                    <Link to='/learning-path/introductiontocoding' className="career-box">
                        <div className="career-box-title">Introduction to Coding - FREE</div>
                        <p className="career-box-desc">
                        Learn the basics of coding and web development. Use this path to see if coding is for you.
                        </p>
                        <div className="career-box-btn">Select</div> 
                    </Link> 
                    <Link to='/learning-path/fullstack' className="career-box">
                        <div className="career-box-title">Full Stack Web Developer</div>
                        <p className="career-box-desc">
                        Master Frontend and Backend to build fully functional and reponsive Web Apps on a professioinal scale. 
                        </p>
                        <div className="career-box-btn">Select</div> 
                    </Link>  
                    <Link to='/learning-path/codingforteens' className="career-box">
                        <div className="career-box-title">Coding for Teens</div>
                        <p className="career-box-desc">
                        Introduce your child in the world of coding, ensuring they have alot of fun while learning the basics! 
                        </p>
                        <div className="career-box-btn">Select</div> 
                    </Link>  
                    <Link to='/learning-path/frontend' className="career-box">
                        <div className="career-box-title">Frontend Engineer</div>
                        <p className="career-box-desc">
                        Master skills to code and build beautiful front-end web apps. Gain some UX/UI skills throughout the process.
                        </p>
                        <div className="career-box-btn">Select</div> 
                    </Link>  
                    <Link to='/learning-path/backend' className="career-box">
                        <div className="career-box-title">Backend Engineer</div>
                        <p className="career-box-desc">
                    Master skills to program servers and client-side interfaces, then level up to designing databases.
                        </p>
                        <div className="career-box-btn">Select</div> 
                    </Link> 
                     
                </div>
            </div>
        )
    }
}
