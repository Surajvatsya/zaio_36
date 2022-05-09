import React, { useState, useEffect, useContext } from "react";
import Styles from "./Results.module.css";
// import { useNavigate } from "react-router-dom";
import CourseComponent from "../../components/CourseComponent/CourseComponent";
import { ResultsSkeleton } from "./ResultsSkeleton";
import { LoadingContext } from "../../context/LoadingProvider";
// import Modal from 'components/Wrappers/Modal/Modal'

function Results(props) {
  // const navigate = useNavigate();
  const [courseList, setCourseList] = useState(null);
  const { setLoading } = useContext(LoadingContext);
  useEffect(() => {
    console.log(props);
    const funct = async () => {
      setLoading(true);
      let res = null;
      try {
        res = await props.service();
        console.log({ res });
        setLoading(false);
        if (res.success) {
          setCourseList(res.data);
        } else {
          // history.push('/somethingwentwrong')
        }
      } catch (error) {
        setLoading(false);
        // history.push('/somethingwentwrong')
      }
    };
    funct();
  }, []);
  // console.log(courseList)
  return (
    <div
      className={`row ${Styles.results} bg-transparent w-100 justify-content-start`}
    >
      {courseList ? (
        courseList.map((course , index ) => {
          let completedPercentage = null;
          if (!props.explore) {
            completedPercentage = course.completedPercentage;
            course = course.courseid;
          }
          if (course)
            return (
              <CourseComponent
                completedPercentage={completedPercentage}
                explore={props.explore}
                lp={props.lp}
                index={props.lp ? index : null}
                redirect={props.redirect}
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
  );
}

export default Results;
