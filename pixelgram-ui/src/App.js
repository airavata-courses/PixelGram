import React from 'react';
import {Route} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import RegistrationPage from "./components/pages/RegistrationPage";
import LearnMore from "./components/pages/LearnMore.js"
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage.js"
import SharePage from "./components/pages/SharePage.js"
import UploadImagePage from "./components/pages/UploadImagePage.js"


const App = () => (

<section className="hero">
  <Route path="/" exact component = {HomePage}/>
  <Route path="/login" exact component = {LoginPage}/>
  <Route path="/registration" exact component = {RegistrationPage}/>
  <Route path="/landing" exact component = {LandingPage}/>
  <Route path="/learnMore" exact component = {LearnMore}/>
  <Route path="/ForgotPassword" exact component = {ForgotPasswordPage}/>
  <Route path="/Share" exact component = {SharePage}/>
  <Route path="/UploadImage" exact component = {UploadImagePage}/>
</section>
);

export default App;
