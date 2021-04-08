import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Snackbar, AppBar, Tabs, Tab, Box, Typography, Paper } from '@material-ui/core'
import UploadImageButton from './UploadImageButton'
import axios from '../../helperClasses/axiosService'
import { UPLOAD_IMAGES } from '../../helperClasses/API_EndPoints'
import { getUserIdFromLocalStorage } from '../../helperClasses/localStorage'
import ViewImages from './ViewImages';
import ViewSharedImages from './ViewSharedImages'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        //flexGrow: 1,
        width: '90%',
        marginLeft: '5%', marginRight: '5%',
        backgroundColor: 'lightgray',
    },
}));

function ImageViewer() {

    const [isLoading, setIsLoading] = useState(false)
    const [snackbarDetails, setSnackbarDetails] = useState({ state: false, message: '' });
    const [imageUploadCount, setImageUploadCount] = useState(0)

    const [value, setValue] = React.useState(0);

    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarDetails({ ...snackbarDetails, state: false });
    };

    const uploadImages = async (files) => {
        setIsLoading(true)
        const formData = new FormData();
        for (let file of files) {
            formData.append('images', file)
        }
        const userId = getUserIdFromLocalStorage();
        axios.post(`${UPLOAD_IMAGES}${userId}`, formData)
            .then(response => {
                console.log(response)
                setIsLoading(false)
                setSnackbarDetails({ state: true, message: `${response.data.success.length} images uploaded successfully` })
                setImageUploadCount(imageUploadCount + 1)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            });
    }

    const openSnackbar = (message) => {
        setSnackbarDetails({ state: true, message })
    }

    return (
        <>
            <Grid container direction='column' spacing={2} >
                <Grid item xs={12}>
                    <UploadImageButton uploadImages={uploadImages} isLoading={isLoading} />
                </Grid>
                <Paper className={classes.root}>
                    <AppBar position="static" style={{ maxHeight: '50px', paddingTop: '0px', paddingBottom: '50px' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="My Images" {...a11yProps(0)} />
                            <Tab label="Images shared with me" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <ViewImages openSnackbar={openSnackbar} imageUploadCount={imageUploadCount} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ViewSharedImages openSnackbar={openSnackbar} />
                    </TabPanel>
                </Paper>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={snackbarDetails.state}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    message={snackbarDetails.message}
                />
            </Grid>

        </>
    )
}

export default ImageViewer;