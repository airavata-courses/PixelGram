import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import login from ".Actions/login.component";
const { creds, accountFlag } = require('./account_pb.js');
const {}
class index extends Component 
{
    callGrpcService = () => {
        const request = new creds();
        request.setEmail(email);
        request.setPassword(password)

        client.loginUser(request, {}, (err, response) => {
            if (response == null) {
              console.log(err)
            }else {
              console.log(response.getIssuccess())
            }
        });
}
}  
  
