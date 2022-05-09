import Button from "components/Button/Button";
import "./videoplayer.css";

export default function VideoPlayer(props){
    return (
        <section className="testimonial_main">
            <div className="container">
                <div className="pb-4 row">
                    {props.includeButton && 
                    <div className="col-md-11 mx-auto">
                        <div className="text-center my-5">
                            <Button link="/getstarted">Get Started</Button>
                        </div>
                    </div>}
                    <div className={(props.includeButton ? " ": "mt-5 ") +"col-md-11 mx-auto mb-5"}>
                        <video className='videoPlayer' controls autoPlay loop muted>
                            <source src={props.url} type='video/mp4' />
                        </video>
                    </div>
                </div>
            </div>
        </section>
    );
}