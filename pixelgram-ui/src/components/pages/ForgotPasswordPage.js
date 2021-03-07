import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-toggle/style.css";

class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Checks for the change of state and then assigns the form data to the state.
  onChange = (e) =>
    this.setState({ ...this.state, [e.target.name]: e.target.value });

  //Gets the data and sumbits it for a post request
  handleSubmit(event) {
    const { username, password } = this.state;
    var userid;
    axios.post("http://localhost:5003/userdetails", { username: username })
      .then(function (response) {
        userid = response.data.userid;
        axios.put(`http://localhost:5003/user`, {username: username,userid: userid,password: password,
          })
        .then(function (response) {
            //This is responsible for the page navigation.
            // eslint-disable-next-line
            (document.getElementById("status").innerHTML ="Update Password Successfull! You are being redirected to login in 3 seconds."),setTimeout(() => {window.location.replace("/login");}, 3000)
          })
          .catch(function (error) {
            document.getElementById("status").innerHTML = error.message;
          });
      })
      .catch(function (error) {
          document.getElementById("status").innerHTML = error.message;
      });

    event.preventDefault();
  }

  render() {
    return (
      <div align="top">
        <h1>update your password here !!</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              <b>Username</b>
            </label>
            <br />
            <input
              type="text"
              placeholder="enter username"
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
              required
            />
          </div>
          <br />
          <br />
          <div className="form-group">
            <label htmlFor="password">
              <b>New Password</b>
            </label>
            <br />
            <input
              type="password"
              placeholder="new password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              required
            />
          </div>
          <br />
          <br />
          <button type="submit" className="button">
            Update
          </button>
        </form>
        <p id="status"></p>
        <Link to="/" className="button">
          Back to Home
        </Link>
      </div>
    );
  }
}

export default ForgotPasswordPage;
