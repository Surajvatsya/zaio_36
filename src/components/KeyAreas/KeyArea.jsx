import html from "assets/img/technologies/html.png"
import css from "assets/img/technologies/css.png"
import js from "assets/img/technologies/js.png"
import reactjs from "assets/img/technologies/reactjs.png"
import node from "assets/img/technologies/node.png"
import firebase from "assets/img/technologies/firebase.svg"
import git from "assets/img/technologies/git.svg"
import mongo from "assets/img/technologies/mongo.png"
import netlify from "assets/img/technologies/netlify.png"
import { Link} from "react-router-dom";

export default function KeyArea(){
    const styles = {
        'backgroundColor': "#07192c"
    };
    return (
        <section className="land-a-job-technologies pt-5 pb-5" style={styles}>
          <div className="container">
                  <div className="text-white d-flex flex-column align-items-center text-center mb-4">
                    <h1 className="h3">Certify your ability in eight key areas</h1>
                  </div>
                  <div className=" d-flex justify-content-center flex-wrap">
                  <Link to="/getstarted" className="technology-box"><img src={html} width={100} alt=""></img><i className="fa fa-plus" aria-hidden="true"></i>
                  <img src={css} width={100} alt=""></img></Link>  
                  <Link to="/getstarted" className="technology-box"><img src={js} width={100} alt=""></img></Link>  
                  <Link to="/getstarted" className="technology-box"><img src={reactjs} width={180} alt=""></img></Link>  
                  <Link to="/getstarted" className="technology-box"><img src={node} width={100} alt=""></img></Link>  
                  <Link to="/getstarted" className="technology-box"><img src={firebase} width={50} alt=""></img></Link>  
                  <Link to="/getstarted" className="technology-box"><img src={git} width={100} alt=""></img></Link>  
                  <Link to="/getstarted" className="technology-box"><img src={mongo} width={180} alt=""></img></Link>  
                  <Link to="/getstarted" className="technology-box"><img src={netlify} width={150} alt=""></img></Link>
                  </div>
                   <h2 className="h6 mt-2 mb-2 text-center text-white">
                      Find out more about the Fullstack Web Development learning path <Link to="/getstarted" style={{color: "white"}}>here</Link>
                  </h2>

            </div>
        </section>
    );
}