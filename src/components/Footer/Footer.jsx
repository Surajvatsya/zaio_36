import React, { Component } from "react";
import zlogo from "../../assets/img/zaio-logos/zaio-logo.png";
import {Link} from 'react-router-dom';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="footer container">
          <div className="row footer-top">
            <div className="col footer-content ">
              <div className="row">
                <div className="col-sm-3">
                  <img className="footer-logo mb-3" src={zlogo} alt=""></img>
                  <p>
                    Talent driving the transformation of our digital society
                  </p>
                  <p>📍 9 Lower Burg St, Cape Town City Centre, South Africa, 8000</p>
                </div>

                <div className=" col-sm-3 footer-column ">
                  <strong>Learn</strong>
                  <div className="d-flex flex-column mt-3">
                    <Link to="/getstarted" className="text-light">Frontend Development</Link>
                    <Link to="/getstarted" className="text-light">Python</Link>
                    <Link to="/getstarted" className="text-light">Web Development</Link>
                    <Link to="/getstarted" className="text-light">Full Stack</Link>
                  </div>
                </div>
                <div className="col-sm-3 footer-column ">
                  <strong>Legals</strong>
                  <div className="d-flex flex-column mt-3">
                    <Link to='/terms' className="text-light">Terms & Conditions</Link>
                    <Link to="/privacypolicy" className="text-light">Privacy Policy</Link>
                    <Link to="/refundpolicy" className="text-light">Refund Policy</Link>
                  </div>
                </div>
                
                <div className="col-sm-3 footer-column ">
                  <strong>About</strong>
                  <div className="d-flex flex-column mt-3">
                    <Link to="/about" className="text-light">About Us</Link>
                    <Link to="/blog" className="text-light">Blog</Link>
                    <Link to="/" className="text-light">Careers</Link>
                    <a className="text-light" href="mailto:hello@zaio.io">Contact Us</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>Copyright 2021 Zaio Technology. All rights reserved.</p>
            </div>
            <div className="footer-socials">
              <a href="https://www.linkedin.com/company/zaioio"><i className="fab fa-linkedin  text-light ml-3"></i></a>
              <a href="https://www.facebook.com/zaionite"><i className="fab fa-facebook text-light ml-3 "></i></a>
              <a href="https://www.instagram.com/zaio.io"><i className="fab fa-instagram  text-light ml-3"></i></a>
              <a href="https://twitter.com/zaionites"><i className="fab fa-twitter  text-light ml-3"></i></a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
