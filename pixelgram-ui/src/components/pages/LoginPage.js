import React from 'react';
import {Link} from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import axios from 'axios';
import {Button } from 'semantic-ui-react';
import './PixelGram.png';


class LoginPage extends React.Component{

//This gets the data and sends it as a post request
submit = data => {
    //alert("username: " + data.username);
    //This calls the URL to submit the post request.
    axios.post('http://localhost:5003/login',{username:data.username,password:data.password})
    .then(function(response){
      //var username = response.data.username;
      //This part is responsible for the window navigation after login.
      response.data.message ==="User verified"
      //?  (document.getElementById('status').innerHTML = "Login Successfull! You are being redirected to landing page in 5 seconds.",setTimeout(() => {window.location.replace('/landing?username='+ username)},5000))
      ?  (document.getElementById('status').innerHTML = "Login Successfull! You are being redirected to landing page in 5 seconds.",setTimeout(() => {window.location.replace('/landing')},5000))
      : document.getElementById('status').innerHTML = response.data.message
    })
    .catch(function(error){
      document.getElementById('status').innerHTML = error.message
    });
  };

//This renders the HTML code
render(){
  return(
      <div>
          <h1>Login Page</h1>
          <LoginForm submit={this.submit}/>
          <p id="status"></p>
          <p>Make a new account? Right here.</p>
          <Link to="/registration" className="button">Registration</Link>
      </div>
    );
  }
}

export default LoginPage;
