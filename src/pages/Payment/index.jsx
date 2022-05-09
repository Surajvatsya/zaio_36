import { Form, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";

import paymentService from "../../actions/services/payment.service";
import { useNavigate } from "react-router-dom";
import styles from "./Payment.module.css";
import VisaMaster from "../../assets/img/misc/visa-master.png";
import { LoadingContext } from "../../context/LoadingProvider";
import { PaymentDetailsContext } from "../../context/PaymentDetailsProvider";
import { UserContext } from "../../context/UserProvider";
import { SavedCards } from "../../pages/DashBoard/SavedCards";

function Payment(props) {
  const navigate = useNavigate();
  const queries = new URLSearchParams(navigate.location.search);
  const { setLoading } = useContext(LoadingContext);
  const { details, setCouponCode, setInstallments, setAddOn } = useContext(PaymentDetailsContext);
  const { user } = useContext(UserContext);

  let redUrl;
  if (process.env.REACT_APP_MODE === "sandbox") {
    redUrl = `${process.env.REACT_APP_BACKEND_URL}/payment`;
  } else {
    redUrl = "https://zaio.io/payment";
  }
  const [data, setData] = useState({
    discount: 0,
    amount: "",
    paymentBrand: "visa",
    redirectUrl: redUrl,
    couponcode: queries.get("coupon") ? queries.get("coupon") : "",
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "", 
    cvv: "",
    coupondiscountadded: null,
    name: "",
    courseid: "",
    freecourse: false,
    showInstallments: false,
    showChoose: false,
    option: null,
    isInstallments: false,
    showCards: true,
    isMentored: false,
    isInterned: false,
    showAddons: false
  });

  const [response, setResponse] = useState(null);
  useEffect(() => {
    setLoading(true);

    console.log({ details });
    console.log("user", user);
    
    const funct = async () => {
      if (queries.get("id")) {
        console.log("checking Payment");
        setLoading(true);
        const res = await paymentService.checkPaymentStatus();
        console.log("done checking", res);
        if (res.success) {
          props.setUpdateUser(true);
         navigate("/dashboard");
          setLoading(false);
        } else {
          alert("Payment Failed");
        }
      } else {
       navigate("/allcourses");
      }
    };
    if (details) {
      if (details && details.case === "course") {
        setData({
          ...data,
          courseid: details.id,
          name: details.name,
          amount: details.price,
          iscourse: true,
          discount: details.discount,
        });
       
        setLoading(false);
      } else if (details && details.case === "learning-path") {
        setData({
          ...data,
          learningpathid: details.id,
          courseid: details.id,
          name: details.name,
          amount: details.price,
          iscourse: false,
          discount: details.discount,
          showAddons: false
        });
        setLoading(false);
      } else {
       navigate("/allcourses");
      }
    } else {
      funct();
    }
    if (queries.get("id")) {
      onCouponSubmit()
    }
    
  }, []);

  const setAddOnItem = (addon) => {
    let isInterned = data.isInterned;
    let isMentored = data.isMentored;

    if (addon === "intern") {
      isInterned = !data.isInterned;
      setData({
        ...data,
        isInterned: !data.isInterned,
        showInstallments: false,
        installments: false,
        option: null
      })
    } else {
      isMentored = !data.isMentored;
      setData({
        ...data,
        isMentored: !data.isMentored,
        showInstallments: false,
        installments: false,
        option: null
      })
    }
    setAddOn({
      internship: isInterned,
      mentorship: isMentored
    })
    console.log(isInterned, isMentored);
  }
  const chooseOption = (opt) => {
    setData({ ...data, option: opt, showChoose: true });
  };

  const setValue = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const payUsingInstBtn = () => {
    setData({
      ...data,
      showCards: true
    });
    setInstallments({
      valid: true,
      total: data.option,
      interest: data.option === 2 ? 4 : 6
    });
  }

  const onCouponSubmit = async () => {
      setLoading(true); 
      console.log("course id" + data.courseid);
      const res = await paymentService.verifyCoupon({
        couponcode: data.couponcode,
        courseid: data.courseid,
      });
      setLoading(false);
      if (res.success) {
        setCouponCode(data.couponcode);
        setData({
          ...data,
          discount: 0 + res.data.discount,
          coupondiscountadded: true,
          freecourse: res.data.discount === "100" ? true : false,
          showInstallments: false,
          option: null
        });
      } else {
        setData({
          ...data,
          coupondiscountadded: false,
          showInstallments: false,
          option: null
        });
      }
    
  }

  const onSubmit = async (e, installments = false) => {
    e.preventDefault();
    let params = { ...data };
    setLoading(true);
    if (params.freecourse === true) {
      try {
        const res = await paymentService.enrollFreeCourse({
          couponcode: params.couponcode,
          courseid: params.courseid,
        });
        console.log("yoyo", res);
        if (res.error) {
          alert(res.error);
        } else {
         navigate("/dashboard");
          setResponse(res);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    } else {
      if (
        params.cardNumber !== "" &&
        params.cardHolder !== "" &&
        params.cvv !== "" &&
        params.expiryMonth !== "" &&
        params.expiryYear !== ""
      ) {
        try {
          if (installments) {
            params.isInstallments = true;
          }
          const res = await paymentService.makePayment(params);
          console.log("yoyo", res);
          if (res.error) {
            alert(res.error);
          } else {
            setResponse(res);
          }
        } catch (err) {
          console.log(err);
        }
      }
      setLoading(false);
    }
  };
  const installBtnClicked = () => {
    if (data.showInstallments) {
      setInstallments({
        valid: false,
        total: 0,
        interest: 0
      })
    }
    setData({
      ...data,
      showInstallments: !data.showInstallments,
      showChoose: false,
      showCards: data.showInstallments,
      option: null,
    });
  };

  const getTotal = () => {
    let total = data.amount - (data.discount * data.amount) / 100;
    if (data.isInterned) {
      total = total + 600;
    }
    if (data.isMentored) {
      total = total + 500;
    }
    return total
  }

  const ButtonArea = () => {

    if (data.freecourse) {
      return (
        <Button variant="primary" style={{ width: "100%" }} onClick={onSubmit}>
          Enroll Now
        </Button>
      );
    } else {
      // let price = (getTotal() - (data.discount * getTotal()) / 100);
      let price = getTotal();
      let two_single_month = Math.ceil(price / 2 + price * 4 / 100);
      let four_single_month = Math.ceil(price / 4 + price * 6 / 100);
      return (
        <div>
          <Button
            variant="primary"
            style={{ width: "100%" }}
            onClick={onSubmit}
            disabled={((data.amount - (data.discount * data.amount) / 100) >= 0) ? false : true}
          >
            {data.freecourse ? "Enroll Now" : "Pay & Enroll"}
          </Button>
          <p className="text-center p-1 mb-0">Or</p>
          <Button
            variant="secondary"
            style={{ width: "100%" }}
            onClick={installBtnClicked}
            className="position-relative"
            disabled={data.freecourse}
          >
            <input type="checkbox" onChange={installBtnClicked} checked={data.showInstallments} className="install_check" />
            Pay in Installements
          </Button>
          {data.showInstallments && (
            <div className="installments_box">
              <div className="installments m-3">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <input
                        type="radio"
                        id="two_months"
                        checked={data.option === 2}
                        onChange={() => chooseOption(2)}
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label
                      htmlFor="two_months"
                      onClick={() => chooseOption(2)}
                      className="installment_text"
                    >
                      <strong>
                        R{two_single_month}/month for 2 months
                      </strong>
                    </label>
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <input
                        type="radio"
                        id="four_months"
                        checked={data.option === 4}
                        onChange={() => chooseOption(4)}
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label
                      htmlFor="four_months"
                      onClick={() => chooseOption(4)}
                      className="installment_text"
                    >
                      <strong>
                        R{four_single_month}/month for 4 months
                      </strong>
                    </label>
                  </div>
                </div>
                {data.showChoose && (
                  <p className="text-center mt-2">
                    <Button variant="primary" onClick={(e) => onSubmit(e, true)}>
                      Pay now
                    </Button>
                    <Button variant="secondary" className="ml-2" onClick={payUsingInstBtn}>
                      Pay using existing card
                    </Button>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className={"p-5 container " + styles.main}>
      {response && response.html ? (
        <>
          <Form>
            <Form.Group>
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                className={styles.input_field}
                type="text"
                value={data.cardNumber}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Card Holder Name</Form.Label>
              <Form.Control
                className={styles.input_field}
                type="text"
                value={data.cardHolder}
                disabled
              />
            </Form.Group>
            {
              //<p className="text-light bg-success p-3"> {response.message}</p>
            }
            {/* <Form.Group>
                    <Form.Label>Discount (%)</Form.Label>
                    <Form.Control
                        className={styles.input_field} 
                        type="text" 
                        value={response.discount}
                        disabled/>
            </Form.Group> */}
            <Form.Group>
              <Form.Label>Amount to be Paid</Form.Label>
              <Form.Control
                className={styles.input_field}
                type="text"
                value={response.finalAmount + " ZAR"}
                disabled
              />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div dangerouslySetInnerHTML={{ __html: response.html }} />
              <div
                className="btn btn-danger ml-5 btn-sm w-25"
                onClick={(e) =>navigate("/dashboard")}
              >
                Cancel
              </div>
            </div>
          </Form>
        </>
      ) : (
        <div>
          <div className="h3">Payment</div>
          <div>Select payment method</div>
          <div className="row">
            <Form className={"p-4 col-12 col-md-6 mt-4 " + styles.formp1}>
              <div className="h5">
                Pay with Debit/Credit card{" "}
                <img src={VisaMaster} alt=" Visa Master" />
              </div>
              {/*  */}
              {/* <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        className={styles.input_field} 
                        type="text" 
                        value={data.amount+".00 ZAR"}
                        disabled/>
                </Form.Group> */}

              <Form.Group>
                <Form.Label className={styles.form_label}>
                  Name on card
                </Form.Label>
                <Form.Control
                  className={styles.input_field}
                  type="text"
                  disabled={data.freecourse}
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
                  disabled={data.freecourse}
                  value={data.cardNumber}
                  onChange={(e) => setValue("cardNumber", e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className={styles.form_label}>Card Type</Form.Label>
                <Form.Control
                  className={styles.input_field}
                  as="select"
                  disabled={data.freecourse}
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
                      disabled={data.freecourse}
                      onChange={(e) => setValue("expiryMonth", e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      className={styles.input_field}
                      type="number"
                      placeholder="2021 - Expiry Year"
                      value={data.expiryYear}
                      disabled={data.freecourse}
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
                  disabled={false || data.freecourse}
                  onChange={(e) => setValue("cvv", e.target.value)}
                />
              </Form.Group>
            </Form>
            <div className="col-12 col-md-6 pl-md-5">
              <div className={"mt-4 p-4 " + styles.formp2}>
                <div>Add promo code</div>
                <Form.Row className="mt-2 mb-2">
                  <Col>
                    <Form.Control
                      disabled={data.coupondiscountadded}
                      className={styles.input_field}
                      placeholder="COUPON"
                      value={data.couponcode}
                      onChange={(e) => setValue("couponcode", e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Button
                      className="w-100"
                      style={{
                        background: "#0BEF61",
                      }}
                      onClick={async (e) => {
                        setLoading(true);
                        console.log("course id" + data.courseid);
                        const res = await paymentService.verifyCoupon({
                          couponcode: data.couponcode,
                          courseid: data.courseid,
                        });
                        setLoading(false);
                        if (res.success) {
                          setCouponCode(data.couponcode);
                          setData({
                            ...data,
                            discount: 0 + res.data.discount,
                            coupondiscountadded: true,
                            freecourse: res.data.discount === "100" ? true : false,
                            showInstallments: false,
                            option: null
                          });
                        } else {
                          setData({
                            ...data,
                            coupondiscountadded: false,
                            showInstallments: false,
                            option: null
                          });
                        }
                      }}
                    >
                      Apply Coupon
                    </Button>
                  </Col>
                </Form.Row>
                {data.coupondiscountadded ===
                  null ? null : data.coupondiscountadded === true ? (
                    <div className="btn btn-success w-100">
                      {"Congratulations! Discount of " +
                        data.discount +
                        "% is added to your payment."}
                    </div>
                  ) : (
                  <div className="btn btn-danger w-100">
                    Coupon expired or not valid for this course.
                  </div>
                )}
              </div>

              <div className="h3 mt-3 mb-2">Payment Summary</div>
              <div className="d-flex justify-content-between h6 mt-4">
                <div>{data.name}</div>
              </div>
              <div className="d-flex justify-content-between h5 mt-4">
                <div>Course Price</div>
                <div>R{data.amount}</div>
              </div>
              {
                <div className="d-flex justify-content-between h5 mt-4">
                  <div>Discount</div>
                  <div>{data.discount}%</div>
                </div>
              }
              {data.showAddons && <div>
                <div className="d-flex justify-content-between h5 mt-4">
                  <div>Course total</div>
                  <div>R{data.amount - (data.discount * data.amount) / 100}</div>
                </div>
                <hr />
                <div className="d-flex justify-content-between h6 mt-4">
                  <div>
                    <input 
                    id="mentorship_check" 
                    onClick={() => setAddOnItem('mentor') } 
                    checked={data.isMentored} 
                    type="checkbox" 
                    className="addon_check" />
                    <span className="addon_text" onClick={() => setAddOnItem('mentor') }>
                      Mentorship
                    </span>
                  </div>
                  <div>R500</div>
                </div>
                <div className="d-flex justify-content-between h6 mt-4">
                  <div>
                    <input 
                    type="checkbox" 
                    onClick={() => setAddOnItem('intern') } 
                    checked={data.isInterned} 
                    className="addon_check" 
                    />
                    <span className="addon_text" onClick={() => setAddOnItem('intern') }> 
                      Internship
                    </span>
                  </div>
                  <div>R600</div>
                </div>
              </div> }
              <hr />
              <div className="d-flex justify-content-between h5 mt-4">
                <div>Total</div>
                <div>R{getTotal()}</div>
              </div>
            {/* <p className="text-muted pt-2">
                For any information send an email to hello@zaio.io. For more
                information, see our FAQ.
              </p> */}
            <ButtonArea />
          </div>
        </div>
          {data.showCards && <SavedCards clickForPayment />}
    </div>
  )
}
    </div >
  );
}

export default Payment;
