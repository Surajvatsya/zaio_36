import Modal from "react-modal";
import React from "react";
import "./LandingPagePopup.css";
import programming from "assets/svg/Programming-amico.svg";
import send_icon from "assets/img/landingpage/send_icon.png";
import { withRouter } from "react-router-dom";

function ThanksPopup(props) {
  
  return (
      <Modal
        isOpen={props.open}
        onRequestClose={props.closeModal}
        contentLabel="Download Syllabus"
        className="modal_design pl-0"
        style={{ overlay: { zIndex: 99 } }}
        ariaHideApp={false}
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 rounded-0">
            <div class="align-items-center modal-header p-0 border-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="630" height="158" viewBox="0 0 630 158">
                    <defs>
                      <clipPath id="clip-modal_top_rect">
                        <rect width="630" height="158"/>
                      </clipPath>
                    </defs>
                    <g id="modal_top_rect" clip-path="url(#clip-modal_top_rect)">
                      <rect id="Rectangle_249" data-name="Rectangle 249" width="514" height="83" transform="translate(116)" fill="#ffd600"/>
                      <rect id="Rectangle_248" data-name="Rectangle 248" width="185" height="79" transform="translate(0 83)" fill="#6e31f9"/>
                      <rect id="Rectangle_245" data-name="Rectangle 245" width="504" height="83" fill="#ee78a8"/>
                    </g>
                  </svg>
            </div>
            <div class="modal-body text-center">
                <img src={send_icon} alt="Send Icon" class="img-fluid send_icon"/>
                <h4>Your guide is on the way to you! Check your email in the next minute. In the meantime, checkout the recommend path for you:</h4>
                <div class="border border-dark mt-4 mx-auto pt-4 pl-4 pr-4 pb-0 row w-md-70 thankscourse" onClick={() => props.history.push("/learning-path/fullstack")}>
                    <div class="col-md-8 d-flex align-items-center justify-content-start ">
                        <div class="text-left">
                        <span>Career Path</span>
                        <h3><b>Fullstack developer</b></h3>
                        <div class="courses d-flex align-items-center flex-wrap">
                            <span></span><span class="mr-2"></span> Beginner friendly, <b class="mr-1">19 </b>course
                        </div>
                        </div>
                    </div>
                    <div class="col-md-4 d-flex align-items-center justify-content-center">
                        <img src={programming} alt="Programming-amico" class="img-fluid"/>
                    </div>
                </div>
                <div class="modal-header justify-content-center border-0">
                    <button onClick={() => props.closeModal()} type="button" class="close text-center" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">No Thanks!</span>
                    </button>
                </div>
            </div>
          </div>
        </div>
      </Modal>
  );
}

export default withRouter(ThanksPopup)
