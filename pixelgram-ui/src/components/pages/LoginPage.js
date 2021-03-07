import React from 'react';
import {Link} from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import axios from 'axios';
import './PixelGram.png';
import LandingPage from "./LandingPage"

class LoginPage extends React.Component{
//This gets the data and sends it as a post request
constructor(props) {
    super(props);
    this.state = { data:null};
    this.submit = this.submit.bind(this);
  }

     // response.data.message ==="User verified"
      // ?  (document.getElementById('status').innerHTML = "Login Successfull! You are being redirected to landing page in 5 seconds.",setTimeout(() => {window.location.replace('/landing?username='+ data.username)},5000))
      // //?  (document.getElementById('status').innerHTML = "Login Successfull! You are being redirected to landing page in 5 seconds.",setTimeout(() => {window.location.replace('/landing')},5000))
      // : document.getElementById('status').innerHTML = response.data.message

submit = parentdata => {
  this.setState({username:parentdata.username});
    //This calls the URL to submit the post request.
 var localthis=this;
    axios.post('http://localhost:5003/login',{username:parentdata.username,password:parentdata.password})
    .then(response =>{
      //This part is responsible for the window navigation after login.
    this.setState({data:response.data.message});
    })
    .catch(function(error){
      document.getElementById('status').innerHTML = error.message
    });
  };


//This renders the HTML code
render(){
  return(
      <div>
        {this.state.data!==null 
        ? <LandingPage successMessage={this.state.data} username={this.state.username} />
        : (<React.Fragment> <h1>Login Page</h1>
          <LoginForm submit={this.submit}/>
          <p id="status"></p>
          <p>Make a new account? Right here.</p>
          <Link to="/registration" className="button">Registration</Link></React.Fragment>)}
      </div>
    );
  }
}

export default LoginPage;
