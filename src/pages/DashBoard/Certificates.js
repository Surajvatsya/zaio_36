import courseService from "../../actions/services/course.service";
import { LoadingContext } from "../../context/LoadingProvider";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import Styles from "./Dashboard.module.css";

export const Certificates = (props) => {
  const { setLoading } = useContext(LoadingContext);
  const [certificates, setCertificates] = useState({
    certificateurl: "",
    courseid: "",
    coursename: "",
    dateIssued: "",
    _id: "",
  });
  console.log({ certificates });
  useEffect(() => {
    setLoading(true);
    courseService
      .getCertificates()
      .then((res) => {
        if (res.success) {
          setCertificates(res.data.certificates);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  const download = (e) => {
    e.stopPropagation();
    console.log(e.target.href);
    fetch(e.target.href, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={"container-fluid " + Styles.dashboard_settings}>
      <p className={Styles.heading2 + " "}>Certificates</p>
      <div className="d-flex " style={{ flexWrap: "wrap" }}>
        {certificates.map((card) => {
          const date = new Date(card.dateIssued);
          return (
            <a
              className="card p-3 d-flex justify-content-between w-100"
              href={card.certificateurl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <p className="h5 mb-4 font-weight-bold">
                {card.coursename}
                <Button variant="success" onClick={download} className="ml-2">
                  Download
                </Button>
              </p>
              <p className="h6">{date.toUTCString()}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
};
