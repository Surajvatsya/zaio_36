import React, { Component } from "react";
import dumbbell from "assets/img/home/dumbbell.png"
import bulb from "assets/img/home/light-bulb.png"
import award from "assets/img/home/badge.png"
import money from "assets/img/home/dollar.png"
export default class Methodology extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xl-3 mt-auto mb-auto"> 
          <h5>Your time and money are your most valuable assets. Spend it wisely by using a proven method that got 1000+ people trained & employed. We call it the</h5>
          <h2 className="font-weight-bold">Secure your career methodology</h2>
          </div>
          <div className="methodology-wrapper col-xl-9 d-flex flex-wrap">
            <div className="methodology-box learn d-flex">
              <div className="methodology-text">
                <h1>Learn</h1>
                <p>
                with an interactive environment & 1-1 on demand tutor support
                </p>
              </div>
              <div className="mt-auto mb-auto"><img className="bulb" src={bulb} width={96} height={96} alt=""></img></div>
            </div>
            <div className="methodology-box practise d-flex">
            <div className="mt-auto mb-auto"><img className="dumbbell" src={dumbbell} width={96} height={96} alt=""></img></div>
              <div className="methodology-text">
                <h1>Practise</h1>
                <p>
                by building real world projects like Netflix, Google Keep, YouTube & More.
                </p>
              </div>
            </div>
            <div className="methodology-box d-flex ">
              <div className="methodology-text">
                <h1>Monetize</h1>
                <p>
                your newly gained skills through jobs or freelance positions with full confidence.
                </p>
              </div>
              <div className="mt-auto mb-auto"><img className="money" src={money} width={96} height={96} alt=""></img></div>
            </div>
            <div className="methodology-box d-flex">
            <div className="mt-auto mb-auto"><img className="award" src={award} width={96} height={96} alt=""></img></div>
              <div className="methodology-text">
                <h1>Get Certified</h1>
                <p>
                by completing our 1-1 Interview Based Test/MCQs (no extra prep needed, only course needs to be completed)
                </p>
              </div>
            </div>

            <svg width={362} viewBox="0 0 358 357" className="loop">
              <g
                fill="none"
                fill-rule="evenodd"
                stroke-width="7.442"
                transform="translate(3 3)"
              >
                <ellipse
                  cx="175.735"
                  cy="175.416"
                  rx="162.127"
                  ry="161.595"
                  stroke="#fff"
                ></ellipse>
                <path
                  d="M164.572 0l13.82 13.82-13.82 13.821"
                  stroke="#fff"
                ></path>
                <path
                  d="M153.94 0l13.821 13.82-13.82 13.821"
                  stroke="#000821"
                ></path>
                <path
                  d="M0 179.03l13.82-13.82 13.821 13.82"
                  stroke="#fff"
                ></path>
                <path
                  d="M0 189.662l13.82-13.821 13.821 13.82"
                  stroke="#000821"
                ></path>
                <path
                  d="M352.107 167.123l-13.82 13.82-13.821-13.82"
                  stroke="#fff"
                ></path>
                <path
                  d="M352.107 156.492l-13.82 13.82-13.821-13.82"
                  stroke="#000821"
                ></path>
                <path
                  d="M178.392 350.831l-13.82-13.82 13.82-13.821"
                  stroke="#fff"
                ></path>
                <path
                  d="M189.024 350.831l-13.821-13.82 13.82-13.821"
                  stroke="#000821"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}
