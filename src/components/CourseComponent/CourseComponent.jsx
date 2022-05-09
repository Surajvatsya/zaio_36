import React from "react";
import Styles from "./CourseComponent.module.css";
// import signup_modal_image from "assets/img/misc/happy_people.jpg";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
const CourseComponent = (props) => {
  let coursename = (props.coursename).replace(/\s+/g, '-').toLowerCase();
  return (
    <div className={`col-12 col-md-6 col-lg-4 ${Styles.container_wrapper}`}>
      <div className={`card ${Styles.container}`}>
        <Link
          to={`${props.redirect === "edit" ? "/admin/course/"+props.id : "/course/"+coursename+"/"+props.id}`}
          className='h-100'
        >
          {typeof props.index === "number" ? (
            <div className={Styles.index}>{props.index + 1}</div>
          ) : null}

          <img
            src={props.coursethumbnailurl}
            className='card-img-top'
            alt='...'
          />
          <div className={`card-body ${Styles.container_body}`}>
            <h5 className={`card-title ${Styles.title}`}>{props.coursename}</h5>
            {props.completedPercentage === null ? (
              <div>
              {props.explore && !props.lp && (
              <div className='row mt-auto w-100'>
                  <div className='col-5 mt-auto'>
                      <div className={`card-text ${Styles.teacher}`}>
                        by{" "}
                        <span className={`${Styles.bold}`}>
                          {props.courseteacher}
                        </span>
                      </div>
                      <div className={`card-text ${Styles.level}`}>
                        {props.courseduration} | {props.courselevel}
                      </div>
                  </div> 
                {/* {props.courseprice && <div className="col-6">
							<div className={`${Styles.price}`}>R{props.courseprice}</div>
						</div>} */}
                
                  
                  <div className='col-7'>
                    <div className={Styles.op}>R{props.courseprice}</div>
                    <div className='d-flex justify-content-end align-items-end'>
                      <div className={Styles.discount}>
                        {props.coursediscount}% off
                      </div>
                      <div className={`${Styles.price} ml-2`}>
                        R
                        {props.courseprice -
                          (props.coursediscount * props.courseprice) / 100}
                      </div>
                    </div>
                    <div className={Styles.daysleft}>
                      {props.coursediscountexpiry} day left at this price
                    </div>
                  </div>
                  </div>

                )}
              </div>
            ) : (
              <div>
                <p>{props.completedPercentage}% completed</p>
                <ProgressBar now={props.completedPercentage} />
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CourseComponent;
