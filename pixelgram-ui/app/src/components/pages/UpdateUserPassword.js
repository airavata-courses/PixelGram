import React, { useState } from 'react'
import { TextField, Button, IconButton, Typography, Grid, CircularProgress, InputAdornment, Paper } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import axios from '../../helperClasses/axiosService';
import { UPDATE_PASSWORD, GET_USER_ID } from '../../helperClasses/API_EndPoints'
import { useHistory } from "react-router-dom";

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

function UpdateUserPassword() {

    const [userPasswordVisibility, setUserPasswordVisibility] = useState(false);
    const [user, setUser] = useState({ username: "", password: "" });

    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onTextChange = event => {
        setUser({ ...user, [event.target.name]: event.target.value });
        setErrorMessage('')
    }
    const history = useHistory();
    const updatePassword = (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (isLoading) return;
        axios.post(GET_USER_ID, { username: user.username })
            .then(userDetails => {
                const userId = userDetails.data.userid;
                // const userDetails = { username: user.username, password: user.password, userid: userId }
                // console.log('userDetails', userDetails)
                axios.put(UPDATE_PASSWORD, { ...user, userid: userId }).then(res => {
                    console.log('update res ', res)
                    setErrorMessage('Password updated successfully.Redirecting to Login page')
                    setIsLoading(false)
                    setTimeout(() => {
                        history.push('/loginSignup')
                    }, 2000)
                }).catch(err => {
                    console.log(err)
                    setIsLoading(false)
                })
            }).catch(err => {
                console.log(err)
                setErrorMessage('Invalid User Name')
                setIsLoading(false)
            })
    }

    const classes = useStyles();

    return (
        <div style={{ 'margin': 0, 'height': '100vh', 'width': '100%', }}>
            <Grid container alignItems="center" justify="center" justifycontent="center" direction="row" spacing={2} >
                <Paper style={{ minWidth: '350px' }}>

                    <form onSubmit={updatePassword} className={classes.form}>
                        <br />
                        <Typography variant="h6">Update Password</Typography>
                        <Grid item xs={12}>
                            <TextField name="username" label="User Name" variant="outlined" size="small" className={classes.inputStyle} fullWidth autoFocus value={user.username} onChange={onTextChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="password" label="New Password" variant="outlined" size="small" className={classes.inputStyle} fullWidth value={user.password} onChange={onTextChange} type={userPasswordVisibility ? "text" : "password"} />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography color="secondary">{errorMessage}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Button color="primary" variant="contained" className={classes.inputStyle} type="submit" disabled={user.username.length < 1 || user.password.length < 1 ? true : false}>
                                <>
                                    <Typography>Update</Typography>
                                    {isLoading ? (
                                        <CircularProgress color="inherit" size={30} thickness={5} className={classes.loading} />
                                    ) : ""}
                                </>
                            </Button>
                        </Grid>
                        <br />
                        <Grid item xs={12}>
                            <a href='/loginSignup'>Login / Signup Page</a>
                        </Grid>
                        <br />
                    </form>

                </Paper>
            </Grid>
        </div>
    )
}

export default UpdateUserPassword
