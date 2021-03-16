import React, { useState } from 'react'
import { Button, CircularProgress, Typography } from '@material-ui/core'

function UploadImageButton({ uploadImages, isLoading }) {

    const [files, setFiles] = useState();
    const [fileNames, setFileNames] = useState();

    const filesSelectedEvent = (e) => {
        let selectedFileNames = [];
        for (const file of e.target.files) {
            selectedFileNames.push({ name: file.name })
        }
        setFileNames(selectedFileNames)
        setFiles(e.target.files);
    }

    const uploadFiles = () => {
        uploadImages(files)
        setFileNames([])
        setFiles([])
    }

    return (
        <div>
            <input
                accept="image/*"
                id="button-file"
                multiple
                type="file"
                style={{ 'display': 'none', }}
                onChange={filesSelectedEvent}
            />
            <label htmlFor='button-file'>
                <Button variant="contained" color="primary" component="span" style={{ 'padding': '2', 'backgroundColor': 'gray' }}>Choose files</Button>
            </label>
            {
                fileNames && fileNames.length > 0 && fileNames.map(file => (<Typography key={file.name}>{file.name}</Typography>))
            }
            <br />
            <br />
            <Button variant="contained" color="primary" onClick={uploadFiles}>
                <>
                    <Typography>{isLoading ? 'Uploading...' : 'Upload'}</Typography>
                    {isLoading ? (
                        <CircularProgress color="inherit" size={30} thickness={5} style={{ marginLeft: '20px' }} />
                    ) : ""}
                </>
            </Button>

        </div>
    )
}

export default UploadImageButton;