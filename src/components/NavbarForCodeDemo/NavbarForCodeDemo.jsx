// import { useState, useEffect } from "react";
import styles from "./NavbarForCode.module.css";
// import logo from "assets/img/zaio-logos/zaio-logo-light.png";
import logo from "../../assets/img/zaio-logos/zaio-logo-light.png";
import { NavLink, useNavigate } from "react-router-dom";

export default function NavbarForCodeDemo() {
  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <NavLink to='/' className={styles.triggerName}>
        <div
          style={{
            display: "inline-flex",
          }}
        >
          <img src={logo} height={15} alt=""/>
        </div>
      </NavLink>
      <div className={styles.list}>
        <h4>Enrolled Courses</h4>
        <ul className={styles.content}>
          <li
            className={styles.selected}
            onClick={(e) => {
              navigate.push(`/allcourses`);
            }}
          >
            Getting Started HTML
          </li>
          <li
            className={styles.selected}
            onClick={(e) => {
              navigate.push(`/allcourses`);
            }}
          >
            Getting Started CSS
          </li>
          <li
            className={styles.selected}
            onClick={(e) => {
              navigate.push(`/allcourses`);
            }}
          >
            Getting Started JS
          </li>
        </ul>
      </div>
      <span className={styles.path}>
        <span
          style={{
            backgroundColor: "gray",
            width: "fit-content",
            padding: "0px 5px",
            margin: "5px 5px",
          }}
        >
          {"  /  "}
          <span className={styles.triggerName}>
            <NavLink to={`/allcourses`} style={{ color: "white" }}>
              Zaio
            </NavLink>
          </span>
          <div className={styles.list} style={{ left: "40px" }}>
            <h4>Units</h4>
            <ul className={styles.content}>
              <li
                className={styles.selected}
                onClick={(e) => {
                  navigate.push(`/allcourses`);
                }}
              >
                lorem ipsum delta beta alpha 1
              </li>
              <li
                className={styles.selected}
                onClick={(e) => {
                  navigate.push(`/allcourses`);
                }}
              >
                lorem ipsum delta beta alpha 2
              </li>
              <li
                className={styles.selected}
                onClick={(e) => {
                  navigate.push(`/allcourses`);
                }}
              >
                lorem ipsum delta beta alpha 3
              </li>
            </ul>
          </div>
          {"  /  "}
          <span className={styles.triggerName}>
            <NavLink to={`/allcourses`} style={{ color: "white" }}>
              Interactive Environment
            </NavLink>
          </span>
          <div className={styles.list} style={{ left: "150px" }}>
            <h4>Lectures</h4>
            <ul className={styles.content}>
              <li
                className={styles.selected}
                onClick={(e) => {
                  navigate.push(`/allcourses`);
                }}
              >
                Alpha beta gamma delta 1
              </li>
              <li
                className={styles.selected}
                onClick={(e) => {
                  navigate.push(`/allcourses`);
                }}
              >
                Alpha beta gamma delta 2
              </li>
              <li
                className={styles.selected}
                onClick={(e) => {
                  navigate.push(`/allcourses`);
                }}
              >
                Alpha beta gamma delta 3
              </li>
              <li
                className={styles.selected}
                onClick={(e) => {
                  navigate.push(`/allcourses`);
                }}
              >
                Alpha beta gamma delta 4
              </li>
            </ul>
          </div>

          <span>
            {"  /  "}
            <span className={styles.triggerName}>Demo</span>
          </span>
        </span>
      </span>
    </div>
  );
}
