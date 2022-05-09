import "./Consultation.css";
import consultback from "assets/svg/consultback.svg";
import { Link} from "react-router-dom";

export default function Consultation(props){
    return (
        <section className="free_consult position-relative text-white">
            <div className="position-absolute w-60 h-100" style={{
                backgroundImage: "url(" + consultback + ")",
                top:0,
                left:0,
                backgroundPosition: 'right',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
                }}>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-7" style={{'zIndex': 9}}>
                        <div className="inner">
                            <h2><b>{props.heading1} {props.heading2 ? <br />: null}{props.heading2}</b> </h2>
                            <p className="mb-0">{props.subheading}</p>
                        </div>
                    </div>
                    <div className="col-md-5">
                    <Link to="/consultation">
                        <div className="text-center mt-md-5">
                            <a href="#" className="btn btn_theme large_theme_btn">Book a consultation</a>
                        </div>
                    </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}