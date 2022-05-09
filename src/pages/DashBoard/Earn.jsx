import { useEffect, useState } from "react";
import Styles from "./Dashboard.module.css";
import "./Roadmap.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share";
import AuthService from "../../actions/services/auth.service";
import { BiCopy } from "react-icons/bi";


interface Props {
  clickForPayment?: boolean;
}

export const Earn = (props: Props) => {
  const notify = () => toast(`'${state.coupon}' copied to clipboard`);
  const [state, setState] = useState({
    coupon: "",
    total: "",
    unpaid: "",
  });
  function copyToClipboard(e) {
    navigator.clipboard.writeText(state.coupon);
    notify();
  }

  useEffect(() => {
    AuthService.getUserEarningDetails()
      .then((response) => {
        console.log(response.data);
        setState({
          ...state,
          coupon: response.data.coupon,
          total: response.data.total,
          unpaid: response.data.unpaid,
        });
      })
      .catch((reject) => console.log(reject));
  }, []);

  return (
    <div className={"container-fluid " + Styles.dashboard_settings}>
      <ToastContainer />
      <div className="header">
        <p className={Styles.heading + " title"}>My Earnings</p>
      </div>

      <div className="coupon-container">
        <div className="card coupon-code">
          <div
            className="card-body d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "#d3bcfe" }}
          >
            <h5>
              Earn R150 by sharing your coupon code{" "}
              <mark
                className="copy-code text-primary"
                onClick={copyToClipboard}
              >
                {state.coupon+" " || "LOADING..."} <BiCopy />
              </mark>
            </h5>
          </div>
        </div>
        <div className="card share-coupon">
          <div className="card-body">
            <p>
              Let's make coding mainstream{" "}
              <mark className="text-primary">#AnyBodyCanDev</mark>{" "}
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <WhatsappShareButton
                url="https://www.zaio.io/learning-path/fullstack"
                title={`Use coupon code '${state.coupon}' by clicking on enrol on this link to get a 80% discount on the entire fullstack learning path.`}
                className="p-1"
              >
                <WhatsappIcon size={32} round={true} />
              </WhatsappShareButton>

              <FacebookShareButton
                url="https://www.zaio.io/learning-path/fullstack"
                quote={`Use coupon code '${state.coupon}' by clicking on enrol on this link to get a 80% discount on the entire fullstack learning path.`}
                className="p-1"
              >
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>

              <TwitterShareButton
                url="https://www.zaio.io/learning-path/fullstack"
                title={`Use coupon code '${state.coupon}' by clicking on enrol on this link to get a 80% discount on the entire fullstack learning path.`}
                className="p-1"
              >
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>

              <LinkedinShareButton
                url="https://www.zaio.io/learning-path/fullstack"
                title={`Use coupon code '${state.coupon}' by clicking on enrol on this link to get a 80% discount on the entire fullstack learning path.`}
                className="p-1"
              >
                <LinkedinIcon size={32} round={true} />
              </LinkedinShareButton>
            </div>
          </div>
        </div>
      </div>

      <div className="earnings-container">
        <div className="card my-earnings">
          <div className="card-body">
            <h5>Total Earned</h5>
            <h1>R {state.total || 0}</h1>
          </div>
        </div>
        <div className="card owed-to-me">
          <div className="card-body">
            <h5>Owed to Me</h5>
            <h1>R {state.unpaid || 0}</h1>
            <small>
              <em>Will reflect between 25th-30th of this month</em>
            </small>
          </div>
        </div>
      </div>

      <div className="card explanation">
        <div className="card-body">
          <h5>How it Works</h5>
          <p>
            You have been selected to be an affiliate for Zaio to help you earn
            an income, and become part of our mission to make coding mainstream
            as we are currently in the fourth industrial revolution.
            #AnyBodyCanDev #DontGetLeftBehind. Below is an explanation of how
            this works.
          </p>
          <p>
            <mark className="text-primary">
              <b>You earn R150</b> per referral & your{" "}
              <b>referral gets an 80% discount</b> (only on learning paths, not
              individual courses)
            </mark>
          </p>
          <ol className="explanation-list">
            <li>
              Use your personal coupon code{" "}
              <mark
                className="copy-code text-primary"
                onClick={copyToClipboard}
              >
                <b>'{state.coupon} <BiCopy />'</b>
              </mark>{" "}
              and share it with your network. <b>You earn R150</b> per referral
              & your <b>referral gets an 80% discount</b>.{" "}
            </li>
            <li>
              Your referral then can use your coupon code upon payment to get a
              massive discount!{" "}
            </li>
            <li>
              If you manage to refer anyone, someone from our team will reach
              out to you to collect your bank details most likely between
              25th-30th of the month.
            </li>
            <li>
              You will receive payments every month between 25th-30th for anyone
              you manage to refer.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
