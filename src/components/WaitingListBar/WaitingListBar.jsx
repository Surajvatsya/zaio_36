import React, { Component } from "react";
import {Link} from 'react-router-dom'
import { Constants } from "../../Constants";
import './WaitingListBar.css';

export default class WaitingListBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          barVisibility: 'inline-block',
        };
    }

    handleClick() {
        this.setState(({ barVisibility }) => ({
            barVisibility: 'none',
        }));
    }
    render() {
        return (
            <Link to="/learning-path/fullstack/FALL2022" onClick={(e)=>{e.stopPropagation()}}>
            <div className="waitingListBar text-center" style={{ display: this.state.barVisibility }}>{Constants.WaitingListBarText}
                <span onClick={(e) => {e.stopPropagation();e.preventDefault();this.handleClick();}}>
                    X &nbsp;
                </span>
            </div>
            </Link>
        );
    }
}