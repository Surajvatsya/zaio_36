import React, { Component } from "react";
import platfrom from "../../assets/img/home/codepush.gif";
import support from "../../assets/img/home/support2.gif";
import certification from "../../assets/img/home/certificate.png";
import mentor from "../../assets/img/home/mentors.png";

import projects from "../../assets/img/home/projects.png";
import { Link } from "react-router-dom";

export default class LearningExperience extends Component {
  render() {
    return (
      <div className='learning-exp'>
        <div className='container '>
          <h1 className='heading-2 text-center hands-on'>
            <span className='text-green'>Self-paced </span>learning experience
          </h1>
          <div className='row '>
            <div className='col-lg-5 d-flex flex-column justify-content-center order-2'>
              <h3 className='font-weight-bold no-install'>
                <span className='text-blue'>No installation required</span>
              </h3>
              <p>
                Use our interactive coding environment to get upto 80% retention
                of all concepts which is upto 50% more than other online coding
                schools and platforms.
              </p>
              <Link
                to='/live-demo'
                className='Interactive-button mt-4 font-weight-bold'
              >
                Try Interactive Player
              </Link>
            </div>
            <div className='col-lg-7 order-1 text-center pt-5'>
               <img className='platform-image' src={platfrom} alt=''></img>
            </div>
          </div>

          <div className='row mt-5'>
            <div className='col-lg-5 d-flex flex-column justify-content-center order-2'>
              <h3 className='font-weight-bold no-install'>
                <span className='text-pink'>On demand tutor support</span>
              </h3>
              <p>
                Get hands-on instant support with our experienced & friendly
                team of tutors to fast track your learning experience.
                Understand concepts better and never get stuck again.
              </p>
              <Link
                to='/consultation'
                className='Tutor-button mt-4 font-weight-bold'
              >
                Book a 15-min Tutor Session
              </Link>
            </div>
            <div className='col-lg-7 order-1 text-center pt-5'>
              <img className='support-image' src={support} alt=''></img>
            </div>
          </div>

          <div className='row mt-5'>
            <div className='col-lg-5 d-flex flex-column justify-content-center order-2'>
              <h3 className='font-weight-bold no-install'>
                <span className='text-green'>Certification</span>
              </h3>
              <p>
                Get a certificate of completion for each course which is recognised by the industry and top recruiters.
              </p>
              <Link
                to='/getstarted'
                className='certified-button mt-4 font-weight-bold'
              >
                Get Certified
              </Link>
            </div>
            <div className='col-lg-7 order-1 text-center pt-5'>
              <img className='certificate-image' src={certification} alt=''></img>
            </div>
          </div>

          <div className='row mt-5'>
            <div className='col-lg-5 d-flex flex-column justify-content-center order-2'>
              <h3 className='font-weight-bold no-install'>
                <span className='text-orange'>Mentorship & Internship programme</span>
              </h3>
              <p>
                Access mentors from the world's leading companies. On completion of your course, get placed in a guaranteed internship through our partner companies.
              </p>
              <Link
                to='/learning-path/fullstack'
                className='certified-button mt-4 font-weight-bold'
              >
                Enroll in Full Stack Web Development
              </Link>
            </div>
            <div className='col-lg-7 order-1 text-center pt-5'>
              <img className='mentor-image' src={mentor} alt=''></img>
            </div>
          </div>

          {
          // <div className='row mt-5'>
          //   <div className='col-lg-5 d-flex flex-column justify-content-center order-2'>
          //     <h3 className='font-weight-bold no-install'>
          //       <span className='text-orange'>Build real-world projects</span>
          //     </h3>
          //     <p>
          //       Get real world experience & a deep retention of concepts by
          //       building apps like Netflix, Google Keep, YouTube & More.
          //     </p>
          //     <Link
          //       to='/allcourses'
          //       className='Courses-button mt-4 font-weight-bold'
          //     >
          //       View All Courses
          //     </Link>
          //   </div>

          //   <div className='col-lg-7 order-1 text-center pt-5'>
          //     <img className='project-image' src={projects} alt=''></img>
          //   </div>
          // </div>
          }
        </div>
      </div>
    );
  }
}
