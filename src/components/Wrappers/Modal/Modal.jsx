import React, { Component } from "react";

export default class Modal extends Component {
  render() {
  let center = {
    top:'0',
  left:'0',
  backgroundColor:'#00000090',
  zIndex:'9999',
  width:'100%',
  position:this.props.position,
  display: 'flex',
  justifyContent: 'center',
  height:'100vh',
  paddingTop:'1%'
  };


    return (
      <div style={{...center,...this.props.style}} onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}
