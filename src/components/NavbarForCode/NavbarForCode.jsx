import { useState, useEffect } from "react";
import styles from "./NavbarForCode.module.css";
import logo from "../../assets/img/zaio-logos/zaio-logo-light.png";
import { NavLink, useNavigate } from "react-router-dom";
import mixpanel from "mixpanel-browser";
mixpanel.init("4e2be35d7debc0ad57db236937d08d8d");

export default function NavbarForCode({
  courseId,
  setCourseName,
  courseName,
  courseList,
  unitList,
  unitName,
  setUnitName,
  unitId,
  lecture,
  lectureList,
  setLectureList,
  setLectureId,
  setUnitId,
  setNextLecture,
  setNextUnit,
}) {
  const [count, setCount] = useState(0);

  const navigate = useNavigate();
  // const findCourse = (id, cn) => {
  //   if (id === courseId) {
  //     setCourseName(cn);
  //     return "selected";
  //   }
  //   return null;
  // };
  var setnxtlect = false;
  var setnxtunit = false;

  useEffect(() => {
    if (courseName && unitName && lecture && count === 0) {
      setCount(1);
      console.log("testingmix", courseName);
      mixpanel.track("Started watching", {
        "Course Name": courseName,
        Unit: unitName,
        Lecture: lecture.lecturename,
      });
    }
  });

  return (
    <div className={styles.main}>
      <NavLink to='/' className={styles.triggerName}>
        <div
          style={{
            display: "inline-flex",
          }}
        >
          <img src={logo} height={15} alt="" />
        </div>
      </NavLink>
      <div className={styles.list}>
        <h4>Enrolled Courses</h4>
        <ul className={styles.content}>
          {courseList &&
            courseList.map((course) => {
              if (course.courseid) {
                if (!courseName && course.courseid._id === courseId) {
                  setCourseName(course.courseid.coursename);
                  console.log("styles.selected");
                }
                return (
                  <li
                    key={course.courseid._id}
                    className={
                      course.courseid._id === courseId ? styles.selected : null
                    }
                    onClick={(e) => {
                      navigate(`/course/${course.courseid._id}`);
                    }}
                  >
                    {course.courseid.coursename}
                  </li>
                );
              }
              return null;
            })}
        </ul>
      </div>
      <span className={styles.path}>
        <span
          style={{
            backgroundColor: "gray",
            width: "fit-content",
            padding: "0px 5px",
            margin: "5px 5px", 
          }}
        >
          {"  /  "}
          <span className={styles.triggerName}>
            <NavLink to={`/course/${courseId}`} >
              <span style={{ display: "inline-block", color: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "25ch", marginBottom: "-5px"}}>{courseName}</span>
            </NavLink>
          </span>
          <div className={styles.list + " " + styles.list1}>
            <h4>Units</h4>
            <ul className={styles.content}>
              {unitList.map((unit) => {
                if (setnxtunit) {
                  console.log("unitmap=>", unit);
                  setNextUnit(unit);
                  setnxtunit = false;
                }
                if (!unitName && unit._id === unitId) {
                  setUnitName(unit.unitname);
                  setLectureList(unit.lecture);
                  console.log("styles.selected");
                  setnxtunit = true;
                }

                return (
                  <li
                    key={unit._id}
                    className={unit._id === unitId ? styles.selected : null}
                    onClick={(e) => {
                      navigate(
                        `/code?courseid=${courseId}&unitid=${unit._id}&lectureid=${unit.lecture[0]._id}`
                      );
                      setLectureId(unit.lecture[0]._id);
                      setUnitId(unit._id);
                      window.location.reload();
                    }}
                  >
                    {unit.unitname}
                  </li>
                );
              })}
            </ul>
          </div>
          {"  /  "}
          <span className={styles.triggerName}>
            <NavLink to={`/course/${courseId}`} style={{ display: "inline-block", color: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "25ch",marginBottom: "-5px"}}>
            {unitName}
            </NavLink>
          </span>
          <div className={styles.list + " " + styles.list2}>
            <h4>Lectures</h4>
            <ul className={styles.content}>
              {lectureList.map((lect) => {
                if (setnxtlect) {
                  setNextLecture(lect._id);
                  setnxtlect = false;
                }
                if (lect._id === lecture._id) {
                  setnxtlect = true;
                }

                return (
                  <li
                    key={lect._id}
                    className={
                      lect._id === lecture._id ? styles.selected : null
                    }
                    onClick={(e) => {
                      navigate(
                        `/code?courseid=${courseId}&unitid=${unitId}&lectureid=${lect._id}`
                      );
                      setLectureId(lect._id);
                      window.location.reload();
                    }}
                  >
                    {lect.lecturename}
                  </li>
                );
              })}
            </ul>
          </div>

          <span>
            {"  /  "}
            <span className={styles.triggerName}>{lecture.lecturename}</span>
          </span>
        </span>
      </span>
    </div>
  );
}
