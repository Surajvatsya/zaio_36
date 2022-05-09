import { useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import courseService from '../../actions/services/course.service';
import lectureService from '../../actions/services/lecture.service';
import unitService from '../../actions/services/unit.service';
import { LoadingContext } from '../../context/LoadingProvider';

import Accordion from 'react-bootstrap/Accordion';

import mixpanel from 'mixpanel-browser';

import { FiArrowRight, FiX } from 'react-icons/fi';

import './CourseSidebar.css';

import CourseList from '../../pages/Course/CourseList.js';

const Sidebar = ({ courseid }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const [course, setCourse] = useState(null);
  const [newlecture, setNewLecture] = useState(null);
  const [update, setUpdate] = useState(true);
  const { setLoading } = useContext(LoadingContext);
  const [resume, setResume] = useState({
    lectureid: '',
    courseunitid: '',
  });

  const updateUnitList = async (result) => {
    const items = course.courseunit;
    if (result.source && result.destination) {
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setCourse({
        ...course,
        courseunit: items,
      });
      let formdata = new FormData();
      let data = {
        ...course,
        courseunit: JSON.stringify(course.courseunit),
      };
      for (const key in data) {
        // console.log(key,data[key])
        formdata.append(key, data[key]);
      }

      try {
        let res = await courseService.putCourse(formdata);

        if (!res.success) {
          alert('Failed to save');
        }
      } catch (error) {
        console.log('1');
        navigate('/somethingwentwrong');
      }
    }
  };

  const indexListChange = async (unitIndex, lectureIndex, change) => {
    let list = course.courseunit[unitIndex].lecture;
    if (lectureIndex <= 0 && change === 'INC') {
      alert('wrong');
    }
    if (lectureIndex >= list.length - 1 && change === 'DEC') {
      alert('wrong');
    } else {
      if (change === 'INC') {
        let temp = {
          ...list[lectureIndex - 1],
        };
        list[lectureIndex - 1] = list[lectureIndex];
        list[lectureIndex] = temp;
      } else if (change === 'DEC') {
        let temp = {
          ...list[lectureIndex + 1],
        };
        list[lectureIndex + 1] = list[lectureIndex];
        list[lectureIndex] = temp;
      }
      let unitList = course.courseunit;
      unitList[unitIndex].lecture = list;

      setCourse({
        ...course,
        courseunit: unitList,
      });
      try {
        const res = await unitService.putUnit(unitList[unitIndex]._id, unitList[unitIndex]);
        if (!res.success) {
          alert('failed to save');
        }
      } catch (error) {
        console.log('2');
        navigate('/somethingwentwrong');
      }
    }
  };

  useEffect(() => {
    console.log(navigate);
    if (update === true) {
      const funct = async () => {
        setLoading(true);
        let response = null;
        let res = null;
        try {
          res = await lectureService.getLastWatched(courseid);
          response = await courseService.getCourse(courseid);
          console.log({ response });

          if (!response.success) {
            navigate('/allcourses');
          }
          mixpanel.track('Course page', {
            CourseName: response.data.coursename,
          });
          const completedLectures = response.data.completedLectures.map((item) => item._id);
          console.log({ completedLectures } + 'asdasd');
          setCourse({
            ...response.data,
            completedLectures,
          });
        } catch (error) {
          console.log('4');
          navigate('/somethingwentwrong');
        }

        if (res.success) {
          setResume(res.data);
        } else {
          // console.log(response)
          if (
            response.data &&
            response?.data?.courseunit[0] &&
            response?.data?.courseunit[0]?.lecture[0]
          ) {
            setResume({
              lectureid: response.data.courseunit[0].lecture[0]._id,
              courseunitid: response.data.courseunit[0]._id,
            });
          }
        }
        setLoading(false);
      };

      funct();
    }

    setUpdate(false);
  }, [update]);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`app ${isActive ? 'is-active' : ''}`}>
      <div className={`menu-toggle ${isActive ? 'is-active' : ''}`} onClick={handleClick}>
        <FiArrowRight className="hamburger" /> <strong>Course content</strong>
      </div>

      <div className={`sidebar ${isActive ? 'is-active' : ''}`}>
        <div className="sidebar-header">
          <strong>Course content</strong>
          <FiX onClick={handleClick} className="hamburger" />
        </div>
        <Accordion>
          <CourseList
            course={course}
            updateUnitList={updateUnitList}
            edit={''}
            setUpdate={setUpdate}
            setNewLecture={setNewLecture}
            courseid={courseid}
            indexListChange={indexListChange}
            setLoading={setLoading}
            borderRadius="0"
          />
        </Accordion>
      </div>
    </div>
  );
};

export default Sidebar;
