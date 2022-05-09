import React, { Component } from 'react'
import {Link} from 'react-router-dom'
//images
import html from "assets/img/technologies/html.png"
import css from "assets/img/technologies/css.png"
import js from "assets/img/technologies/js.png"
import reactjs from "assets/img/technologies/reactjs.png"
import node from "assets/img/technologies/node.png"
import firebase from "assets/img/technologies/firebase.svg"
import git from "assets/img/technologies/git.svg"
import unix from "assets/img/technologies/unix.svg"
import python from "assets/img/technologies/python.svg"
import java from "assets/img/technologies/java.png"
import mongo from "assets/img/technologies/mongo.png"
import netlify from "assets/img/technologies/netlify.png"
import bs from "assets/img/technologies/bootstrap.svg"
export default class Technologies extends Component {
    render() {
        return (
            <div className="container pb-5 text-center">
            <h3 className="text-center font-weight-bold">Learn a new technology</h3>
            <p><b>Get certified in technologies used in industry</b></p>

            <div className="technologies  d-flex justify-content-center flex-wrap">
                <Link to="/allcourses" className="technology-box"><img src={reactjs} width={180} alt=""></img></Link>  
                <Link to="/allcourses" className="technology-box"><img src={html} width={100} alt=""></img><i className="fa fa-plus" aria-hidden="true"></i>
                <img src={css} width={100} alt=""></img></Link>  
                <Link to="/allcourses" className="technology-box"><img src={js} width={100} alt=""></img></Link>  
                <Link to="/allcourses" className="technology-box"><img src={node} width={100} alt=""></img></Link>  
                <Link to="/allcourses" className="technology-box"><img src={firebase} width={50} alt=""></img></Link>  
                <Link to="/allcourses" className="technology-box"><img src={git} width={100} alt=""></img></Link>  
                <Link to="/allcourses" className="technology-box"><img src={mongo} width={180} alt=""></img></Link>  
                <Link to="/allcourses" className="technology-box"><img src={netlify} width={150} alt=""></img></Link>  
                <Link to="/allcourses" className="technology-box"><img src={bs} width={180} alt=""></img></Link>  
                <Link to="/allcourses" className="technology-box"><img src={python} width={180} alt=""></img></Link>  
                <Link to="/allcourses" className="technology-box"><img src={java} width={100} alt=""></img></Link>  
                <Link to="/allcourses" className="technology-box"><img src={unix} width={100} alt=""></img></Link>  
                
            </div>
            </div>
        )
    }
}
