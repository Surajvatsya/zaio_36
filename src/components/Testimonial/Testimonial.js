import React, { Component } from "react";
import amazon from "../../assets/img/company-logos/amazon.png"
import dado from "../../assets/img/company-logos/dado.png"


export default class Testimonial extends Component {
    render() {
        return ( 
            <div className="container">
                <h3 className="font-weight-bold text-center pt-5">Zaio Graduates</h3>
                <div className="testimonial-card d-flex justify-content-space ">   
                    <figure className="snip1192">
                        <blockquote><div className="quote">
                            <div className="author">
                                <img className="author-img" src="https://zaiolandingpage.s3.eu-west-2.amazonaws.com/Untitled+design+(4).jpg" alt="sq-sample1"/>
                                <h5>Mantombi Manqele <span> Cloud Support Associate</span></h5>
                                <div><img className="testimonial-logos" src={amazon} alt=""></img></div>

                            </div>
                            Really back Zaio's teaching methodology. Very engaging and responsive. My favorite part is that they teach you what is relevant in the industry!
                            </div>
                        </blockquote>
                    </figure>
                    <figure className="snip1192">
                        <blockquote><div className="quote">
                            <div className="author">
                                <img className="author-img" src="https://d33wubrfki0l68.cloudfront.net/54e40baffe1438130b0a7668583c26d6274c8bab/7af94/_next/static/images/jammie-82016c73d2b4a19c540c8b7ff80b6fec.jpg" alt="sq-sample1"/>
                                <h5>Jamie Gregory <span> Web Developer</span></h5>
                                <div><img className="testimonial-logos" src={dado} alt=""></img></div>

                            </div>
                                I completed the web development bootcamp at Zaio. Definitely recommend it! Tutors were very helpful.
                            </div>
                        </blockquote>
                    </figure>
                    <figure className="snip1192">
                        <blockquote><div className="quote">
                            <div className="author">
                                <img className="author-img" src="https://d33wubrfki0l68.cloudfront.net/9964b7341e2d2f0a5180044caeef8502f6c1207d/0ce05/_next/static/images/partric-317d3b381bb7604c84954d2ac16f4050.jpg" alt="sq-sample1"/>
                                <h5>Patrick Rashidi <span> Cloud Support Associate</span></h5>
                                <div><img className="testimonial-logos" src={amazon} alt=""></img></div>

                            </div>
                                Great support from Zaio while completing the courses! Couldn't recommend a better learning environment.
                            </div>
                        </blockquote>
                    </figure>
                </div>
            </div>
            
            
        );
    }
}