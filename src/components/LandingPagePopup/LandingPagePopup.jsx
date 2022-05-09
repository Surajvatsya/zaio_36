import Modal from "react-modal";
import React from "react";
import "./LandingPagePopup.css";
import laptop from "assets/svg/men_with_laptop.svg";
import arrow_dn from "assets/svg/arrow_dn_img.svg";

export default function LandingPagePopup(props) {
  
  return (
      <Modal
        isOpen={props.open}
        onRequestClose={props.closeModal}
        contentLabel="Download Syllabus"
        className="modal_design pl-0"
        style={{ overlay: { zIndex: 99 } }}
        ariaHideApp={false}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-0">
            <div className="align-items-center modal-header p-0 border-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="630"
                height="158"
                viewBox="0 0 630 158"
              >
                <defs>
                  <clipPath id="clip-modal_top_rect">
                    <rect width="630" height="158" />
                  </clipPath>
                </defs>
                <g id="modal_top_rect" clipPath="url(#clip-modal_top_rect)">
                  <rect
                    id="Rectangle_249"
                    data-name="Rectangle 249"
                    width="514"
                    height="83"
                    transform="translate(116)"
                    fill="#ffd600"
                  />
                  <rect
                    id="Rectangle_248"
                    data-name="Rectangle 248"
                    width="185"
                    height="79"
                    transform="translate(0 83)"
                    fill="#6e31f9"
                  />
                  <rect
                    id="Rectangle_245"
                    data-name="Rectangle 245"
                    width="504"
                    height="83"
                    fill="#ee78a8"
                  />
                </g>
              </svg>

              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => props.closeModal()}
              >
                <span aria-hidden="true">No Thanks!</span>
              </button>
            </div>
            <div className="modal-body">
              <h2 className="mb-3 mx-auto text-center popuph2">
                {props.title}
              </h2>
              <div className="row">
                <div className="col-md-6 pr-md-0">
                  <img
                    src={laptop}
                    alt="Men With Laptop"
                    className="img-fluid d-md-block d-none"
                  />
                  <img
                    src={arrow_dn}
                    alt="Men With Laptop"
                    className="img-fluid d-md-none d-block mx-auto w-50"
                  />
                </div>
                <div className="col-md-6 d-flex align-items-center justify-content-center pl-md-1">
                  <form className="w-100">
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Your Name"
                        onChange={(e) => props.name(e.target.value) }
                        className="form-control rounded-0 border-0"
                        id="name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        placeholder="Your Email"
                        onChange={(e) => props.email(e.target.value) }
                        className="form-control rounded-0 border-0"
                        aria-describedby="emailHelp"
                      />
                    </div>

                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#modal_2"
                      className="btn btn_theme w-100 border-0 rounded-0"
                      onClick={() => props.submitForm()}
                      aria-label="Close"
                    >
                      Send me the guide!
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
  );
}
