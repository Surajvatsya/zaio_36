import { useState, useEffect, useContext } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import './Course.css';
import styles from './styles.module.css';
import Accordion from 'react-bootstrap/Accordion';
import { Helmet } from 'react-helmet';

// import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import ReactPlayer from 'react-player';

import tutor from '../../assets/img/founders/akhil.jpeg';
// import Modal from 'components/Wrappers/Modal/Modal'
import Modal from 'react-bootstrap/Modal';
import NewCourse from '../../containers/NewCourse/NewCourse';
import NewUnit from '../../containers/NewUnit/NewUnit';
import NewLecture from '../../containers/NewLecture/NewLecture';
import courseService from '../../actions/services/course.service';
import lectureService from '../../actions/services/lecture.service';
import unitService from '../../actions/services/unit.service';
import { LoadingContext } from '../../context/LoadingProvider';
import { PaymentDetailsContext } from '../../context/PaymentDetailsProvider';
import play from '../../assets/svg/play.svg';

import mixpanel from 'mixpanel-browser';
import { ProgressBar } from 'react-bootstrap';
import CourseList from './CourseList';
mixpanel.init('4e2be35d7debc0ad57db236937d08d8d');

function LearningPath(props) {
  console.log(props, 'props--');

  const navigate = useNavigate();
  const { courseid } = useParams();
  const [course, setCourse] = useState(null);
  const [edit, setEdit] = useState(false);
  const [newunit, setNewUnit] = useState(false);
  const [newlecture, setNewLecture] = useState(null);
  const [update, setUpdate] = useState(true);
  const [deleted, setdeleted] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [resume, setResume] = useState({
    lectureid: '',
    courseunitid: '',
  });
  const { setLoading } = useContext(LoadingContext);
  const { setDetails } = useContext(PaymentDetailsContext);
  const setNewLectureShow = (val) => {
    setNewLecture({
      ...newlecture,
      show: val,
    });
  };
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

  const openModal = () => {
    setisOpen(true);
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

  if (deleted) {
    return <Navigate to="/admin/mycourses" />;
  }
  console.log({ course });
  if (course) {
    return (
      <div
        style={{
          position: 'relative',
        }}
      >
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`${course.coursemeta.title} | Zaio`}</title>
          <meta name="description" content={course.coursemeta.description} />
          <meta property="title" content={course.coursemeta.title} />

          <meta name="og:description" content={course.coursemeta.title} />
          <meta property="og:title" content={course.coursemeta.title} />
          <meta property="og:url" content="https://www.zaio.io/" />
          <meta property="og:site_name" content="Zaio" />
          <meta property="og:type" content="article" />
        </Helmet>

        <Modal
          size="xl"
          className="popupVideo"
          show={isOpen}
          onHide={() => setisOpen(false)}
          closeButton
        >
          <ReactPlayer
            playing={true}
            controls={true}
            stopOnUnmount={true}
            url={course.courseintro}
            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
            onContextMenu={(e) => e.preventDefault()}
            width={'100%'}
            height={'100%'}
          />
        </Modal>

        {newunit ? (
          <Modal show={newunit} onHide={setNewUnit}>
            <Modal.Body>
              <NewUnit
                edit
                courseid={courseid}
                setCourse={setCourse}
                setUpdate={setUpdate}
                setNewUnit={setNewUnit}
              />
            </Modal.Body>
          </Modal>
        ) : null}
        {newlecture ? (
          <Modal
            show={newlecture.show}
            onHide={setNewLectureShow}
            setNewLecture={setNewLectureShow}
          >
            <Modal.Body>
              <NewLecture
                lectureid={newlecture.lectureid}
                courseid={courseid}
                courseunitid={newlecture.courseunitid}
                setUpdate={setUpdate}
                setNewLectureShow={setNewLectureShow}
                setLoading={setLoading}
              ></NewLecture>
            </Modal.Body>
          </Modal>
        ) : null}
        {edit ? (
          <Modal show={edit} onHide={setEdit}>
            <Modal.Body>
              <NewCourse
                edit
                course={course}
                setLoading={setLoading}
                setEdit={setEdit}
                setUpdate={setUpdate}
              />
            </Modal.Body>
          </Modal>
        ) : null}

        <div className="header-filter"></div>

        <header className="lp-header">
          <img className="play-button" onClick={openModal} src={play} alt="" />
          {course && course.courseintro ? (
            <video className="background-video" autoPlay loop muted>
              <source src={course.courseintro} type="video/mp4" />
            </video>
          ) : (
            ''
          )}

          <div className="head custom-container">
            <div className="lp-title">{course && course.coursename}</div>
          </div>
        </header>

        <div className="sticky">
          {props.edit ? (
            <div className="subscribe-card w-100">
              <div className="subscribe-button mb-3" onClick={(e) => setEdit(true)}>
                <h5 className="font-weight-bold">EDIT</h5>
              </div>
              <div className="subscribe-button mb-3" onClick={(e) => setNewUnit(true)}>
                <h5 className="font-weight-bold">Add Unit</h5>
              </div>
              <div
                className="subscribe-button mb-3"
                onClick={async (e) => {
                  await courseService.deleteCourse(course._id);
                  setdeleted(true);
                }}
              >
                <h5 className="font-weight-bold">DELETE Course</h5>
              </div>
            </div>
          ) : (
            <div className="subscribe-card w-100">
              {!course.isenrolled && (
                <div className="w-100">
                  <div className={styles.discount}>{course.coursediscount}% off</div>
                  <div className="d-flex align-items-end">
                    <div className={`${styles.price}`}>
                      R{course.courseprice - (course.coursediscount * course.courseprice) / 100}
                    </div>
                    <div className={styles.op}>R{course.courseprice}</div>
                  </div>
                  <div className={styles.daysleft}>
                    {course.coursediscountexpiry} day left at this price
                  </div>
                </div>
              )}
              {course.isenrolled ? (
                <Link
                  to={`/code?courseid=${courseid}&lectureid=${resume.lectureid}&unitid=${resume.courseunitid}`}
                >
                  <p className="text-left mb-1">Your Progress [{course.completedPercentage}%]</p>
                  <ProgressBar
                    label={`${course.completedPercentage} completed%`}
                    now={course.completedPercentage}
                    className="mb-2"
                  />
                  <div className="subscribe-button mb-3">
                    <h5 className="font-weight-bold">Continue</h5>
                  </div>
                </Link>
              ) : (
                <>
                  <div
                    className={`subscribe-button btn mb-3 w-100 p-3 ${course.coursecomingsoon ? 'disabled' : null
                      }`}
                    style={{
                      pointerEvents: course.coursecomingsoon && 'none',
                    }}
                    onClick={async (e) => {
                      // console.log("loggedin",course.loggedIn)
                      if (course.coursecomingsoon) {
                        alert('COMING SOON!!');
                      } else {
                        setDetails({
                          case: 'course',
                          price: course.courseprice,
                          discount: course.coursediscount,
                          id: course._id,
                          name: course.coursename,
                        });
                        if (course.loggedIn) {
                          if (course.coursediscount === 100) {
                            setDetails(null);
                            setLoading(true);
                            courseService.enrollCourse(course._id).finally(() => {
                              window.location.reload();
                            });
                          } else {
                            navigate('/payment');
                          }
                        } else {
                          if (course.coursediscount === 100) {
                            navigate(
                              `/welcome${navigate.location.search !== ''
                                ? navigate.location.search
                                : '?src=zaio.io'
                              }&course=${course.coursename}&Navigate=/course/${course._id}`
                            );
                          } else {
                            navigate(
                              `/welcome${navigate.location.search !== ''
                                ? navigate.location.search
                                : '?src=zaio.io'
                              }&course=${course.coursename}&Navigate=/payment`
                            );
                          }
                        }
                      }
                    }}
                  >
                    <h5 className="font-weight-bold">
                      {course.coursecomingsoon
                        ? 'COMING SOON'
                        : course.courseprice -
                          (course.coursediscount * course.courseprice) / 100 ===
                          0
                          ? 'Enroll Now'
                          : 'Buy now!'}
                    </h5>
                  </div>
                </>
              )}

              <hr></hr>
              <ul
                className="text-left ml-4"
                style={{
                  listStyle: 'initial',
                }}
              >
                {course &&
                  course.coursetags.map((tag) => (
                    <li className="subscribe-content" key={tag}>
                      {tag}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        <div className="lp-content custom-container my-2">
          <div className="row my-2 list-item">{course && course.coursedescription}</div>
        </div>
        <div className="lp-learn py-3 my-2">
          <div className="custom-container">
            <div className="heading mt-2 mb-2">Prerequisites</div>
            <div className="row list-item py-3 px-2">{course && course.courseprerequisites}</div>
          </div>
        </div>
        <div className="lp-content custom-container my-2">
          <div className="py-2 mb-4">
            <Accordion>
              <div className="heading mt-4 mb-2">What's inside</div>
              <p className="pb-3 py-3 lp-unitline">
                This course contains {course && course.courseunit.length} sections
              </p>
              <CourseList
                course={course}
                updateUnitList={updateUnitList}
                edit={props.edit}
                setUpdate={setUpdate}
                setNewLecture={setNewLecture}
                courseid={courseid}
                indexListChange={indexListChange}
                setLoading={setLoading}
              />
            </Accordion>
          </div>
        </div>
        <div className="lp-learn py-2">
          <div className="custom-container">
            <div className="heading mt-3 mb-4">You'll Learn</div>
            <div className="row">
              <div className="col-xs-12 col-md-6">
                {course &&
                  course.courselearning
                    .slice(0, Math.ceil(course.courselearning.length / 2))
                    .map((learning) => <div className="list-item">⚫ {learning}</div>)}
              </div>
              <div className="col-xs-12 col-md-6">
                {course &&
                  course.courselearning
                    .slice(Math.ceil(course.courselearning.length / 2))
                    .map((learning) => <div className="list-item">⚫ {learning}</div>)}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="lp-content custom-container my-2">
            <div className="heading mt-2 mb-2">You'll Build</div>
            <div className="row list-item py-3 px-2">
              <div className="col-xs-12 col-md-6">
              {course && course.coursebuilding.slice(0,Math.ceil(course.coursebuilding.length / 2)).map(project=><div className="build-item">
                    <img src={project.thumbnail} alt="netflix"></img>
                    <h4 className="font-weight-bold">{project.name}</h4>
                    <p>{project.details}</p>
                  </div>
                )} 
              </div>
              <div className="col-xs-12 col-md-6">
              {course && course.coursebuilding.slice(Math.ceil(course.coursebuilding.length / 2,)).map(project=><div className="build-item">
                    <img src={project.thumbnail} alt="netflix"></img>
                    <h4 className="font-weight-bold">{project.name}</h4>
                    <p>{project.details}</p>
                  </div>
                )}
              </div>
            </div>
          </div> */}

        <div className="lp-teacher pt-5 pb-5">
          <div className="custom-container">
            <div className="teacher-image text-center">
              <div className="teacher">
                <img
                  src={tutor}
                  alt=""
                  style={{
                    borderRadius: '7px',
                    boxShadow: '1px 1px 7px black',
                  }}
                ></img>
              </div>
            </div>
            <div className="teacher-text">
              <div className="heading mb-3">Meet your teacher</div>
              <p className="list-item">{course && course.courseteacher}</p>
              <p>
                I am a co-founder at Zaio, and have worked on countless projects for the past 5
                years around web development. I absolutely love to code and am always up for a
                coffee conversation with any passionate individual!
              </p>
            </div>
          </div>
        </div>

        <div className="lp-content custom-container my-2">
          <div className="py-2 mb-4">
            <div className="heading mt-4 mb-2">Why this course rocks!</div>
            <div className="row list-item-2 py-3 px-2">{course && course.whythiscourse}</div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default LearningPath;
