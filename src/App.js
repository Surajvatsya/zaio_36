// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useContext } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import ReactGA from "react-ga";
import React from 'react'
import "./App.css";
import "./styles/index.scss";
import { AllCourses } from "./pages/AllCourses/AllCourses";
import Loader from "./components/Loader/Loader";

import WaitingListBar from "./components/WaitingListBar/WaitingListBar";
import ForgotPassword from "./containers/ForgotPassword";

import { SignupProcess } from "./pages/Auth/SignupProcess/SignupProcess";
import { Logout } from "./pages/Auth/Logout/Logout";
import Home from "./pages/Home/Home";
import Course from "./pages/Course/Course";

import PrivacyPolicy from "./pages/Policies/privacypolicy/privacypolicy";
import Terms from "./pages/Policies/terms/terms";
import RefundPolicy from "./pages/Policies/refundpolicy/refundpolicy";
import TakeQuiz from "./pages/Marketing/takequiz/takequiz";
import Consultatiion from "./pages/Marketing/consultation/consultation";
import { AdminPortal } from "./pages/AdminPortal/AdminPortal";
import Dashboard from "./pages/DashBoard/Dashboard";
import Login from "./pages/Auth/Login/Login";
import CodePage from "./pages/CodeEnvironment/CodePage/CodePage";
import Payment from "./pages/Payment";
import CodePageDemo from "./pages/CodeEnvironment/CodePageDemo/CodePageDemo";

import Layout from "./Utils/Layout";
import ShouldBeLoggedIn from "./Utils/ShouldBeLoggedIn";
import { LoadingContext } from "./context/LoadingProvider";
import authService from "./actions/services/auth.service";
import { UserContext } from "./context/UserProvider";


import mixpanel from "mixpanel-browser";
mixpanel.init("4e2be35d7debc0ad57db236937d08d8d", { debug: true });
ReactGA.initialize("UA-204183816-1");
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  const [updateUser, setUpdateUser] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();



  useEffect(() => {
    setLoading(true);
    const funct = async () => {
      if (user) {
        try {
          const res = await authService.updateUserData();
          if (res.success) {
            setUser(res);
          } else {
            navigate("/logout");
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    funct();
    setUpdateUser(false);
  }, [updateUser]);

  return (
    <div className="App">
      <Loader />
      {user ? null : <WaitingListBar />}

      <Routes>
        <Route exact path='/' element={
          <Layout>
            <Home></Home>
          </Layout>
        }

        />
        <Route exact path='/login' element={
          <Layout>
            <Login loggedin={!!user}></Login>
          </Layout>
        } />
        <Route exact path='/logout' element={<Logout />} render={() => { }} />


        <Route exact path='/course/:coursename/:courseid' element={<Layout>
          <div
            style={{
              minHeight: "200px",
            }}
          >
            <Course loggedin={!!user}></Course>
          </div>
        </Layout>} />

        {/* <Route path='/learning-path' element={<Layout>
              <LearningPath loggedin={!!user} />
            </Layout>} /> */}
        {/* <Route path='/goal' element={<Layout>
          <LandingPage loggedin={!!user} />
        </Layout>} /> */}

        {/* <Route exact path='/business'>
            <Layout>
              <Business></Business>
            </Layout>
          </Route>
          <Route exact path='/corporate'>
            <Layout>
              <Corporate></Corporate>
            </Layout>
          </Route>
          <Route exact path='/csi'>
            <Layout>
              <CSI></CSI>
            </Layout>
          </Route>

          <Route exact path='/impact'>
            <Layout>
              <Impact></Impact>
            </Layout>
          </Route>

          <Route exact path='/about'>
            <Layout>
              <AboutUs></AboutUs>
            </Layout>
          </Route> */}

          <Route exact path='/privacypolicy' element={ <Layout>
              <PrivacyPolicy></PrivacyPolicy>
            </Layout>} />
           
            <Route exact path='/terms' element={ <Layout>
              <Terms></Terms>
            </Layout>} />
            <Route exact path='/refundpolicy' element={<Layout>
              <RefundPolicy></RefundPolicy>
            </Layout>} />
            <Route exact path='/takequiz' element={<Layout>
              <TakeQuiz></TakeQuiz>
            </Layout>} />
            <Route exact path='/consultation' element={<Layout>
              <Consultatiion></Consultatiion>
            </Layout>} />
            {/* <Route exact path='/pricing' element={ <Layout>
              <Pricing loggedin={!!user}></Pricing>
            </Layout>} /> */
            }

            {/* <Route exact path='/request-demo' element={ <Demo />} /> */}
           
         
            <Route exact path='/allcourses' element={<Layout>
              <AllCourses />
            </Layout>} />
            {/* <Route exact path='/blog' element={<Blog></Blog>
            <Footer />} /> */}
            {/* <Route path='/blog/:id'>
            <BlogPage></BlogPage>
            <Footer></Footer>
          </Route> */}
          <Route exact path='/code' element={<ShouldBeLoggedIn loggedin={!!user}>
              <CodePage />
            </ShouldBeLoggedIn>} />
            
            <Route path='/admin' element={<ShouldBeLoggedIn>
              <AdminPortal userData={user}></AdminPortal>
            </ShouldBeLoggedIn>} />
            
            <Route path='/dashboard' element={<ShouldBeLoggedIn>
              <Layout>
                <Dashboard
                  setUpdateUser={setUpdateUser}
                  userData={user}
                ></Dashboard>
              </Layout>
            </ShouldBeLoggedIn>} />
            
            <Route exact path='/payment' element={ <ShouldBeLoggedIn>
              <Layout>
                <Payment setUpdateUser={setUpdateUser} />
              </Layout>
            </ShouldBeLoggedIn>} />
           
            <Route exact path='/welcome' element={<Layout>
              <SignupProcess />
            </Layout>} />
            
            <Route exact path='/getstarted' element={<Layout>
              <SignupProcess />
            </Layout>} />
            
            <Route exact path='/somethingwentwrong' element={<Layout>SOMETHING WENT WRONG!</Layout>} />
            
            <Route path='/forgotpassword' element={<Layout>
              <ForgotPassword />
            </Layout>} />
            
            <Route path='/live-demo' element={   <CodePageDemo/>}/>
         
            <Route element={<Layout>
              <div
                style={{
                  minHeight: "300px",
                  width: "100%",
                  textAlign: "center",
                  fontSize: "2rem",
                  paddingTop: "5%",
                }}
              >
                404 NOT FOUND
              </div>
            </Layout>} />         
      </Routes>
    </div>
  );
}

export default App;
