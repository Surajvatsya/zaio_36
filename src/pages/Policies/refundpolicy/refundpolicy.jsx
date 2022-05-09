import { Component } from "react";
import "./terms.css";
import {Helmet} from "react-helmet";

//components
export default class terms extends Component {
  constructor(props){
    super(props);
    this.state = {
      email:this.props.email?this.props.email:"",
    }
  }
  render() {
    return (
      <div>
        

        <Helmet>
                <meta charSet="utf-8" />
                <title>Learn how to code online for Free | Terms & Conditions | Zaio</title>
                <meta name="description" content="Zaio is committed to developing training programmes that encourage lifelong learning in order to develop leaders who will shape Africa's and the world's future innovation." />
                <meta property="title" content="Learn how to code online for Free | About us | Zaio" />

                <meta name="og:description" content="Zaio is committed to developing training programmes that encourage lifelong learning in order to develop leaders who will shape Africa's and the world's future innovation." />
                <meta property="og:title" content="Learn how to code online for Free | About us | Zaio" />
                <meta property="og:url" content="https://www.zaio.io/"/>
                <meta property="og:site_name" content="Zaio" />
                <meta property="og:type" content="article" />
        </Helmet>

          <div className="wave3"></div>

          <section className="our-values">
          <div className="container text-center">
                <h1 className="b2b-heading heading">
                Refund Policy
                </h1>  
                <p className="light-subheading">
                Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.
                </p>
                <div className="body-text">
                  <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
                  </p>
                  <p>Several types of goods are exempt from being returned. Perishable goods such as food, flowers, newspapers or magazines cannot be returned. We also do not accept products that are intimate or sanitary goods, hazardous materials, or flammable liquids or gases.
                  </p>
                  <p>Additional non-returnable items:
                  <ul>
                    <li>Courses</li>
                    <li>Downloadable software products
                    </li>
                    <li>Learning Paths</li>
                  </ul>
                  </p>
                  <p>To complete your return, we require a receipt or proof of purchase.
                  Please do not send your purchase back to the manufacturer.
                  </p>
                  <p>There are certain situations where only partial refunds are granted: (if applicable)
                  * Book with obvious signs of use
                  * CD, DVD, VHS tape, software, video game, cassette tape, or vinyl record that has been opened.
                  * Any item not in its original condition, is damaged or missing parts for reasons not due to our error.
                  * Any item that is returned more than 30 days after delivery
                  Refunds (if applicable)</p>
                  <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
                  </p>
                  <p>If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.
                  </p>
                  <p><b>Late or missing refunds (if applicable)
                  </b></p>
                  <p>If you haven’t received a refund yet, first check your bank account again.
                  Then contact your credit card company, it may take some time before your refund is officially posted.
                  Next contact your bank. There is often some processing time before a refund is posted.
                  If you’ve done all of this and you still have not received your refund yet, please contact us at asif@zaio.io.
                  Sale items (if applicable)
                  Only regular priced items may be refunded, unfortunately sale items cannot be refunded.
                  </p>
                  <p><b>Exchanges (if applicable)
                  </b></p>
                  <p>We only replace items if they are defective or damaged.  If you need to exchange it for the same item, send us an email at asif@zaio.io and send your item to: 9 lower burg street, Cape Town, WC, 8000, South Africa.
                  
                  </p>
                  <p><b>Gifts</b></p>
                  <p>If the item was marked as a gift when purchased and shipped directly to you, you’ll receive a gift credit for the value of your return. Once the returned item is received, a gift certificate will be mailed to you.
                  If the item wasn’t marked as a gift when purchased, or the gift giver had the order shipped to themselves to give to you later, we will send a refund to the gift giver and he will find out about your return.

                  </p>
                  <p><b>Shipping</b></p>
                  <p>To return your product, you should mail your product to: 9 lower burg street, Cape Town, WC, 8000, South Africa.
                  </p>
                  <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
                  </p>
                  <p>Depending on where you live, the time it may take for your exchanged product to reach you, may vary.
                  </p>
                  <p>If you are shipping an item over $75, you should consider using a trackable shipping service or purchasing shipping insurance. We don’t guarantee that we will receive your returned item.</p>
                </div>
          </div>
        </section>
      </div>
    );
  }
}
