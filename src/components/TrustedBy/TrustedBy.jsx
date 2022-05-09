import React, { Component } from 'react'
//images
import takealot from "assets/img/company-logos/takealot1.png"
import aws from "assets/img/company-logos/aws1.png"
import accenture from "assets/img/company-logos/accenture1.png"
import twou from "assets/img/company-logos/2u1.png"
import capitec from "assets/img/company-logos/capitec1.png"
import investec from "assets/img/company-logos/investec1.png"
export default class Outcomes extends Component {
    render() {
        return (
            <div>
                <div className="container">
                <div className="row justify-content-around">          
                    <div><img className="company-logos" src={takealot} alt=""></img></div>
                    <div><img className="company-logos" src={aws} alt=""></img></div>
                    <div><img className="company-logos" src={accenture} alt=""></img></div>
                    <div><img className="company-logos" src={investec} alt=""></img></div>
                    <div><img className="company-logos" src={capitec} alt=""></img></div>
                    <div><img className="company-logos" src={twou} alt=""></img></div>
                </div>
                </div>
            </div>
        )
    }
}
