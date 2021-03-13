import React, { useEffect } from 'react'
import { Dialog, Typography, Grid, } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { getUserNameFromLocalStorage } from '../../helperClasses/localStorage'
import ReactImageMagnify from 'react-image-magnify';

const useStyles = makeStyles((theme) => ({
    fieldControl: {
        width: '80%',
        maxWidth: 300
    },
    buttonControl: {
        width: '40%',
    },
    container: {
        width: 450,
        height: 350,
        minHeight: '100%',
        margin: 10,
    },
}));

function ImagePreview({ dialogDetails, closeDialog }) {

    useEffect(() => {
        //axios.get() //get image details
    }, [dialogDetails.imageId])

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Dialog open={dialogDetails.dialogState} onClose={closeDialog}>

                <Grid container direction="row" justify="center" alignItems="center" spacing={2} className={classes.container}>
                    <Grid item xs={12}>
                        {/* <img src={dialogDetails.image} height='200px' width='350px' /> */}
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Pixelgram Image',
                                isFluidWidth: false,
                                src: dialogDetails.image,
                                width: 400,
                                height: 250,
                            },
                            largeImage: {
                                src: dialogDetails.image,
                                width: 600,
                                height: 500,
                            },
                            enlargedImagePosition: 'over'
                        }} />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography >Uploaded by </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>{getUserNameFromLocalStorage()}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography >Location </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography >Delhi</Typography>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    )
}

export default ImagePreview;
