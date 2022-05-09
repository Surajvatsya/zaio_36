import React from "react";
import "./SignupProcess.css";

import AuthService from "../../../actions/services/auth.service";
import {createSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/UserProvider";
import { LoadingContext } from "../../../context/LoadingProvider";
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import mixpanel from "mixpanel-browser";
mixpanel.init("4e2be35d7debc0ad57db236937d08d8d", { debug: true });

const API_URL = 'https://nameless-waters-24981.herokuapp.com'; 


function ValidateEmail(inputText) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (inputText.match(mailformat)) {
    return true;
  } else {
    return false;
  }
}

export const SignupProcess = () => {
  const [page, setPage] = useState(1);
  const [init, setInit] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (user) {
      navigate(
              { 
                pathname: `/dashboard`,
              }
           );
    }
  }, []);

  const navigate = useNavigate();
  const queries = new URLSearchParams(window.location.search);
  
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    success: !!user,
    message: "",
    redirect: queries.get("redirect") || "/dashboard",
    src: "zaio.io",
    coursein: "na",
    heardfrom: "select",
    phonenumber: "",
    goal: "",
    currentStatus: "",
    commitment: "",
    dob: new Date(1997, 8, 28)
  });

  const onChangeState = (e, prop) => {
    setState({ ...state, [prop]: e.target.value });
  };
  const onSelectGoal = (e) => setState({ ...state, goal: e.target.innerHTML });
  const onCurrentStatus = (e) =>
    setState({ ...state, currentStatus: e.target.innerHTML });
  // const onSelectCommitment = (e) =>
  //   setState({ ...state, commitment: e.target.innerHTML });
  const onSelectPhoneNumber = (phone) => {
    console.log(phone);
    setState({ ...state, phonenumber: phone });
  };
  const onSelectDate = (date) => setState({ ...state, dob: date });

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    AuthService.updateUser(state.goal, state.currentStatus, state.heardfrom)
    .then((response) => {
      console.log("success")
      navigate(
          { 
            pathname: `${state.redirect}`,
            state: { prevPath: "/getstarted"}
           }
           );
    })
    .catch((reject) => alert("somethingwentwrong"))
  }

  const handleRegister = (e) => {
    e.preventDefault();
    setState({
      ...state,
      message: "",
      successful: false,
    });
    setLoading(true);
    console.log(state);
      AuthService.register(
        state.username,
        state.email,
        state.phonenumber,
        state.password,
        state.src,
        queries.get("course"),
      )
      .then((response) => {
        console.log(response);
        //mixpanel
        mixpanel.alias(state.username);
        mixpanel.people.set({
          Course: queries.get("course"),
          heardFrom: state.heardFrom,
          src: state.src,
        });
        if (response.success) {
          //sendinblue

          if (queries.get("course")) {
            axios.post(API_URL+'/general/updateuserevent', 
                  {
                    email : state.email,
                    eventtype :"cart_updated",
                    data:{
                        url:"https://www.zaio.io/welcome?redirect=/payment&course=Fullstack",
                        name: state.username,
                        coursename: "Full Stack Web Developer path",
                        coupon: "SPECIAL90"
                    }
                }
                )
                  .then(response => {
                    console.log(response)
                  }
                  )
          }
          else {
            axios.post(API_URL+'/general/updateuserevent', 
                  {
                    email : state.email,
                    eventtype :"get_started",
                    data:{
                        url:"https://www.zaio.io/dashboard",
                        name: state.username,
                        coursename: "Introduction to coding",
                        coupon: "SPECIAL90"
                    }
                }
                )
                  .then(response => {
                    console.log(response)
                  }
                  )
          }
              
                  
          setState({
            ...state,
            success: true,
            message: response.message,
          });
          setUser(response.data);
          // history.push(
          //   { 
          //     pathname: `${state.redirect}`,
          //     state: { prevPath: "/getstarted"}
          //    }
          //    );
          setPage(2)
        } else {

          const resMessage = response.message;
          setState({
            ...state,
            successful: false,
            message: resMessage,
          });
        }
      })
      .catch((reject) => alert("somethingwentwrong"))
      .then(() => setLoading(false));
  };


  const LoadPage = () => {
    if (page === 1)
      return (
        <Page1
          setPage={setPage}
          setInit={setInit}
          handleRegister={handleRegister}
          onChangeState={onChangeState}
          state={state}
          onSelectPhoneNumber={onSelectPhoneNumber}
        />
      );
    else if (page === 2) {
      return <Page2 setPage={setPage} onSelectGoal={onSelectGoal} />;
    } else if (page === 3)
      return <Page3 setPage={setPage} onCurrentStatus={onCurrentStatus} />;
    else if (page === 6)
      return (
        <Page6
          setPage={setPage}
          state={state}
          onSelectDate={onSelectDate}
          onChangeState={onChangeState}
          handleRegister={handleRegister}
          message={state.message}
          setState={setState}
          handleUpdate={handleUpdate}
        />
      );
    setPage(1);
  };

  return (
    <React.Fragment>

      {/* Facebook Pixel Code  */}
      <script>
        {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '578796853193199');
        fbq('track', 'PageView');
        `}
        </script>
        <noscript><img height={1} width={1} style={{display: "none"}}
        src="https://www.facebook.com/tr?id=578796853193199&ev=PageView&noscript=1"
        /></noscript>
      {/* End Facebook Pixel Code */}

      <div>
        {LoadPage()}
      </div>
    </React.Fragment>
  );
};

const Page1 = ({
  setPage,
  setInit,
  state,
  message,
  onChangeState,
  onSelectPhoneNumber,
  handleRegister
}) => {
  const [error, setError] = useState("");
  const onClickOption = (e) => {
    e.preventDefault()
    if (state.username == "" || !ValidateEmail(state.email) || state.password == "") {
      setError("Please enter all fields above correctly to continue");
    } else {
      handleRegister(e)
      // axios.post('https://nameless-waters-24981.herokuapp.com/checkemail', {email: state.email})
      //   .then(response => {
      //     console.log(response)
      //     if(response.data.success === true){
      //       setError("");
      //       setInit(true);
              
      //       setPage(2);
      //       console.log("response")
      //     } else {
      //       setError(response.data.message);
      //     }
      //   })
    }
  };

  return (
    <div className="page-container">
      <div className="email-form">
        <div className="sup-page3-heading">Let's get you started.</div>
        <form id="1" className="form" onSubmit={onClickOption}>
          <div className="form-group">
            <label htmlFor="username">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={state.username}
              onChange={(e) => onChangeState(e, "username")}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={state.email}
              onChange={(e) => onChangeState(e, "email")}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Mobile Number</label>
            <PhoneInput
              country={"za"}
              preferredCountries={[
                "za",
                "ng",
                "eg",
                "bw",
                "ke",
                "gb",
                "gh",
                "mu",
                "mw",
              ]}
              placeholder="+27 763 793 540"
              value={state.phonenumber}
              onChange={(phone) => onSelectPhoneNumber(phone)}
              inputStyle={{ width: "100%" }}
              inputProps={{
                name: "phonenumber",
                required: true,
              }}
            />
          </div>
          <div className="form-group">
          <label htmlFor="password">Create Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={state.password}
            onChange={(e) => onChangeState(e, "password")}
            required
          />
        </div>
          <div className="form-group mt-4">
            {error && <p className="error">{error}</p>}
            {state.message && <p className="error">{state.message}</p>}
            <button
              className="btn btn-primary btn-block"
              type="submit"
              onClick={onClickOption}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const Page2 = ({ setPage, onSelectGoal }) => {
  const onClickOption = (e) => {
    onSelectGoal(e);
    setPage(3);
  };
  return (
    <div className="page-container">
      <div className="sup-page3-heading">What is your end goal?</div>

      <div className="sup-page3-options" onClick={onClickOption}>
        Become a freelancer - work at my pace and be my own boss. Start with
        R15-20k/month
      </div>
      <div className="sup-page3-options" onClick={onClickOption}>
        Get a full-time job as a developer - a secure contract starting
        R20-30k/month
      </div>
      <div className="sup-page3-options" onClick={onClickOption}>
        Build my own app ideas
      </div>
      <div className="sup-page3-options" onClick={onClickOption}>
        Any of the above
      </div>
    </div>
  );
};

const Page3 = ({ setPage, onCurrentStatus }) => {
  const onClickOption = (e) => {
    onCurrentStatus(e);
    setPage(6);
  };
  return (
    <div className="page-container">
      <div className="sup-page3-heading">What is your current status?</div>

      <div className="sup-page3-options" onClick={onClickOption}>
        Already employed, in IT field, but looking to upgrade my skills
      </div>
      <div className="sup-page3-options" onClick={onClickOption}>
        Already employed, but not in IT field, and looking to upgrade my skills
      </div>
      <div className="sup-page3-options" onClick={onClickOption}>
        Student looking to secure my future
      </div>
      <div className="sup-page3-options" onClick={onClickOption}>
        Self employeed looking to join IT field
      </div>
      <div className="sup-page3-options" onClick={onClickOption}>
        Unemployed, and looking to secure a job in IT
      </div>
      <div className="sup-page3-options" onClick={onClickOption}>
        Other
      </div>
    </div>
  );
};
// const Page4 = ({ setPage, onSelectCommitment }) => {
//   const onClickOption = (e) => {
//     onSelectCommitment(e);
//     setPage(6);
//   };
//   return (
//     <div className="page-container">
//       <div className="sup-page3-heading">
//         It's self paced, but how much time can you commit a day?
//       </div>

//       <div className="sup-page3-options" onClick={onClickOption}>
//         1 hour a day (7 hours/week)
//       </div>
//       <div className="sup-page3-options" onClick={onClickOption}>
//         2 hours a day (Recommended - 14 hours/week)
//       </div>
//       <div className="sup-page3-options" onClick={onClickOption}>
//         4 hours a day (21 hours/week)
//       </div>

//       <div className="sup-page3-meta mt-5 pt-5">
//         Dont worry. You can change this in your Profile later.
//       </div>
//     </div>
//   );
// };
// const Page5 = ({ setPage }) => {
//   const onClickOption = () => {
//     setPage(6);
//   };
//   return (
//     <div className="page-container">
//       <div className="sup-page3-heading">How old are you?</div>

//       <div className="sup-page3-options" onClick={onClickOption}>
//         13 - 18
//       </div>
//       <div className="sup-page3-options" onClick={onClickOption}>
//         19 - 24
//       </div>

//       <div className="sup-page3-options" onClick={onClickOption}>
//         25 - 34
//       </div>
//       <div className="sup-page3-options" onClick={onClickOption}>
//         35 - 44
//       </div>
//       <div className="sup-page3-options" onClick={onClickOption}>
//         Older than 45
//       </div>
//     </div>
//   );
// };

const Page6 = ({ setPage, state, onSelectDate, onChangeState, handleRegister, message, setState, handleUpdate }) => {
    
  const onClickOption = (e) => {
    console.log(state);
    handleUpdate(e)
  };
  return (
    <div className="page-container">
      <div className="email-form">
        <div className="sup-page3-heading">Okay, wrapping up now.</div>
        <form id="2" className="form" onSubmit={onClickOption}>
         
          <div className="form-group">
            <label>Where did you find us?</label>
            <select
              className="form-control"
              value={state.heardfrom}
              onChange={(e) => onChangeState(e, "heardfrom")}
            >
              <option selected value="select">
                Click to select
              </option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="wordofmouth">Word of mouth</option>
              <option value="uber">Uber/Bolt/Didi/Taxi</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <p className="signup-finetext mt-1">
            By signing up for Zaio, you agree to Zaio's Terms of Service &
            Privacy Policy.
          </p>

          <label htmlFor="blueinmail" className="signup-finetext mt-1 mb-2">
            {" "}
            <input
              type="checkbox"
              id="blueinmail"
              name="blueinmail"
              value="true"
            />{" "}
            I agree to receive promotional and marketing material
          </label>
          <div className="form-group">
            
            <button
              className="btn btn-primary btn-block"
              type="submit"
              onClick={onClickOption}
            >
              Start Coding
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
