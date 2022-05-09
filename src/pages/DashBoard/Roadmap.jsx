import { useEffect, useState } from "react";
import Styles from "./Dashboard.module.css";
import "./Roadmap.css";

interface Props {
  clickForPayment?: boolean;
}

export const Roadmap = (props: Props) => {
  const [leftOffset, setLeftOffset] = useState(0);
  const [topOffset, setTopOffset] = useState(0);
  const [lineHeightOffset, setLineHeightOffset] = useState(0);
  useEffect(() => {
    var roadmapContainer = document
      .getElementById("roadmap-container")
      .getBoundingClientRect();
    var numberContainer = document
      .getElementById("number")
      .getBoundingClientRect();
    var finalNumber = document
      .getElementById("final-number")
      .getBoundingClientRect();
    const boxLength = (numberContainer.right - numberContainer.left) / 2;
    setLeftOffset(numberContainer.left - roadmapContainer.left + boxLength);
    setTopOffset(numberContainer.top - roadmapContainer.top);
    setLineHeightOffset(finalNumber.top - numberContainer.top);
  }, []);

  return (
    <div className={"container-fluid " + Styles.dashboard_settings}>
      <div className="header">
        <p className={Styles.heading + " title"}>Roadmap to my goal</p>
        <div className={Styles.paceContainer}>
          <div className="form-group">
            <select
              className={`form-control ${Styles.formGroup}`}
              //   value={state.heardfrom}
              //   onChange={(e) => onChangeState(e, "heardfrom")}
            >
              <option selected value="select">
                Select Pace
              </option>
              <option value="1">1 hours/day (7 hours/week)</option>
              <option value="2">2 hours/day (14 hours/week)</option>
              <option value="4">4 hours/day (21 hours/week)</option>
            </select>
          </div>
        </div>
      </div>
      <div id="roadmap-container" className="roadmap-container">
        <div
          className="line"
          style={{ left: leftOffset, top: topOffset, height: lineHeightOffset }}
        ></div>
        <div className="roadmap-group">
          <div
            id="number"
            className="number"
            style={{ backgroundColor: "#a3dcfc" }}
          >
            01
          </div>
          <div className="roadmap-box" style={{ backgroundColor: "#a3dcfc" }}>
            <h3>When I started</h3>
            <p>
              Joined Zaio on <mark>28/08/2021</mark>
            </p>
            <p>
              Enrolled in <mark>Full Stack</mark> path on{" "}
              <mark>28/08/2021</mark>
            </p>
          </div>
        </div>

        <div className="roadmap-group">
          <div className="number" style={{ backgroundColor: "#d3bcfe" }}>
            02
          </div>
          <div className="roadmap-box" style={{ backgroundColor: "#d3bcfe" }}>
            {/* <div className="duration"><small>6 Months</small></div> */}
            <div className="badge bg-primary text-wrap duration">
              6 Months
            </div>
            <h3>Learning & Zaio Certifications</h3>
            <p>
              Research on what you are really interested in. Are you more of a
              designer or problem solver? You can book a consultation with a
              Zaio expert for free and figure out what path you should be taking
            </p>
          </div>
        </div>

        <div className="roadmap-group">
          <div className="number" style={{ backgroundColor: "#a3dcfc" }}>
            01
          </div>
          <div className="roadmap-box" style={{ backgroundColor: "#a3dcfc" }}>
            <h1>Research</h1>
            <p>
              Research on what you are really interested in. Are you more of a
              designer or problem solver? You can book a consultation with a
              Zaio expert for free and figure out what path you should be taking
            </p>
          </div>
        </div>
        <div className="roadmap-group">
          <div
            id="final-number"
            className="number"
            style={{ backgroundColor: "#a3dcfc" }}
          >
            01
          </div>
          <div className="roadmap-box" style={{ backgroundColor: "#a3dcfc" }}>
            <h1>Research</h1>
            <p>
              Research on what you are really interested in. Are you more of a
              designer or problem solver? You can book a consultation with a
              Zaio expert for free and figure out what path you should be taking
            </p>
          </div>
        </div>
      </div>

      {/* <div className={Styles.dottedLineMedium}></div>
      <div className={Styles.paceContainer}>
        <p className={Styles.heading3}>Signed up with Zaio on 28/08/2021</p>
      </div>
      <div className={Styles.dottedLineShort}></div>
      <div className={Styles.paceContainer}>
        <p className={Styles.heading3}>
          Enrolled in Fullstack career path on 02/09/2021
        </p>
      </div>
      <div className={Styles.dottedLineLong}></div>
      <div id="accordion">
        <div class="card" style={{ margin: "8px 0", color: "#0d1e3a" }}>
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button
                class="btn btn-link text-center"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Collapsible Group Item #1
              </button>
            </h5>
          </div>

          <div
            id="collapseOne"
            class="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div class="card-body">
              HTML
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};
