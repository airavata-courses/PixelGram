import React, { useState } from 'react'
import { Dialog, DialogTitle, Grid, TextField, Button, CircularProgress, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from '../../helperClasses/axiosService';
import { GET_USER_ID, SHARE_IMAGES } from '../../helperClasses/API_EndPoints'
import { getUserIdFromLocalStorage } from '../../helperClasses/localStorage'

const useStyles = makeStyles((theme) => ({
    fieldControl: {
        width: '80%',
        maxWidth: 300
    },
    buttonControl: {
        width: '40%',
    },
    container: {
        width: 400,
        height: 150,
        minHeight: '100%',
        margin: 10,
    },
    loading: {
        marginLeft: '20px'
    }
}));

function ShareImage({ dialogDetails, closeDialog, openSnackbar }) {

    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const onValueChangeEvent = (e) => {
        setUsername(e.target.value)
        setErrorMessage('')
    }

    const shareImages = () => {
        const userId = getUserIdFromLocalStorage();
        setIsLoading(true)
        axios.post(GET_USER_ID, { username })
            .then(user => {
                const toUserId = user.data.userid;
                if (userId === toUserId) {
                    setErrorMessage('Please select different User')
                    setIsLoading(false)
                    return;
                }
                axios.put(SHARE_IMAGES, { userid: userId, sharedtoids: [toUserId], imageids: dialogDetails.imageIds }).then(result => {
                    console.log('share image result ', result)
                    openSnackbar(result.data.message)
                    setIsLoading(false)
                    closeDialog()
                }).catch(err => {
                    console.log(err);
                    setIsLoading(false)
                })
            }).catch(err => {
                setErrorMessage('Invalid User')
                console.log(err)
                setIsLoading(false)
            })
    }

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Dialog open={dialogDetails.dialogState} onClose={closeDialog}>
                <DialogTitle>Share your images</DialogTitle>
                <Grid container direction="row" justify="center" alignItems="center" spacing={2} className={classes.container}>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="User Name" size="small" fullWidth={true} name="username" value={username} onChange={onValueChangeEvent} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="secondary">{errorMessage}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" onClick={shareImages} className={classes.buttonControl} type="submit" disabled={username.length < 1 ? true : false}>
                            <>
                                <Typography>{isLoading ? 'Sharing...' : 'Share'}</Typography>
                                {isLoading ? (
                                    <CircularProgress color="inherit" size={30} thickness={5} className={classes.loading} />
                                ) : ""}
                            </>
                        </Button>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    )
}

export default ShareImage;
