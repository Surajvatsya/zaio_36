import React from 'react'
import { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link, useNavigate } from "react-router-dom";
import "./Course.css";
import styles from "./styles.module.css";
import Accordion from "react-bootstrap/Accordion";
import { Helmet } from "react-helmet";

// import Button from 'react-bootstrap/Button'
import Card from "react-bootstrap/Card";
import lectureService from "../../actions/services/lecture.service";
import unitService from "../../actions/services/unit.service";
import unchecked from "../../assets/img/misc/2.png";
import checked from "../../assets/img/misc/1.png";

import mixpanel from "mixpanel-browser";
import { ProgressBar } from "react-bootstrap";
import { BiWindowAlt } from 'react-icons/bi';
mixpanel.init("4e2be35d7debc0ad57db236937d08d8d");

function CourseList({ course, updateUnitList, edit, setUpdate, setNewLecture, courseid, indexListChange, setLoading, borderRadius }) {
    const navigate = useNavigate();

    const [click, setClick] = useState(false);

    const handleClick = (isenrolled, courseid, lectureId, unitId) => {
        console.log("handkleCliick", courseid, lectureId, unitId)
        setClick(true);
        if (isenrolled)
        navigate(`/code?courseid=${courseid}&lectureid=${lectureId}&unitid=${unitId}`);
    }

    useEffect(() => {
        if (click)
            window.location.reload(true);
    }, [click])

    return (

        <DragDropContext DragDropContext onDragEnd={updateUnitList} >
            <Droppable droppableId='units'>
                {(provided) => {
                    return (
                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                            {course &&
                                course.courseunit.map((unit, unitIndex) => (
                                    <Draggable
                                        key={unit._id}
                                        draggableId={unit._id}
                                        index={unitIndex}
                                        isDragDisabled={!edit}

                                    >
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Card key={unit._id} style={{ borderRadius: borderRadius && 0 }}>
                                                    <Accordion.Toggle
                                                        as={Card.Header}
                                                        variant='link'
                                                        eventKey={unit._id}
                                                    >
                                                        <b>{unit.unitname} </b> -{" "}
                                                        <b>{unit.lecture.length} lessons </b>
                                                    </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey={unit._id}>
                                                        <Card.Body>
                                                            {edit ? (
                                                                <div className='d-flex justify-content-between m-3'>
                                                                    <div
                                                                        className='btn btn-primary btn-sm'
                                                                        onClick={(e) =>
                                                                            setNewLecture({
                                                                                courseunitid: unit._id,
                                                                                show: true,
                                                                            })
                                                                        }
                                                                    >
                                                                        Add Lecture
                                                                    </div>
                                                                    <div
                                                                        className='btn btn-danger btn-sm'
                                                                        onClick={async (e) => {
                                                                            await unitService.deleteUnit(
                                                                                unit._id
                                                                            );
                                                                            setUpdate(true);
                                                                        }}
                                                                    >
                                                                        Delete Unit
                                                                    </div>
                                                                </div>
                                                            ) : null}
                                                            {unit.lecture.map(
                                                                (lecture, lectureIndex) => (
                                                                    <>
                                                                        <div
                                                                            key={lecture._id}
                                                                            className='d-flex justify-content-between'

                                                                        >
                                                                            <div
                                                                                onClick={() => handleClick(course.isenrolled, courseid, lecture._id, unit._id)}
                                                                                // to={
                                                                                //     course.isenrolled
                                                                                //         ? `/code?courseid=${courseid}&lectureid=${lecture._id}&unitid=${unit._id}`
                                                                                //         : "#"
                                                                                // }
                                                                                className='w-100 d-flex'
                                                                                style={{ cursor: 'pointer' }}

                                                                            >
                                                                                {course.completedLectures.includes(
                                                                                    lecture._id
                                                                                ) ? <div><img src={checked} width="60%" alt=" "/></div> : <div><img src={unchecked} width="60%" alt=" "/></div>}
                                                                                {lecture.lecturename}

                                                                            </div>
                                                                            {edit ? (
                                                                                <>
                                                                                    <div
                                                                                        className='btn btn-primary btn-sm'
                                                                                        onClick={(e) =>
                                                                                            setNewLecture({
                                                                                                lectureid:
                                                                                                    lecture._id,
                                                                                                courseunitid:
                                                                                                    unit._id,
                                                                                                show: true,
                                                                                            })
                                                                                        }
                                                                                    >
                                                                                        Edit
                                                                                    </div>
                                                                                    <div
                                                                                        className={`btn btn-danger m-1 ${lectureIndex <= 0
                                                                                            ? "disabled"
                                                                                            : null
                                                                                            }`}
                                                                                        onClick={() =>
                                                                                            indexListChange(
                                                                                                unitIndex,
                                                                                                lectureIndex,
                                                                                                "INC"
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        &uarr;
                                                                                    </div>
                                                                                    <div
                                                                                        className={`btn btn-danger m-1 ${lectureIndex >=
                                                                                            unit.lecture.length - 1
                                                                                            ? "disabled"
                                                                                            : null
                                                                                            }`}
                                                                                        onClick={() =>
                                                                                            indexListChange(
                                                                                                unitIndex,
                                                                                                lectureIndex,
                                                                                                "DEC"
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        &darr;
                                                                                    </div>
                                                                                    <div
                                                                                        className='btn btn-danger btn-sm'
                                                                                        onClick={(e) => {
                                                                                            setLoading(true);
                                                                                            lectureService.deleteLecture(
                                                                                                lecture._id
                                                                                            );
                                                                                            setUpdate(true);
                                                                                        }}
                                                                                    >
                                                                                        Delete
                                                                                    </div>
                                                                                </>
                                                                            ) : null}
                                                                        </div>
                                                                        <hr />
                                                                    </>
                                                                )
                                                            )}
                                                        </Card.Body>
                                                    </Accordion.Collapse>
                                                </Card>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                        </ul>
                    );
                }}
            </Droppable>
        </DragDropContext >

    )
}

export default CourseList