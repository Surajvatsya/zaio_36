import Button from "components/Button/Button";
import "./SingleTestimonial.css";

export default function SingleTestimonial(props){
    return (
        <section className="testimonial_main">
            <div className="container">
                <div className="pb-4 row">
                    {props.includeButton && 
                    <div className="col-md-11 mx-auto">
                        <div className="text-center my-5">
                            <Button>Get Started</Button>
                        </div>
                    </div>}
                    <div className={(props.includeButton ? " ": "mt-5 ") +"col-md-11 mx-auto mb-5"}>
                        <div className="inner align-items-center justify-content-between row bg-white">
                            <div className="profile col-md-2">
                                <img src={props.data.image} alt="Name" className="img-fluid"/>
                            </div>
                            <div className="comments col-md-10">
                                <h3><b>"{props.data.quote}"</b></h3>
                                <div><span>{props.data.post}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}