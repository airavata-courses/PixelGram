import React, { useState } from 'react'
import { TextField, Button, IconButton, Typography, Grid, CircularProgress, InputAdornment, Paper } from '@material-ui/core';

import { Visibility, VisibilityOff } from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import axios from '../../helperClasses/axiosService';
import { USER_LOGIN, USER_SIGNUP, GET_USER_ID } from '../../helperClasses/API_EndPoints'
import { addUserIdInLocalStorage, addUserNameInLocalStorage } from '../../helperClasses/localStorage'
import { userLogin } from '../../store/reducers/auth/authActions'
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapDispatchToProps = dispatch => {
    return {
        userLogin: () => dispatch(userLogin()),
    };
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    inputStyle: {
        margin: '5px',
        width: '90%',
        maxWidth: '300px'
    },
    loadingSpinner: {
        margin: '5px',
        width: '30px',
        borderRadius: '50%',
        transition: 'all .2s ease-in-out',
    },
    mainDiv: {
        background: 'linear-gradient(to right, #0D0106 0%,#212738 100%)', textAlign: 'center', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    card: {
        background: 'white', width: '80%', height: '100%', position: 'relative', top: '5%', borderRadius: '10px',
    },
    mainGrid: {
        width: '100%', height: '100%'
    },
    titleGrid: {
        background: 'linear-gradient(to right, #212738 0%,#0D0106 100%)',
    },
    titleHeader: {
        color: 'white', //margin: '40%'
    },
    formGrid: {
        height: '100%', marginLeft: '0%'
    },
    form: {
        //marginBottom: '20%'
    },
    loading: {
        marginLeft: '20px'
    }
}));

function LoginSignup(props) {

    const [isLoginPage, setLoginSignupPage] = useState(true);

    const [signupUserPasswordVisibility, setSignupUserPasswordVisibility] = useState(false);
    const [signupUser, setSignupUser] = useState({ username: "", password: "" });

    const [loginUserPasswordVisibility, setLoginUserPasswordVisibility] = useState(false);
    const [loginUser, setLoginUser] = useState({ username: "", password: "" });

    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState()

    const onTextChangeSignupUser = event => {
        setSignupUser({ ...signupUser, [event.target.name]: event.target.value });
        setErrorMessage('')
    }

    const onTextChangeLoginUser = event => {
        setLoginUser({ ...loginUser, [event.target.name]: event.target.value });
        setErrorMessage('')
    }

    const userLogin = (e) => {
        //debugger;
        e.preventDefault();
        setIsLoading(true)
        if (isLoading) return;
        axios.post(USER_LOGIN, loginUser).then(res => {
            console.log('login res ', res)
            axios.post(GET_USER_ID, { username: loginUser.username })
                .then(user => {
                    console.log('userid res ', user)
                    addUserIdInLocalStorage(user.data.userid);
                    addUserNameInLocalStorage(loginUser.username);
                    setIsLoading(false)
                    props.userLogin()
                }).catch(err => {
                    console.log(err)
                    setIsLoading(false)
                })
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
            setErrorMessage('Invalid UserName/Password')
        })
    }

    const userSignup = (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (isLoading) return;
        axios.post(USER_SIGNUP, signupUser).then(res => {
            console.log('signup res ', res)
            setIsLoading(false)
            setErrorMessage(res.data.message)
        }).catch(err => {
            setIsLoading(false)
        })
    }
    const classes = useStyles();

    const togglePage = (pageState) => {
        setErrorMessage('')
        setLoginSignupPage(pageState);
    }

    return (
        <div style={{ 'margin': 0, 'height': '100vh', 'width': '100%', }}>
            <Grid container alignItems="center" justify="center" justifycontent="center" direction="row" spacing={2} >
                <Paper style={{ minWidth: '350px' }}>
                    {
                        isLoginPage ? (

                            <form onSubmit={userLogin} className={classes.form}>
                                <br />
                                <Typography variant="h6">User Login</Typography>
                                <Grid item xs={12}>
                                    <TextField name="username" label="User Name" variant="outlined" size="small" className={classes.inputStyle} fullWidth autoFocus value={loginUser.username} onChange={onTextChangeLoginUser} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="password" label="Password" variant="outlined" size="small" className={classes.inputStyle} fullWidth value={loginUser.password} onChange={onTextChangeLoginUser} type={loginUserPasswordVisibility ? "text" : "password"} />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography color="secondary">{errorMessage}</Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button color="primary" variant="contained" className={classes.inputStyle} type="submit" disabled={loginUser.username.length < 1 || loginUser.password.length < 1 ? true : false}>
                                        <>
                                            <Typography>Login</Typography>
                                            {isLoading ? (
                                                <CircularProgress color="inherit" size={30} thickness={5} className={classes.loading} />
                                            ) : ""}
                                        </>
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button color="secondary" variant="contained" fullWidth className={classes.inputStyle} onClick={() => togglePage(false)}>New User ? Signup</Button>
                                </Grid><br />
                                <Grid item xs={12}>
                                    <Link to='/updatePassword'>Forgot Password?</Link>
                                </Grid>
                                <br />
                            </form>

                        ) : (
                                <form onSubmit={userSignup} className={classes.form}>
                                    <br />
                                    <Typography variant="h6">User Signup</Typography>
                                    <Grid item xs={12}>
                                        <TextField name="username" label="User Name" variant="outlined" size="small" className={classes.inputStyle} fullWidth autoFocus value={signupUser.username} onChange={onTextChangeSignupUser} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField name="password" label="Password" variant="outlined" size="small" className={classes.inputStyle} fullWidth value={signupUser.password} onChange={onTextChangeSignupUser} type={signupUserPasswordVisibility ? "text" : "password"} />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography color="secondary">{errorMessage}</Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button color="primary" variant="contained" className={classes.inputStyle} type="submit" disabled={signupUser.username.length < 1 || signupUser.password.length < 1 ? true : false}>
                                            <>
                                                <Typography>Signup</Typography>
                                                {isLoading ? (
                                                    <CircularProgress color="inherit" size={30} thickness={5} className={classes.loading} />
                                                ) : ""}
                                            </>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button color="secondary" variant="contained" fullWidth className={classes.inputStyle} onClick={() => togglePage(true)}>Existing User ? Login</Button>
                                    </Grid>
                                    <br />
                                </form>

                            )
                    }
                </Paper>
            </Grid>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(LoginSignup)
