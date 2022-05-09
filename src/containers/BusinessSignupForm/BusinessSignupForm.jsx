import React, { Component } from "react";
import axios from 'axios'
// import { Link } from "react-router-dom";
import service from 'actions/services/admin.service'
export default class BusinessSignupForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstname:"",
            lastname:"",
            email:this.props.email?this.props.email:"",
            phonenumber:"",
            companyname:"",
            jobtitle:"",
            demoreason:"",
            success:false,
            businessform:"block",
            businessformsubmit:"none",
            loading:false
        }
    }
    post =async () =>{
      this.setState({loading:true})
      await service.postBusinessDemoForm(this.state);
      this.setState({firstname:"",lastname:"",email:"",phonenumber:"",companyname:"",jobtitle:"",demoreason:"",success:true});
      this.setState({businessform:'none',businessformsubmit:'block',loading:false});
    }
    render() {
    return (
      <div>
        <form className="signup-form rounded bg-white" onSubmit={(e)=>{e.preventDefault();this.post();}}>
        <div className="text-center" style={{ display: this.state.businessformsubmit }}>
          <h4 className="mt-5 font-weight-bold">Thank you</h4>
          <br></br>
          <br></br>
          <p className="font-weight-normal">Your details are submitted successfully
          </p>
        </div>
        <div style={ {display: this.state.businessform }}>
        <h4 className="font-weight-bold text-center">Request your demo</h4>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              required
              onChange={e=>this.setState({firstname:e.target.value})}
              value={this.state.firstname}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              required
              onChange={e=>this.setState({lastname:e.target.value})}
              value={this.state.lastname}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={e=>this.setState({email:e.target.value})}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <input
              type="phone"
              className="form-control"
              placeholder="Enter phone number"
              required
              onChange={e=>this.setState({phonenumber:e.target.value})}
              value={this.state.phonenumber}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Company name"
              required
              onChange={e=>this.setState({companyname:e.target.value})}
              value={this.state.companyname}
            />
          </div>
          <div className="form-group">
            
            <input
              type="text"
              className="form-control"
              placeholder="Job title"
              required
              onChange={e=>this.setState({jobtitle:e.target.value})}
              value={this.state.jobtitle}
            />
          </div>
          <div className="form-group">
          <textarea
            className="form-control"
            rows="3"
            placeholder="What are your training needs?"
            required
            onChange={e=>this.setState({demoreason:e.target.value})}
            value={this.state.demoreason}
          >
          </textarea>

          </div>
          

          <button type="submit" className="btn btn-secondary btn-block" disabled={this.state.loading}>
            {this.state.loading?"Submitting...":"Get in touch"}
          </button>

          <p className="signup-finetext mt-3">
            By continuing, you agree to our terms and privacy policy. You agree
            that we can contact you about Zaio and use data from third parties
            to personalize your experience.
          </p>
          </div>
        </form>
        
      </div>
    );
  }
}
