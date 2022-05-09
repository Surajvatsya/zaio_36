import portal from "assets/img/landingpage/portal.svg";
import badges from "assets/svg/badges.svg";
import bags from "assets/svg/bags.svg";
import Button from "components/Button/Button";
import "./Journey.css";

export default function Journey(props){
    return (
        <section className="own_boss my-5">
        <div className="container">
            <div className="inner">
                <div className="heading_area text-center mb-5 text-center">
                    <h3 className="mb-3">
                        {props.heading} {props.span ? <span>{props.span}</span> :null}
                    </h3>
                    <p className="w-md-65 mx-auto">{props.paragraph}</p>
                </div>
                
                <div className="row">

                    {props.steps.map((item,index)=>
                        <div key={index} className="col">
                            <div className="icon_area text-center">
                                <img src={item.image} alt="Globe" className="mb-3"/>
                                <p className="w-md-65 mx-auto weight-600">{item.text}</p>
                                <div className="count d-xs-none">{index+1}</div>
                            </div>
                        </div>
                    )}
                    
                    <div className="col-md-12 d-xs-block d-none">
                        <div className="count_main row position-relative">
                        {props.steps.map((item,index)=>
                            <div key={index} className="count">{index+1}</div>
                            )}
                            
                        </div>
                    </div>

                </div>
                
                <div className="text-center mt-5">
                    <Button link="/getstarted">
                        {props.buttonText}
                    </Button>
                </div>
            </div>
        </div>
    </section>
    );
}