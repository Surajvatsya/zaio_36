import React, { Component } from "react";
import "./VideoTestimonial.css";
import Play from "../../../src/assets/img/home/play.svg";
import "../../assets/js/script";

export default class VideoTestimonial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLight: false,
      showFade: false,
      showMiddle: false,
      showMiddlefade: false,
      showDark: false,
      showdarkFade: false,
    };
  }

  lightbox_open = () => {
    window.scrollTo(0, 0);
    this.setState({
      showLight: true,
      showFade: true,
    });
  };

  lightbox_close = () => {
    window.scrollTo(0, 0);
    this.setState({
      showLight: false,
      showFade: false,
    });
  };
  lightbox_open1 = () => {
    window.scrollTo(0, 0);
    this.setState({
      showMiddle: true,
      showMiddlefade: true,
    });
  };
  lightbox_close1 = () => {
    window.scrollTo(0, 0);
    this.setState({
      showMiddle: false,
      showMiddlefade: false,
    });
  };
  lightbox_open2 = () => {
    window.scrollTo(0, 0);
    this.setState({
      showDark: true,
      showdarkFade: true,
    });
  };
  lightbox_close2 = () => {
    window.scrollTo(0, 0);
    this.setState({
      showDark: false,
      showdarkFade: false,
    });
  };
  render() {
    const { showLight, showFade } = this.state;
    const { showMiddle, showMiddlefade } = this.state;
    const { showDark, showdarkFade } = this.state;
    return (
      <section className="video-popup-content">

        <div className="container">
        <h1 className="text-left font-weight-bold" style={{paddingBottom: "30px"}}>Hear from real people</h1>

          <div className="row">
            <div className="col-sm-12 col-xs-12 heading_area"></div>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-4 col-xs-12 first">
              <div className="video-popup-image">
                <div className="video-wrapper">
                  <video
                    width="100%"
                    height="100%"
                    autoPlay 
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  >
                    <source
                      src="https://zaiocontent.s3.eu-west-2.amazonaws.com/testimonials/Patrick+Rashidi.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>

                <div
                  id="fade"
                  style={{ display: showFade ? "block" : "none" }}
                  onClick={this.lightbox_close}
                ></div>
                <div className="abc">
                  <a onClick={this.lightbox_open} style={{cursor: "hover"}}>
                    <img src={Play} alt=" " />
                  </a>
                </div>
              </div>
              <div className="video-popup-image-content">
                <h3 className="title">
                Learn coding: An Amazon developers perspective  
                </h3>
                <span className="name">
                Patrick Rashidi, Engineer @ Amazon, Cape Town
                </span>
              </div>
            </div>

            <div className="col-md-4 col-sm-4 col-xs-12 second">
              <div className="video-popup-image">
                <div className="video-wrapper">
                  <video
                    width="100%"
                    height="100%"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  >
                    <source
                      src="https://zaiocontent.s3.eu-west-2.amazonaws.com/testimonials/Shalom+Taiwo+subtitle.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>

                <div
                  id="fade1"
                  style={{ display: showMiddlefade ? "block" : "none" }}
                  onClick={this.lightbox_close1}
                ></div>
                <div className="abc">
                  <a onClick={this.lightbox_open1} style={{cursor: "hover"}}>
                    <img src={Play} />
                  </a>
                </div>
              </div>
              <div className="video-popup-image-content">
                <h3 className="title">
                Journey to a Full Stack Web <br></br>developer
                </h3>
                <span className="name">
                  
                  Shalom Taiwo, Student @ Zaio, Cape Town
                </span>
              </div>
            </div>

            <div className="col-md-4 col-sm-4 col-xs-12 last">
              <div className="video-popup-image">
                <div className="video-wrapper">
                  <video
                    width="100%"
                    height="100%"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  >
                    <source
                      src="https://zaiocontent.s3.eu-west-2.amazonaws.com/testimonials/Sean+Thomson.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div
                  id="fade2"
                  style={{ display: showdarkFade ? "block" : "none" }}
                  onClick={this.lightbox_close2}
                ></div>
                <div className="abc">
                  <a onClick={this.lightbox_open2} style={{cursor: "hover"}}>
                    <img src={Play} />
                  </a>
                </div>
              </div>
              <div className="video-popup-image-content">
                <h3 className="title">
                Infinite possibilities with Web Development
                </h3>
                <span className="name">
                Sean Thompson, Student @ Zaio, Cape Town
                 
                </span>
              </div>
            </div>
          </div>
        </div>
        <div id="light" style={{ display: showLight ? "block" : "none" }}>
          <a
            className="boxclose"
            id="boxclose"
            onClick={this.lightbox_close}
          ></a>
          <video
            id="VisaChipCardVideo"
            width="600"
            controls
            muted
            autoPlay
            loop
            playsInline
          >
            <source
              src="https://zaiocontent.s3.eu-west-2.amazonaws.com/testimonials/Patrick+Rashidi.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div id="middle" style={{ display: showMiddle ? "block" : "none" }}>
          <a
            className="boxclose"
            id="boxclose1"
            onClick={this.lightbox_close1}
          ></a>
          <video
            id="VisaChipCardVideo1"
            width="600"
            autoPlay
            controls
            muted
            loop
            playsInline
          >
            <source
              src="https://zaiocontent.s3.eu-west-2.amazonaws.com/testimonials/Shalom+Taiwo+subtitle.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div id="dark" style={{ display: showDark ? "block" : "none" }}>
          <a
            className="boxclose"
            id="boxclose2"
            onClick={this.lightbox_close2}
          ></a>
          <video
            id="VisaChipCardVideo2"
            width="600"
            autoPlay
            controls
            muted
            loop
            playsInline
          >
            <source
              src="https://zaiocontent.s3.eu-west-2.amazonaws.com/testimonials/Sean+Thomson.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </section>
    );
  }
}
