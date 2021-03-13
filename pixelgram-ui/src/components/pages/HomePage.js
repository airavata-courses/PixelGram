import React from 'react';
import { Link } from "react-router-dom";

const HomePage = () => (
  <div>
    <h1>PixelGram</h1>
    <Link to='/LearnMore' className="button"> About PixelGram </Link><br />
    <Link to='/loginSignup' className="button"> Login / Signup </Link><br />
  </div>
);

export default HomePage;
