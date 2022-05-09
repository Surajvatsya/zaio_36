import paymentService from "../../actions/services/payment.service";
import { PaymentCard } from "../../components/PaymentCard/PaymentCard";
import { LoadingContext } from "../../context/LoadingProvider";
import { useEffect, useState, useContext } from "react";
import Styles from "./Dashboard.module.css";

export const SavedCards = (props) => {
  const { setLoading } = useContext(LoadingContext);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    setLoading(true);
    paymentService
      .getcards()
      .then((res) => {
        if (res.success) {
          setCards(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  if (props.clickForPayment) {
    return (
      <div className="d-flex " style={{ flexWrap: "wrap" }}>
        {cards.map((card, index) => (
          <PaymentCard
            key={index}
            cardnumber={card.cardnumber}
            clickForPayment={props.clickForPayment}
          />
        ))}
      </div>
    );
  }
  return (
    <div className={"container-fluid " + Styles.dashboard_settings}>
      <p className={Styles.heading2 + " "}>Saved cards</p>
      <div className="d-flex " style={{ flexWrap: "wrap" }}>
        {cards.map((card, index) => (
          <PaymentCard
            key={index}
            cardnumber={card.cardnumber}
            clickForPayment={props.clickForPayment}
          />
        ))}
      </div>
    </div>
  );
};
