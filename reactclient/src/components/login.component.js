import React, { Component } from "react";
import { Link } from "react-router-dom";

var client = new 
 
class creds extends Component {
    var email=this.sttae.email;
    var password=this
}
class login extends Component {
    constructor(props) {
    super(props);
    this.state = {email:"",password:""};
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEmailChange(event) {
    this.setState({email: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password:event.target.value});
  }

  handleSubmit(event,email,password) {
    alert('A email was submitted: ' + this.state.email);
    alert('A password was submitted: ' + this.state.password);


    event.preventDefault();
  }
    render() {
        return (
            <form>
                <h3>Sign in</h3>
                <div className="form-group">
                    <label >Email</label>
                    <input type="text"  onChange={this.handleEmailChange} className="form-control"  />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" text="left" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button onClick={this.handleSubmit(this.state.email,this.state.password)}className="btn btn-dark btn-lg btn-block">Sign in </button>
                {/*<Link to="/home"><button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button></Link>*/}
                <Link className="forgot-password" >Forgot password? </Link>
                <Link className="sign-up" to="/sign-up">Sign UP !! </Link>
                <button type="button" className="btn btn-dark btn-lg btn-block">Sign in with IU</button>
                <button type="button" className="btn btn-dark btn-lg btn-block">Sign in with Google</button>
                <button type="button" className="btn btn-dark btn-lg btn-block">Sign in with GitHub</button>
            </form>
        );
    }
}
export default login;
