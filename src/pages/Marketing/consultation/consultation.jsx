import { Component } from "react";
import "./consultation.css";
import Iframe from 'react-iframe'

//components
export default class Business extends Component {
  
  render() {
    return (
      <div>
      <div style={{height: '90vh'}}>
      <Iframe url="https://chats.landbot.io/v3/H-974368-N4KMXJ1S8DBVCPSM/index.html"
      width="100%"
      height="100%"
      id="myId"
      className="myClassname"
      display="initial"
      position="relative"/>
      </div>
      </div>
    );
  }
}
