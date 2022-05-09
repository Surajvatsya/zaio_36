import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../actions/services/auth.service";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/UserProvider";
import { LoadingContext } from "../../../context/LoadingProvider";
import mixpanel from 'mixpanel-browser';
mixpanel.init('4e2be35d7debc0ad57db236937d08d8d', {debug: true}); 


const Login = () => {
  const navigate = useNavigate();
  console.log(navigate.location);
  // const queries = new URLSearchParams(navigate.location.search);
  

  const { user, setUser } = useContext(UserContext);
  const { setLoading } = useContext(LoadingContext);
  const [state, setState] = useState({
    username: "",
    password: "",
    success: !!user,
    message: "",
    // redirect: queries.get("redirect") || "/dashboard",
    src: "zaio.io",
  });
  // useEffect(() => {
  //   const queries = new URLSearchParams(navigate.location.search);
  //   if (queries.has("username")) {
  //     setState({
  //       ...state,
  //       email: queries.get("email"),
  //       username: queries.get("username"),
  //       phonenumber: queries.get("phone"),
  //       src: queries.get("src"),
  //     });
  //   }
  // }, []);

  const onChangeUsername = (e) => {
    setState({
      ...state,
      username: e.target.value,
    });
  };

  const onChangePassword = (e) => {
    setState({
      ...state,
      password: e.target.value,
    });
  };

  const openSnapplify = (e) => {
    setLoading(true);
    window.open("https://auth.snapplify.com/oauth/authorize?response_type=code&client_id=www.zaio.io&redirect_uri=https://www.zaio.io/auth/snapplify&scope=identity", "_self")
    setLoading(false);
  }

  const handleLogin = (e) => {
    e.preventDefault();

    setState({
      ...state,
      message: "",
      successful: false,
    });

    setLoading(true);
    AuthService.login(state.username, state.password, state.src)
      .then((response) => {
        console.log(response);
        //mixpanel
        mixpanel.identify(state.username)
        mixpanel.people.set({ "$email": state.username });
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
    navigate(`${state.redirect}`);
    return null;
  } else {
    return (
      <div className='d-flex justify-content-center'>
        <form
          className='signup-form col-12 col-md-6 col-lg-4 m-4 p-4 border-4 rounded border-primary'
          onSubmit={handleLogin}
        >
          <div className='d-flex justify-content-center'>
            <h2 className='mt-2 mb-3'>Login</h2>
          </div>
          {state.message && (
            <div className='form-group'>
              <div className='alert alert-danger' role='alert'>
                {state.message}
              </div>
            </div>
          )}
          <div className='form-group'>
            <label htmlFor='username'>Email</label>
            <input
              type='text'
              className='form-control'
              name='username'
              value={state.username}
              onChange={onChangeUsername}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='form-control'
              name='password'
              value={state.password}
              onChange={onChangePassword}
              required
            />
          </div>
         
          <div className='form-group'>
            <button
              type='submit'
              className='btn btn-primary btn-block'
              disabled={state.loading}
            >
              {state.loading && (
                <span className='spinner-border spinner-border-sm'></span>
              )}
              <span>Login</span>
            </button>
          </div>
          <p className='forgot-password text-right mt-1'>
            New to ZAIO?{" "}
            <Link
              className='text text-success'
              to={`/getstarted`}
            >
              GET STARTED
            </Link>
          </p>
          <p className='forgot-password text-right mt-1'>
            Forgot password?{" "}
            <Link className='text text-success' to={`/forgotpassword`}>
              forgot password
            </Link>
          </p>


          <div>
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

        </form>
      </div>
    );
  }
};

export default Login;
