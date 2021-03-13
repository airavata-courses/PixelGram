import React, { useEffect, useState } from 'react'
import { Paper, Grid, Snackbar, Typography, TableContainer, TableRow, Table, TableHead, TableBody, TableCell, IconButton, Checkbox, Tooltip } from '@material-ui/core'
import { ArrowDownward, Visibility, Share } from '@material-ui/icons'
//import data from '../../data/imagesInfo.json'
import UploadImageButton from './UploadImageButton'
import axios from '../../helperClasses/axiosService'
import { UPLOAD_IMAGES, GET_USER_IMAGES } from '../../helperClasses/API_EndPoints'
import { getUserIdFromLocalStorage } from '../../helperClasses/localStorage'
import ImagePreview from './ImagePreview'
import ShareImage from './ShareImage'

const imageIds = ['1y4z5fqcJx_65ALsrwQ5CMjGdUXyxDIEa', '1gEGp_qfcQQsnkh0Jkp-DTtTrt55QZ53_']

function ImageViewer() {

    const [userImages, setUserImages] = useState([]) // {image,type,name,file,isSelected}
    const [isLoading, setIsLoading] = useState(false)
    const [snackbarDetails, setSnackbarDetails] = useState({ state: false, message: '' });
    const [allSelectionCheckbox, setAllSelectionCheckbox] = useState(false)
    const [shareImageDialogDetails, setShareImageDialogDetails] = useState({ dialogState: false, imageIds: '' });
    const [previewImageDialogDetails, setPreviewImageDialogDetails] = useState({ dialogState: false, image: '', imageId: '' });

    useEffect(() => {
        let oldImages = [...userImages]
        setTimeout(() => {
            setUserImages(oldImages)
        }, 3000)
        for (var imageId of imageIds) {
            //debugger;
            axios.get(`${GET_USER_IMAGES}${imageId}`, { responseType: 'blob' }).then(response => {
                console.log(response)
                if (response) {
                    //debugger;
                    let imgId = response.config.url.split('/')[5];
                    let type = response.data.type.split('/')[1]
                    oldImages.push({ image: URL.createObjectURL(response.data), imageId: imgId, isSelected: false, imageType: type })

                }
            }
            ).catch(err => {
                console.log(err)
            })
        }
    }, [])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarDetails({ ...snackbarDetails, state: false });
    };

    const downloadImage = (imageInfo) => {

        const link = document.createElement("a");
        link.href = imageInfo.image;
        link.setAttribute("download", `${imageInfo.imageId}.${imageInfo.imageType}`);
        document.body.appendChild(link);
        link.click();
    }

    const openShareImageDialog = (imageIds) => {
        setShareImageDialogDetails({ dialogState: true, imageIds: imageIds })
    }

    const openPreviewImageDialog = (image, imageId) => {
        setPreviewImageDialogDetails({ dialogState: true, image: image, imageId: imageId })
    }

    const closeShareImageDialog = () => {
        setShareImageDialogDetails({ ...shareImageDialogDetails, dialogState: false })
    }

    const closePreviewImageDialog = () => {
        setPreviewImageDialogDetails({ ...previewImageDialogDetails, dialogState: false })
    }

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
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            });
    }

    const checkBoxToggleEvent = (imageId) => {
        let allImages = userImages.filter(i => i.imageId !== 0)
        let selectedImage = allImages.find(i => i.imageId === imageId);
        selectedImage.isSelected = !selectedImage.isSelected;
        setUserImages(allImages);
        if (selectedImage.isSelected) {
            //debugger;
            let allSelectedImages = allImages.filter(i => i.isSelected)
            if (userImages.length === allSelectedImages.length) {
                setAllSelectionCheckbox(true)
            }
        } else {
            setAllSelectionCheckbox(false)
        }
    }

    const selectAllCheckBoxToggleEvent = () => {
        let allImages = userImages.map(i => ({ ...i, isSelected: !allSelectionCheckbox }))
        setAllSelectionCheckbox(!allSelectionCheckbox)
        setUserImages(allImages);
    }

    const downloadSelectedImages = () => {

        let allImages = userImages.filter(i => i.isSelected)
        for (const imageInfo of allImages)
            downloadImage(imageInfo)
    }

    const shareMultipleImages = () => {
        let allImages = userImages.filter(i => i.isSelected)
        setShareImageDialogDetails({ dialogState: true, imageIds: allImages })
    }

    return (
        <>
            <Grid container direction='column' spacing={2} >
                <Grid item xs={12}>
                    <UploadImageButton uploadImages={uploadImages} isLoading={isLoading} />
                </Grid>
                {userImages && userImages.length > 0 ? (

                    <Grid item style={{ width: '90%', marginLeft: '5%' }}>
                        {
                            userImages.find(i => i.isSelected) &&
                            <Grid item container direction='row' justify='flex-end' alignItems='center'>
                                <Tooltip title='Download Selected Images'>
                                    <IconButton size='small' onClick={downloadSelectedImages}>
                                        <ArrowDownward color='secondary' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Share Selected Images'>
                                    <IconButton size='small' onClick={shareMultipleImages}>
                                        <Share color='secondary' />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        }
                        <Grid item>
                            <TableContainer component={Paper} >
                                <Table size="small" aria-label="a dense table">

                                    <TableHead style={{ 'backgroundColor': 'white', 'fontWeight': 'bolder' }}>
                                        <TableRow>
                                            <TableCell>
                                                <Checkbox
                                                    checked={allSelectionCheckbox}
                                                    onChange={selectAllCheckBoxToggleEvent}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            </TableCell>
                                            <TableCell>Image Type</TableCell>
                                            <TableCell>Image</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userImages.map((imageInfo) => (
                                            <TableRow key={imageInfo.imageId}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={imageInfo.isSelected}
                                                        onChange={() => checkBoxToggleEvent(imageInfo.imageId)}
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                    />
                                                </TableCell>
                                                <TableCell >{imageInfo.imageType}</TableCell>
                                                <TableCell>
                                                    <img height='100px' width='150px' src={imageInfo.image} />
                                                </TableCell>
                                                <TableCell>

                                                    <Tooltip title='Download'>
                                                        <IconButton size='small' onClick={() => downloadImage(imageInfo)}>
                                                            <ArrowDownward color='primary' />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <IconButton size='small' onClick={() => openPreviewImageDialog(imageInfo.image, imageInfo.imageId)}>
                                                        <Visibility color='primary' />
                                                    </IconButton>

                                                    <Tooltip title='Share'>
                                                        <IconButton size='small' onClick={() => openShareImageDialog([imageInfo.imageId])}>
                                                            <Share color='primary' />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                ) : (<Typography>No Images found.Please Upload Images.</Typography>)}
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
            {
                shareImageDialogDetails.dialogState && (
                    <ShareImage closeDialog={closeShareImageDialog} dialogDetails={shareImageDialogDetails} imageIds={shareImageDialogDetails.imageIds} />
                )
            }
            {
                previewImageDialogDetails.dialogState && (
                    <ImagePreview closeDialog={closePreviewImageDialog} dialogDetails={previewImageDialogDetails} image={previewImageDialogDetails.image} />
                )
            }
        </>
    )
}

export default ImageViewer;