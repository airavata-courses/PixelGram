import React, { useEffect } from 'react';
import StartupRoutes from './routes/StartupRoutes'
import UserRoutes from './routes/UserRoutes'
import { getUserIdFromLocalStorage, getUserNameFromLocalStorage, } from './helperClasses/localStorage'
import Toolbar from './components/pages/Toolbar'
import { connect } from "react-redux";
import { userLogin, userLogout } from './store/reducers/auth/authActions'
import { Grid, Typography } from '@material-ui/core'
import './css/main.css'
import './css/normalize.css'
import { Link } from 'react-router-dom'

const mapStateToProps = state => {
  return {
    isUserLoggedIn: state.auth.isUserLoggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogin: () => dispatch(userLogin()),
    userLogout: () => dispatch(userLogout())
  };
};

function App(props) {

  useEffect(() => {
    const userId = getUserIdFromLocalStorage();
    if (userId) {
      props.userLogin();
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', margin: '0', padding: '0' }}>
      <header>
        <div className="header-logo" style={{ display: 'flex', width: '90%' }}>
          <div className="dot"></div>
          <div style={{ display: 'flex', textAlign: 'center', alignItems: 'center', width: '100%', marginTop: '-7px', marginLeft: '-15px' }}>

            <Link to='/'>
              <Typography variant='h6'>PixelGram</Typography>
            </Link>
            {
              props.isUserLoggedIn ? (
                <Toolbar userLogout={props.userLogout} userName={getUserNameFromLocalStorage()} />) : (<></>)
            }
          </div>
        </div>
      </header>

      <div className="pulse">
        <div className="ring"></div>
      </div>

      <main >

        <div style={{ 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'alignContent': 'center', 'alignSelf': 'center', 'textAlign': 'center', 'margin': '0px', 'padding': '0px', 'width': '100%', 'height': '100%' }}>
          {
            props.isUserLoggedIn ? (
              <Grid container alignContent='center' alignItems='center' direction='column'>

                <UserRoutes />
              </Grid>)
              : <StartupRoutes />
          }
        </div>

      </main>
    </div >
  )

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
