import paymentService from "../../actions/services/payment.service";
import { PaymentDetailsContext } from "../../context/PaymentDetailsProvider";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentCard.css";
// interface Props {
//   cardnumber: string;
//   clickForPayment?: boolean;
// }

export const PaymentCard = (props) => {
  const navigate = useNavigate();
  const { details, installments, addOns } = useContext(PaymentDetailsContext);

  const oneClickPayment = () => {
    if (props.clickForPayment && details) {
      let data = null;
      if (details && details.case === "course") {
        data = {
          cardnumber: props.cardnumber,
          courseid: details.id,
          iscourse: true,
          couponcode: details.couponcode,
        };
      } else if (details && details.case === "learning-path") {
        data = {
          cardnumber: props.cardnumber,
          learningpathid: details.id,
          iscourse: false,
          couponcode: details.couponcode,
        };
      }
      if (data) {
        data.installments = installments;
        data.addOns = addOns;
        paymentService
          .oneClickPayment(data)
          .then((res) => {
            console.log({ res });
            if (res.success) {
              if (data.iscourse) {
                navigate("/course/" + data.courseid);
              } else {
                navigate("/dashboard");
              }
            } else {
              alert(res.message);
            }
          })
          .catch((err) => {
            console.log({ err });
            console.log("Payment Failed");
            navigate("/allcourses");
          });
      }
    } else {
      navigate("/allcourses");
    }
  };
  return (
    <div
      className='payment_card m-3'
      onClick={(e) => oneClickPayment()}
      style={{
        width: props.clickForPayment ? "30%" : null,
        cursor: props.clickForPayment ? "pointer" : null,
      }}
    >
      <div className='payment_card__front payment_card__part'>
        {/* <img alt="Payment Card" className="payment_card__front-square payment_card__square" src="https://image.ibb.co/cZeFjx/little_square.png"/>
                <img alt="Payment Card" className="payment_card__front-logo payment_card__logo" src="https://www.fireeye.com/partners/strategic-technology-partners/visa-fireeye-cyber-watch-program/_jcr_content/content-par/grid_20_80_full/grid-20-left/image.img.png/1505254557388.png"/> */}
        <p className='payment_card_numer'>
          **** **** **** {props.cardnumber.slice(-4)}
        </p>
        <div className='payment_card__space-75'>
          <span className='payment_card__label'>Card holder</span>
          <p className='payment_card__info'>XXXXXX</p>
        </div>
        <div className='payment_card__space-25'>
          <span className='payment_card__label'>Expires</span>
          <p className='payment_card__info'>XX/XX</p>
        </div>
      </div>

      <div className='payment_card__back payment_card__part'>
        <div className='payment_card__black-line'></div>
        <div className='payment_card__back-content'>
          <div className='payment_card__secret'>
            <p className='payment_card__secret--last'>XXX</p>
          </div>
          {/* <img alt="Payment Card" className="payment_card__back-square payment_card__square" src="https://image.ibb.co/cZeFjx/little_square.png"/>
                <img alt="Payment Card" className="payment_card__back-logo payment_card__logo" src="https://www.fireeye.com/partners/strategic-technology-partners/visa-fireeye-cyber-watch-program/_jcr_content/content-par/grid_20_80_full/grid-20-left/image.img.png/1505254557388.png"/> */}
        </div>
      </div>
    </div>
  );
};
