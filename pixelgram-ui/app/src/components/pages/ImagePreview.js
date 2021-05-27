import React, { useEffect, useState } from 'react'
import { Dialog, Typography, Grid, } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
//import { getUserNameFromLocalStorage } from '../../helperClasses/localStorage'
import ReactImageMagnify from 'react-image-magnify';
import { GET_IMAGE_DETAILS } from '../../helperClasses/API_EndPoints'
import axios from 'axios';

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
        height: 380,
        minHeight: '100%',
        margin: 10,
    },
}));

function ImagePreview({ dialogDetails, closeDialog }) {

    const [imageDetails, setImageDetails] = useState({})

    useEffect(() => {
        axios.post(GET_IMAGE_DETAILS, { imageid: dialogDetails.imageId }).then(result => {
            console.log('image details ', result.data);
            setImageDetails(result.data)
        }).catch(err => {
            console.log(err);
        }) //get image details
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
                        <Typography >Location </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>{imageDetails.locationname}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography >Latitude </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography >{imageDetails.latitude}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography >Longitude </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography >{imageDetails.longitude}</Typography>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    )
}

export default ImagePreview;
