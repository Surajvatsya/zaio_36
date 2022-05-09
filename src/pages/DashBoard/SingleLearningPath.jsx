import Styles from "./Dashboard.module.css";
import { ToastContainer } from "react-toastify";
import learningpathService from "../../actions/services/learningpath.service";
import React from "react";
import { Navigate } from "react-router-dom";
import CourseComponent from "../../components/CourseComponent/CourseComponent";
import { ResultsSkeleton } from "./../../components/Results/ResultsSkeleton";

class SingleLearningPath extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      heading: "Course",
      redirect: false,
      courseList: [],
    };
  }
  
  getId = () => {
    let paths = window.location.pathname.split("/");
    return paths[paths.length - 1];
  };
  componentDidMount() {
    let id = this.getId();
    learningpathService.getLearningPath(id).then((res) => {
      if (!res.success) {
        console.log("redirect somewhere");
      }
      console.log(res);

      this.setState({
        heading: res.data.learningpathname,
        courseList: res.data.learningpathcourses
      });
    });
  }
  back(){
    this.setState({ redirect: true });
  }
  render() {
    
    const { redirect } = this.state;
    if (redirect) {
      return <Navigate to='/dashboard'/>;
    }
    let { heading, courseList } = this.state;
    return (
      <div className={"container-fluid " + Styles.dashboard_settings}>
         <button className={Styles.back_Btn} onClick={()=>this.back()}>Back</button>
        <ToastContainer />
        <div className="header">
          <p className={Styles.heading + " title"}>{heading}</p>
        </div>
        <div
          className={`row ${Styles.results} bg-transparent w-100 justify-content-start`}
        >
          {courseList ? (
            courseList.map((course, index) => {
              let completedPercentage = null;
              if (typeof course.completedPercentage !== 'undefined') {
                completedPercentage = course.completedPercentage;
              }
              if (course)
                return (
                  <CourseComponent
                    completedPercentage={completedPercentage}
                    explore={""}
                    lp={""}
                    index={null}
                    redirect={"view"}
                    key={course._id}
                    id={course._id}
                    coursename={course.coursename}
                    courseteacher={course.courseteacher}
                    courselevel={course.courselevel}
                    numberofcourseunits={course.courseunit.length}
                    coursethumbnailurl={course.coursethumbnailurl}
                    courseduration={course.courseduration}
                    courseprice={course.courseprice}
                    coursediscount={course.coursediscount}
                    coursediscountexpiry={course.coursediscountexpiry}
                  ></CourseComponent>
                );
              else return null;
            })
          ) : (
            <ResultsSkeleton />
          )}
        </div>
      </div>
    );
  }
}
export default SingleLearningPath;