
import profile from "assets/img/landingpage/prof-img.png";
import qu from "assets/svg/quote.svg";
import "./Quote.css"

export default function Quote(props){
    return (
        <section className="quote_main pt-5 mb-5">
        <div className="container">
            <div className="row">
                    <div className="col-md-7 bg_quote">
                        <div className="inner">
                            <div className="text-left"><img src={qu} className="img-fluid" alt="John"/></div>
                            <h2 className="position-relative">{props.quoteText}</h2>
                            <div className="text-right"><img src={qu} className="img-fluid" alt="John"/></div>
                            <footer>
                                <div className="prof">
                                    <img src={props.quoteBy.image} className="img-fluid" alt="John"/>
                                    <span><b>{props.quoteBy.name}</b><br />{props.quoteBy.post}</span>
                                </div>
                            </footer>
                        </div>
                    </div>
                    <div className="align-items-center col-md-5 d-flex justify-content-center">
                        <ul className="list-unstyled text-center w-md-75 mb-0">
                            {props.quoteHeadings.map((item,index)=>
                            <li key={index}>
                                <h4>{item.heading}</h4>
                                <p>{item.subheading}</p>
                            </li>
                            )}
                        </ul>
                    </div>
            </div>
        </div>
    </section>  
        )
}