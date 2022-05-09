import React, { useState } from "react";
import { Link} from "react-router-dom";
import './Home.css'
import {Helmet} from "react-helmet";

//components
// import SignUpForm from ".pages/Register/Register";
// import Methodology from "components/Methodology/Methodology";
// import LearningExperience from "components/LearningExperience/LearningExperience";
import LearningExperience from "../../components/LearningExperience/LearningExperience";
import VideoTestimonial from "../../components/VideoTestimonial/VideoTestimonial"
import TrustedBy from "../../components/Outcomes/Outcomes";
import Testimonial from "../../components/Testimonial/Testimonial";
import LearningGoal from "../../components/ChooseGoal/ChooseGoal";
// import Technologies from "components/Technologies/Technologies";
// import Founders from "components/Founders/Founders";
import Modal from "react-bootstrap/Modal";

// import Modal from 'components/Wrappers/Modal/Modal'
//import images & assets
// import signup_modal_image from "assets/img/misc/happy_people.jpg";
import asset1 from "../../assets/img/home/ojo.png";
// import asset2 from "assets/img/home/asset2.png";
// import asset6 from "assets/img/home/NQF.png"
import play from "../../assets/svg/play.svg";

// import asset4 from "assets/img/home/asset4-grey.svg";
//web-technology logos
// import html from "assets/img/technologies/html.png";
// import css from "assets/img/technologies/css.png";
// import js from "assets/img/technologies/js.png";
// import reactjs from "assets/img/technologies/react.png";
// import node from "assets/img/technologies/node.png";
// import firebase from "assets/img/technologies/firebase.svg";
// import git from "assets/img/technologies/git.svg";
import top from "../../assets/img/business/top.svg";
// import quiz from "assets/svg/quiz.svg";
import quiz from "../../assets/svg/quiz.svg";
import business from "../../assets/svg/business.svg";

import news1 from "../../assets/img/News/1.png";
import news2 from "../../assets/img/News/2.png";
import news3 from "../../assets/img/News/3.png";
import news4 from "../../assets/img/News/4.png";
import news5 from "../../assets/img/News/5.png";
import news6 from "../../assets/img/News/6.png";
import news7 from "../../assets/img/News/7.png";
import ReactPlayer from "react-player";

import { useContext } from "react";
import { LoadingContext } from "../../context/LoadingProvider";
import { UserContext } from "../../context/UserProvider";
import { useEffect } from "react";
import mixpanel from 'mixpanel-browser';
import axios from "axios";
import Button from "../../components/Button/Button";
mixpanel.init('4e2be35d7debc0ad57db236937d08d8d'); 

const API_URL = process.env.REACT_APP_BACKEND_URL; 


export default function Home() {   
    const {user} = useContext(UserContext);
    const loggedin = !!user; 
    const {setLoading} = useContext(LoadingContext);
    const [nouser, setNouser] = React.useState("");
    const [isOpen, setisOpen] = useState(false);

    const openModal = () => {
      setisOpen(true);
    };

    let editorStyles = {
      width: "100%",
      height: "100%",
      border: "0",
    };

    useEffect(() => {
      axios.get(API_URL+'/general/')
        .then(response => {
          setNouser(response.data.data)
        })
        .catch ( err => console.log(err))
      
      
      mixpanel.track('www.zaio.io', {
        'source': "fb",
      });      
    },[])

    return (
      <div>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Learn how to code online for Free | Zaio</title>
                <meta name="description" content="Zaio's Goal-oriented interactive teaching ensures you are job-ready by learning the best web development technologies. Join millions of learners starting a new career (or advancing the current one)" />
                <meta property="title" content="Learn how to code online for Free - Zaio" />

                <meta name="og:description" content="Zaio's Goal-oriented interactive teaching ensures you are job-ready by learning the best web development technologies. Join millions of learners starting a new career (or advancing the current one)" />
                <meta property="og:title" content="Learn how to code online for Free | Zaio" />
                <meta property="og:url" content="https://www.zaio.io/"/>
                <meta property="og:site_name" content="Zaio" />
                <meta property="og:type" content="article" />
        </Helmet>

        <Modal
          size='xl'
          className='popupVideo'
          show={isOpen}
          onHide={() => setisOpen(false)}
          closeButton
        >
          <ReactPlayer
            playing={true}
            controls={true}
            stopOnUnmount={true}
            url={"https://zaiolandingpage.s3.eu-west-2.amazonaws.com/Zaio+video+Testimonial+Final+(edited).mp4"}
            config={{ file: { attributes: { controlsList: "nodownload" } } }}
            onContextMenu={(e) => e.preventDefault()}
            width={"100%"}
            height={"100%"}
          />
        </Modal>

        <section id="hero" className="hero">
          <div className="container">
            <div className="row pb-4" >

              <div className="left-col col-lg-6 col-xl-7 pt-4 pt-lg-0">
               <div className="studentCount">
                 <p >Join {nouser} recent learners</p>
                </div>
                <h1 className="heading">Be the new you.</h1>
                <h3 className="sub-heading">
                Learn today’s most indemand coding skills and secure your job
                </h3>
                <Link to="/getstarted" className="learn-button mt-4 font-weight-bold">
                  Get Started for FREE
                </Link>
                <Button link="/business" className="business-button mt-4 font-weight-bold">
                  Zaio For Business
                </Button>
                {/* <div>
                </Button>
                {/* <Link to="/business" className="business-button mt-4 font-weight-bold">
                  Zaio For Business
                </Link> */}
                {/* <div>
                  <img className="asset6" src={asset6} alt=""></img>
                </div> */}
              </div>
              <div className="homeImgWrap">
                {/* <img className="asset1" src={asset1} alt=""></img> */}
                <video className='asset1-video' autoPlay loop muted poster={asset1}>
                  <source src={"https://zaiolandingpage.s3.eu-west-2.amazonaws.com/Zaio+video+Testimonial+Final+(edited).mp4"} type='video/mp4' />
                </video>
                <img className='play-button-home' onClick={openModal} src={play} alt='' />
              </div>
                {/* <img className="asset2" src={asset2} alt=""></img> */}
              </div>
              {
              //!loggedin?
              //<div className="home-form">
                //<SignUpForm setLoading={setLoading}></SignUpForm>
              //</div>
              //:null
              }
            </div>
            <div className="row web-logo-section">As seen on</div>
            <div className="row web-logo-section  pb-5 pt-4">
              
                <div className="web-logo html grayscale ">
                  <img src={news1} alt=""></img>
                  <span className="tooltiptext">Ventureburn</span>
                </div>
                <div className="web-logo css grayscale">
                  <img src={news2} alt=""></img>
                  <span className="tooltiptext">Business Insider</span>
                </div>
                <div className="web-logo js grayscale">
                  <img src={news3} alt=""></img>
                  <span className="tooltiptext">University of Cape Town</span>
                </div>
                <div className="web-logo reactjs grayscale">
                  <img src={news4} alt=""></img>
                  <span className="tooltiptext">Cape Talk Radio</span>
                </div>
                <div className="web-logo node grayscale">
                  <img src={news5} alt=""></img>
                  <span className="tooltiptext">Redbull</span>
                </div>
                <div className="web-logo git grayscale">
                  <img src={news6} alt=""></img>
                  <span className="tooltiptext">The Newspaper</span>
                </div>
                <div className="web-logo firebase grayscale">
                  <img src={news7} alt=""></img>
                  <span className="tooltiptext">Varsity News</span>
                </div>
              
            </div>
        </section>

        <div className="top-svg position-absolute w-100">
          <div className="w-100">
            <img src={top} alt="" />
          </div>
        </div>

        
        <section className="learning-path pt-5 pb-5" style={{backgroundColor: "#f6f3eb"}}>
        <h1 className="text-center font-weight-bold">What's your goal?</h1>
        <p className="text-center"><b>Goal oriented learning with our beginner-friendly to expert-level courses</b></p>
          <LearningGoal></LearningGoal>
        </section>



        {/* <section className="what-is-zaio">
          <div className="container">
            <h1 className="heading text-center">Zaio is more than just coding!</h1>
            <h3 className="description text-center">
            Our proprietary, interactive coding environment binded with 1-1 on demand tutor support generates: Problem Solving, Creative Thinking, Grit, Confidence, Communication. And it's a lot of fun too!
            </h3>
            <div className="d-flex flex-column justify-content-center pt-4 pt-lg-0">
              <Link to="/getstarted" className="business-button mt-4 mr-auto ml-auto">
                Start Learning
              </Link>
            </div>
          </div>
        </section> */}

        <section className="code-editor-beginner">
          <div className="container">
            <div className="row">
                    <div className="col1-code d-flex flex-column justify-content-center">
                        <span className="text1">Beginners welcome</span>
                        <span className="text2">Start coding in seconds</span>
                        <span className="text3">No prior experience required. Go ahead and play around with the text on the code editor. Our hands-on learning environment means you’ll be writing real code from your very first lesson.</span>
                        <div style={{paddingTop: "30px"}}>
                          <Link to="/getstarted" className="forbusiness-button mt-4 mr-auto ml-auto">
                            <b>Continue learning for FREE</b>
                          </Link>
                        </div>
                    </div>
                    <div className="col2-code">
                          <iframe
                            src={"https://codesandbox.io/embed/angry-cache-blpsh?fontsize=12&hidenavigation=1&theme=light&view=split&codemirror=1&hidedevtools=1"}
                            style={editorStyles}
                            title='React'
                            view='split'
                            allow='accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking'
                            sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts'
                          ></iframe>
                    </div>
              </div>
          </div>

        </section>

        <section className="learning-path pt-5 pb-5" style={{backgroundColor: "#f6f3eb"}}>
          {/* <Methodology></Methodology> */}

          <VideoTestimonial/>
        </section>
        
        <section className="methodology">
          {/* <Methodology></Methodology> */}
          
          <LearningExperience/>
        </section>
        <div className="wave2"></div>

{/*
        // <section className="learning-path pt-5">
        // <h3 className="text-center font-weight-bold">Choose your learning path</h3>
        // <p className="text-center"><b>Start from where you at with our beginner-friendly to expert-level courses</b></p>

        //   <LearningPath></LearningPath>
        //   <Technologies></Technologies>
        // </section>
*/}
        <section className="take-quiz">
          <div className="container">
            <div className="row">
              
              <div className="col1 d-flex flex-column justify-content-center">
                  <span className="text1">First Steps</span>
                  <span className="text2">Not sure where to start?</span>
                  <span className="text3">Dont worry, This quiz will help you see if you are capable of coding based on your personality.</span>
                  <div className="pt-4">
                    <Link to="/takequiz" className="quiz-button mt-4 mr-auto ml-auto">
                      Take our quiz
                    </Link>
                  </div>
              </div>
              <div className="col2">
                  <div className="asset5">
                 <img src={quiz} alt="" />
                 </div>
              </div>
             
            </div>
            
          </div>
        </section>

        
        <section className="testimonial-section">
          <TrustedBy></TrustedBy>
          <Testimonial></Testimonial>
        </section>

        <section className="zaio-for-business">
          <div className="container">
            <div className="row">
              <div className="col1 d-flex flex-column justify-content-center">
                  <span className="text1">Zaio for Business</span>
                  <span className="text2">Level up your team's skills</span>
                  <span className="text3">Give your team the knowledge, experience, and confidence they need to tackle any problem.</span>
                  <div className="pt-4">
                    <Link to="/business" className="forbusiness-button mt-4 mr-auto ml-auto">
                      Explore business offerings
                    </Link>
                  </div>
              </div>
              <div className="col2">
                  <div className="asset5">
                 <img src={business} alt="" />
                 </div>
              </div>
             
            </div>
            
          </div>
        </section>

        
      {/* <section className="founders">
          
        <Founders></Founders>
      </section> */}

        <section className="signup-2">
          <div className="container">
            <div className="row">
              <div className="col col-lg-6 col-xl-7 d-flex flex-column justify-content-center pt-4 pt-lg-0 ">
                <h1 className="text-light" style={{fontWeight: 600}}>
                  Book a 15 minute FREE consultation
                </h1>
                <p className="text-light">Need more information? Our experts will guide you.</p>
              </div>
              <div className="right-col col-lg-6 col-xl-5  order-1 order-lg-2">
              <Link to="/consultation" className="consultation-button mt-4 font-weight-bold">
                 Book Now
              </Link>
              {
              //!loggedin?<Link to="/getstarted" className="business-button mt-4 font-weight-bold">
                 // Book Now
               // </Link>:<Link to="/allcourses"><button className="business-button mt-4 font-weight-bold">Explore all Courses</button></Link>
              }
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}