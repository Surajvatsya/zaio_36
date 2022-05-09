import { useState, useEffect } from "react";
import NavbarForCode from "../../../components/NavbarForCode/NavbarForCode";
import CourseSidebar from "../../../containers/Code/CourseSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import courseService from "../../../actions/services/course.service";
import lectureService from "../../../actions/services/lecture.service";
import { useContext } from "react";
import { LoadingContext } from "../../../context/LoadingProvider";
import mixpanel from "mixpanel-browser";
mixpanel.init("4e2be35d7debc0ad57db236937d08d8d");

export default function CodePage(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const queries = new URLSearchParams(location.search);
  const [courseId, setCourseId] = useState(queries.get("courseid"));
  const [unitId, setUnitId] = useState(queries.get("unitid"));
  const [lectureId, setLectureId] = useState(queries.get("lectureid"));
  const [lectureList, setLectureList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [lecture, setLecture] = useState({});
  const [unitName, setUnitName] = useState("");
  const [nextLecture, setNextLecture] = useState("");
  const [nextUnit, setNextUnit] = useState("");
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const funct = async () => {
      let cl,
        ul,
        ln = null;
      try {
        setLoading(true);
        cl = await courseService.getCourses();
        ul = await courseService.getCourse(courseId);
        ln = await lectureService.getLecture(lectureId);
        console.log("unitList", ul);
        console.log("courseList", cl);
        console.log("lecturename", ln);
        if (!ul.success || !cl.success || !ln.success)
          alert("somethingbadhappened");
        setLecture(ln.data);
        setCourseList(cl.data);
        setUnitList(ul.data.courseunit);
        setLoading(false);
      } catch (error) {
        navigate("/somethingwentwrong");
      }
    };

    funct();
  }, [courseId, unitId, lectureId]);

  return (
    <>
      <NavbarForCode
        courseId={courseId}
        courseName={courseName}
        setCourseName={setCourseName}
        courseList={courseList}
        unitList={unitList}
        unitName={unitName}
        setUnitName={setUnitName}
        unitId={unitId}
        lecture={lecture}
        lectureList={lectureList}
        setLectureList={setLectureList}
        setLectureId={setLectureId}
        setUnitId={setUnitId}
        setNextLecture={setNextLecture}
        setNextUnit={setNextUnit}
      />
      <CourseSidebar
        setUnitId={setUnitId}
        setLectureId={setLectureId}
        lectureId={lectureId}
        lecture={lecture}
        unitName={unitName}
        courseId={courseId}
        unitId={unitId}
        nextLecture={nextLecture}
        nextUnit={nextUnit}
        courseName={courseName}
      />
    </>
  );
}
