import { Link} from "react-router-dom";
import "./Button.css";

export default function Button(props){
    return (
    <Link to={props.link} className="business-button mt-4 font-weight-bold">
        {props.children}
    </Link>)
}