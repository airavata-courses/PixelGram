import React from 'react'
import { IconButton, Typography, Grid, Tooltip } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'

function Toolbar({ userLogout, userName }) {

    return (
        <Grid item container direction="row" justify="flex-end" alignItems="center" spacing={2}>
            <Grid item >
                <Typography>{userName}</Typography>
            </Grid>
            <Grid item >
                <Tooltip title='Logout'>
                    <IconButton size='small' onClick={userLogout}>
                        <ExitToApp color='secondary' />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    )
}

export default Toolbar;