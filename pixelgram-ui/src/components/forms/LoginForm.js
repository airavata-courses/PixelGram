import React from 'react';
import propTypes from 'prop-types';

 class LoginForm extends React.Component {
   state = {

     //creating the data variable that holds the username and password to be passed on
     data: {
       username: '',
       password: ''
     },
     loading: false,
     errors: {}
   };

   //Checks for the change of state and then loads the data entered in the form to the state.
   onChange = e => this.setState({data: {...this.state.data, [e.target.name]: e.target.value}});

   onSubmit = (e) => {
     //Prevents the page from refreshing while submitting a form
     e.preventDefault();
     //This submits the data to the parent component.
     this.props.submit(this.state.data);
     //alert('Username is: ' + username.data.username);
   };

   render() {
     const {data} = this.state;
     return(
        <form onSubmit = {this.onSubmit} >
            <label htmlFor="username"><b>username</b></label><br/>
            <input type="username" placeholder="Enter username" id="username" name="username" value={data.username} onChange = {this.onChange} required/>

            <br/><br/>

            <label htmlFor="password"><b>Password</b></label><br/>
            <input type="password" placeholder="Enter Password" id="password" name="password" value={data.password} onChange = {this.onChange} required/>

            <br/><br/>
            <button type="submit" primary>Login</button>
        </form>
     );
    }
}

 LoginForm.propTypes = {
   submit: propTypes.func.isRequired
 };

 export default LoginForm;
