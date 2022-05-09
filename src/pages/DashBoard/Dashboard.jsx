import { useEffect, useState } from "react";
import PageWithOptions from "../../components/Wrappers/PageWithOptions/PageWithOptions";

// import Img from 'assets/img/misc/happy_people.jpg'
import { Form, Row, Col, Button } from "react-bootstrap";

import Styles from "./Dashboard.module.css";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import Modal from "react-modal";
import CourseService from "../../actions/services/course.service";
import VisaMaster from "../../assets/img/misc/visa-master.png";
import Results from "../../components/Results/Results";
import styles from "../../pages/Payment/Payment.module.css";
import learningpathService from "../../actions/services/learningpath.service";
import { useContext } from "react";
import { LoadingContext } from "../../context/LoadingProvider";
import { SavedCards } from "./SavedCards";
import { Certificates } from "./Certificates";
import { Roadmap } from "./Roadmap";
import { Earn } from "./Earn";
import "react-toastify/dist/ReactToastify.css";
import SingleLearningPath from "../../pages/DashBoard/SingleLearningPath";

function Dashboard(props) {
  let redUrl;
  if (process.env.REACT_APP_MODE === "sandbox") {
    redUrl = `${process.env.REACT_APP_BACKEND_URL}/payment`;
  } else {
    redUrl = "https://www.zaio.io/payment";
  }

  const [lp, setLp] = useState([]);
  const [confirmPaymentOpen, setConfirmPaymentOpen] = useState(false);
  const [instalmentPaymentOpen, setInstalmentPaymentOpen] = useState(false);
  const { setLoading } = useContext(LoadingContext);
  useEffect(() => {
    const funct = async () => {
      const res = await learningpathService.getLearningPaths();
      console.log(res);
      setLp(res.data);
    };
    funct();
    // if ( props.location.state && props.location.state.prevPath == "/getstarted") {
    //   return notify
    // }
  }, []);
  const closeModal = () => {
    setConfirmPaymentOpen(false);
  };
  const [data, setData] = useState({
    installmentAmount: "",
    paymentBrand: "visa",
    couponcode: "",
    cardNumber: "4111111111111111",
    cardHolder: "Raj rones",
    expiryMonth: "11",
    expiryYear: "2035",
    cvv: "123",
    coupondiscountadded: null,
    name: "",
    courseid: "",
    valid:false,
    paid:"",
    total:"",
    intrest:""
  });

  // const setValue = (key, value) => {
  //   setData({ ...data, [key]: value });
  // };
  console.log(data,"lpdata");
  const ConfirmPayment = (data) => {
    if (data.isPayment === true) {
      setConfirmPaymentOpen(true);
       let id=data.id;
      lp.map((item)=>{
        if(item._id===id){
          setData({installmentAmount:item.installments.amount,valid:item.installments.valid,paid:item.installments.paid,total:item.installments.total,intrest:item.installments.intrest});
        }
      });
    }
  };
  const setValue = (key, value) => {
    setData({ ...data, [key]: value });
  };
  const installBtnClicked =()=>{  
  // let cardNumber=data.cardNumber;
  }
  return (
    <>
      {/* <div className={"container "+Styles.wb}>Wecome back, <span className={Styles.username}>{props.userData.data.username}</span></div> */}
      <PageWithOptions>
        <Modal
          isOpen={confirmPaymentOpen}
          onRequestClose={closeModal}
          contentLabel="Installment Payment"
          className="modal_design pl-0 "
          style={{ overlay: { zIndex: 99 } }}
          ariaHideApp={false}
        >
          <div>
            <div className="row">
              <div className="col-md-12">
                <div className={Styles.confirmModal}>
                  You haven't paid your installments?
                </div>
                <div className={Styles.modal_button_row}>
                  <button
                    className={Styles.modal_pay_button}
                    onClick={() => {
                      setConfirmPaymentOpen(false);
                      setInstalmentPaymentOpen(true);
                    }}
                  >
                    Pay Now!
                  </button>
                  <button
                    className={Styles.modal_cancle_button}
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={instalmentPaymentOpen}
          onRequestClose={closeModal}
          contentLabel="Installment Payment"
          className="modal_design pl-0 "
          style={{ overlay: { zIndex: 99 } }}
          ariaHideApp={false}
        >
          <div>
            <div className={Styles.text_align_center}>Pay Installment</div>
            <div className="row">
              <div className="col-md-6">
                <Form className={"p-4 mt-4 ml-4 " + styles.formp1}>
                  <div className="h5">
                    Pay with Debit/Credit card{" "}
                    <img src={VisaMaster} alt=" Visa Master" />
                  </div>
                  <Form.Group>
                    <Form.Label className={styles.form_label}>
                      Name on card
                    </Form.Label>
                    <Form.Control
                      className={styles.input_field}
                      type="text"
                      placeholder="Enter Name"
                      value={data.cardHolder}
                      onChange={(e) => setValue("cardHolder", e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className={styles.form_label}>
                      Card Number
                    </Form.Label>
                    <Form.Control
                      className={styles.input_field}
                      type="number"
                      placeholder="Enter Number"
                      value={data.cardNumber}
                      onChange={(e) => setValue("cardNumber", e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className={styles.form_label}>
                      Card Type
                    </Form.Label>
                    <Form.Control
                      className={styles.input_field}
                      as="select"
                      value={data.paymentBrand}
                      onChange={(e) => setValue("paymentBrand", e.target.value)}
                    >
                      <option value="visa">VISA</option>
                      <option value="mastercard">MASTERCARD</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className={styles.form_label}>
                      Expiry Date
                    </Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          className={styles.input_field}
                          type="number"
                          placeholder="03 - Expiry Month"
                          value={data.expiryMonth}
                          // disabled={data.freecourse}
                          onChange={(e) => setValue("expiryMonth", e.target.value)}
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          className={styles.input_field}
                          type="number"
                          placeholder="2021 - Expiry Year"
                          value={data.expiryYear}
                          // disabled={data.freecourse}
                          onChange={(e) => setValue("expiryYear", e.target.value)}
                        />
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group className="w-25">
                    <Form.Label className={styles.form_label}>CVV</Form.Label>
                    <Form.Control
                      className={styles.input_field}
                      type="password"
                      placeholder="CVV"
                      value={data.cvv}
                      // disabled={false || data.freecourse}
                      onChange={(e) => setValue("cvv", e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </div>
              <div className="col-md-6 pt-4">
                <div className="d-flex justify-content-between h5 mt-4">
                  <div>Installment Payment</div>
                  <div>R {data.installmentAmount}</div>
                </div>
                <div className="d-flex justify-content-between h5 mt-4">
                  <div>Grand Total</div>
                  <div>R  {data.installmentAmount}</div>
                </div>
                <Button variant="primary" className={Styles.width_100} onClick={installBtnClicked}>
                  Pay now
                </Button>
                {/* <SavedCards clickForPayment /> */}
              </div>
            </div>
          </div>
        </Modal>
        <div style={{ height: "100%" }}>
          <div className={Styles.options}>
            <NavLink
              exact
              to="/dashboard"
              className={`${Styles.item}`}
              activeClassName={Styles.active_item}
            >
              Dashboard
            </NavLink>
            <NavLink
              exact
              to="/dashboard/settings"
              className={`${Styles.item}`}
              activeClassName={Styles.active_item}
            >
              Settings
            </NavLink>
            <NavLink
              exact
              to="/dashboard/certificates"
              className={`${Styles.item}`}
              activeClassName={Styles.active_item}
            >
              Certificates
            </NavLink>
            {/* <NavLink
              exact
              to='/dashboard/roadmap'
              className={`${Styles.item}`}
              activeClassName={Styles.active_item}
            >
              Roadmap
            </NavLink> */}
            <NavLink
              exact
              to="/dashboard/earn"
              className={`${Styles.item}`}
              activeClassName={Styles.active_item}
            >
              Earn💰 🆕🌟
            </NavLink>
          </div>
        </div>
        <Routes>
          <Route exact path="/dashboard">
            <div className={"container-fluid " + Styles.dashboard_main}>
              {lp.length !== 0 ? (
                <div className="row mt-5">
                  <p className={Styles.heading + " ml-2 mb-4"}>
                    Continue your learning path
                  </p>
                  <div className="col-12 d-flex" style={{ flexWrap: "wrap" }}>
                    {lp.map((lp) => {
                      if (!lp.isBlock) {
                        const lpr = lp.learningpathid;
                        return (
                          <Link
                            to={"/dashboard/learningPath/" + lpr._id}
                            className="m-2"
                          >
                            <div className={" " + Styles.learningpath}>
                              {lpr.learningpathname}
                            </div>
                          </Link>
                        );
                      }
                      const lpr = lp.learningpathid;
                      const id=lp._id;
                      return (
                        <button
                          // to={"/learning-Path/" + lpr.learningpathsslug}
                          style={{ border: "none" }}
                          onClick={() => {
                            ConfirmPayment({ isPayment: true, id: id});
                          }}
                          className="m-2"
                        >
                          <div className={" " + Styles.learningpath}>
                            <i className="fa fa-lock" aria-hidden="true"></i>
                            {"  "}
                            {lpr.learningpathname}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              <p className={Styles.heading + " "}>
                Continue your enrolled courses
              </p>
              <Results
                service={() => CourseService.getCourses()}
                redirect="view"
                setLoading={setLoading}
              />
            </div>
          </Route>
          <Route exact path="/dashboard/settings">
            <SavedCards />
          </Route>
          <Route exact path="/dashboard/certificates">
            <Certificates />
          </Route>
          <Route exact path="/dashboard/roadmap">
            <Roadmap />
          </Route>
          <Route exact path="/dashboard/earn">
            <Earn />
          </Route>
          <Route exact path="/dashboard/learningPath/:id">
            <SingleLearningPath />
          </Route>
        </Routes>
      </PageWithOptions>
    </>
  );
}

export default Dashboard;
