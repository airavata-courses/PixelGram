import React from 'react';
import propTypes from 'prop-types';
import {Button } from 'semantic-ui-react';
import Toggle from 'react-toggle';
import "react-toggle/style.css"


 class ForgotPasswordForm extends React.Component {
   state = {
     data: {
       username: '',
       password: ''
     },
     loading: false,
     errors: {}
   };

   //Checks for the change of state and then assigns the form data to the state.
   onChange = e => this.setState({data: {...this.state.data, [e.target.name]: e.target.value}});

   onSubmit = (e) => {
      e.preventDefault();
      this.props.submit(this.state.data);
   };

   render() {
     const {data} = this.state;
     return(
      <div>
      <form onSubmit = {this.onSubmit} >
          <label htmlFor="username"><b>Username</b></label><br/>
          <input type="username" placeholder="Enter Username" id="username" name="username" value={data.username} onChange = {this.onChange} required/>
          <br/><br/>
          <label htmlFor="password"><b>Password</b></label><br/>
          <input type="password" placeholder="Enter New Password" id="password" name="password" value={data.password} onChange = {this.onChange} required/>
          <br/><br/>
          <button type="submit" className="button">Update</button>
      </form>
    </div>
     );
    }
}

 ForgotPasswordForm.propTypes = {
   submit: propTypes.func.isRequired
 };

 export default ForgotPasswordForm;
