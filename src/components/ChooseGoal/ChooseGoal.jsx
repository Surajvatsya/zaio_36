import React, { Component } from 'react'
import {  Link } from "react-router-dom";

export default class ChooseGoal extends Component {
    render() {
        return (
            <div className="container text-center"> 
               
                <div className="technologies  d-flex justify-content-center flex-wrap">
                    <Link to='/goal/land-a-tech-job' className="career-box">
                        <div className="career-box-title">Land a high paying tech job</div>
                        <p className="career-box-desc">
                        Recommended for: Individuals looking for a job with no technical background. 
                        </p>
                        <div className="career-box-btn">Select</div> 
                    </Link> 
                    <Link to='/goal/be-your-own-boss' className="career-box">
                        <div className="career-box-title">Be your own boss</div>
                        <p className="career-box-desc">
                        Recommended for: Individuals who want to start a side hustle or become a freelancer. 
                        </p>
                        <div className="career-box-btn">Select</div> 
                    </Link> 
                    <Link to='/goal/upgrade-your-career' className="career-box">
                        <div className="career-box-title">Upgrade your career</div>
                        <p className="career-box-desc">
                        Recommended for: Individuals who already have a full time/part time job and want to level up their skills & income. 
                        </p>
                        <div className="career-box-btn">Select</div> 
                    </Link>  
                    
                    
                     
                </div>
            </div>
        )
    }
}
