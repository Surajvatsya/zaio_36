import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthService from "actions/services/auth.service";
import "./sign-up-form.css";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "context/UserProvider";
import { LoadingContext } from "context/LoadingProvider";
import mixpanel from 'mixpanel-browser';
mixpanel.init('4e2be35d7debc0ad57db236937d08d8d', {debug: true}); 

const Register = (props) => {
  const history = useHistory();
  const queries = new URLSearchParams(history.location.search);
  const { user, setUser } = useContext(UserContext);
  const { setLoading } = useContext(LoadingContext);
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    success: !!user,
    message: "",
    redirect: queries.get("redirect") || "/",
    src: "zaio.io",
    coursein: "na",
    heardfrom: "select",
  });

  useEffect(() => {
    console.log(history.location.search)
    const queries = new URLSearchParams(history.location.search);
    console.log(queries.get("course"))

    if (queries.has("username")) {
      setState({
        ...state,
        email: queries.get("email"),
        username: queries.get("username"),
        phonenumber: queries.get("phone"),
        src: queries.get("src"),
        coursein: queries.get("course"),
      });
    }
  }, []);

  const onChangeUsername = (e) => {
    setState({
      ...state,
      username: e.target.value,
    });
  };

  const onChangeHeard = (e) => {
    setState({
      ...state,
      heardfrom: e.target.value
    });
  }


  const onChangeEmail = (e) => {
    setState({
      ...state,
      email: e.target.value,
    });
  };

  const onChangePassword = (e) => {
    setState({
      ...state,
      password: e.target.value,
    });
  };

  const onChangePhoneNumber = (e) => {
    setState({
      ...state,
      phonenumber: e.target.value,
    });
  };

  const openSnapplify = (e) => {
    e.preventDefault();

    setLoading(true);
    window.open("https://auth.snapplify.com/oauth/authorize?response_type=code&client_id=www.zaio.io&redirect_uri=https://www.zaio.io/auth/snapplify&scope=identity", "_self")
    setLoading(false);
  }

  const handleRegister = (e) => {
    e.preventDefault();
    setState({
      ...state,
      message: "",
      successful: false,
    });

    setLoading(true);
    console.log(state)
    AuthService.register(
      state.username,
      state.email,
      state.phonenumber,
      state.password,
      state.src,
      queries.get("course"),
      state.heardfrom
    )
      .then((response) => {
        console.log(response);
        //mixpanel
        mixpanel.alias(state.username);
        mixpanel.people.set({ "Course" : queries.get("course"), "heardFrom" : state.heardFrom, "src" : state.src });
        if (response.success) {
          setState({
            ...state,
            success: true,
            message: response.message,
          });
          setUser(response.data);
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

  if (state.success) {
    console.log("should redirect", state);
    history.push(`${state.redirect}`);
    return null;
  } else {
    return (
      <form
        className="signup-form rounded bg-white py-5"
        style={{ boxShadow: props.boxShadow }}
        onSubmit={handleRegister}
      >
        {state.message && (
          <div className="form-group">
            <div
              className={
                state.successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {state.message}
            </div>
          </div>
        )}
        {!state.successful && (
          <div>
            <div className="d-flex justify-content-center">
              <h2 className="mb-3 signup-title">Create your account</h2>
            </div>
            <div className="form-group">
              <label htmlFor="username">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={state.username}
                onChange={onChangeUsername}
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
                onChange={onChangeEmail}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Mobile Number</label>
              <input
                type="tel"
                className="form-control"
                name="phonenumber"
                value={state.phonenumber}
                onChange={onChangePhoneNumber}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Create Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={state.password}
                onChange={onChangePassword}
                required
              />
            </div>
            <div className="form-group">
                  <label>Where did you find us?</label>
                     <select className="form-control"
                     value={state.heardfrom}
                     onChange={onChangeHeard}>
                        <option selected value="select">Click to select</option>
                        <option value="facebook">Facebook</option>
                        <option value="instagram">Instagram</option>
                        <option  value="tiktok">TikTok</option>
                        <option value="wordofmouth">Word of mouth</option>
                        <option value="uber">Uber/Bolt/Didi/Taxi</option>
                        <option value="other">Other</option>
                    </select>
            </div>
            <p className="forgot-password text-right mt-1">
              Already have an account?{" "}
              <Link
                className="text text-danger"
                to={`/login?redirect=${state.redirect}`}
              >
                LOGIN
              </Link>
            </p>

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
              <button className="btn btn-primary btn-block" type="submit">
                Sign Up
              </button>
            </div>

            
            <p style={{textAlign: "center"}}>OR</p>
            <div>
                <Link to={'/login'}>
                  <button
                    className='btn btn-primary btn-block'
                    disabled={state.loading}
                    style={{color: "#17325b", backgroundColor: "white", marginBottom: "15px"}}
                  >
                    {state.loading && (
                      <span className='spinner-border spinner-border-sm'></span>
                    )}
                    <span>SIGN IN</span>
                  </button>
                </Link>

                <button
                  className='btn btn-primary btn-block'
                  disabled={state.loading}
                  style={{color: "#17325b", backgroundColor: "white"}}
                  onClick={openSnapplify}

                >
                  {state.loading && (
                    <span className='spinner-border spinner-border-sm'></span>
                  )}
                  <span>SIGN IN WITH SNAPPLIFY</span>
                </button>
              </div>
          </div>
        )}
      </form>
    );
  }
};
export default Register;
