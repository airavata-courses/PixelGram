import React from 'react';
import {Link} from "react-router-dom";
import {Button} from 'semantic-ui-react';

const HomePage = () => (
<div className="ui container">
  <h1>PixelGram</h1>
  <Link to='/LearnMore' className="button"> LearnMore </Link><br/>
  <Link to='/UploadImage' className="button"> Upload </Link><br/>
  <Link to='/login' className="button"> Login </Link><br/>
  <Link to='/ForgotPassword'>Forgot Password ?</Link><br/>
  <Link to='/registration' className ="button"> Registration</Link>   
  

</div>
);

export default HomePage;
