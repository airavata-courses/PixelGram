import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import login from "./components/login.component";
import signup from "./components/signup.component";
import home from "./components/home.component";

function App() {
    return (
        <main>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/login"}>PixelGram</Link>
          </div>
       </nav>
       <div className="inner">
            <Switch>
                <Route path="/" component={login} exact />
                <Route path="/login" component={login} />
                <Route path="/sign-up" component={signup} />
                <Route path="/home" component={home} />
            </Switch>
        </div>
        </main>
        
    )
}

export default App;
