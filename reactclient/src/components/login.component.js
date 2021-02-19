import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class login extends Component {
    render() {
        return (
            <form>
                <h3>Sign in</h3>
                <div className="form-group">
                    <label >Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" text="left" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <Link to="/home"><button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button></Link>
                <Link className="forgot-password" >Forgot password? </Link>
                <Link className="sign-up" to="/sign-up">Sign UP !! </Link>
 
                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in with IU</button>
                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in with Google</button>
                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in with GitHub</button>
            </form>


        );
    }
}
