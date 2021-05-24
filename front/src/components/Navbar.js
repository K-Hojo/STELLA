import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import AuthContext from '../operations/auth/context';
import Link from '@material-ui/core/Link'
import { AuthUrls } from '../operations/auth/urls'
import { logoutAction } from '../operations/auth/actions';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box'
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: theme.spacing(4),
  },
  item: {
    marginRight: theme.spacing(2),
  },
}));

const MyNavbar = () => {
  const {auth, dispatch} = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = async (e) => {
    e.preventDefault()

    await axios.post(AuthUrls.LOGOUT)
      .then(res => {
        dispatch(logoutAction());
        sessionStorage.removeItem('token');
        history.push("/");
    })
  }

  const renderAuthItem = () => {
    if(auth.isAuthenticated){
    return <Button onClick={e => handleLogout(e)} size="large" color="inherit" className={classes.item}>ログアウト</Button>
  } else {
    return (
      <div>
        {/* <div style={{padding:10}}> */}
          <Link href="/login" color="inherit" className={classes.item}>ログイン</Link>
        {/* </div> */}
        {/* <div style={{padding:10}}> */}
          <Link href="/signup" color="inherit" className={classes.item}>新規登録</Link>
        {/* </div> */}
      </div>
    )
  }}

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div style={{width: '100%'}}>
          <Box display="flex" flexDirection="row" alignItems="center" justify="flex-start" flexWrap="nowrap">
            <Box >
              <Grid container direction="row" alignItems="center" justify="flex-start">
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h4" className={classes.title}>
                  <Link href="/" color="inherit">stella</Link>
                </Typography>
              </Grid>
            </Box>

            <Box flexGrow={1}>
              <Grid container direction="row" alignItems="center" justify="flex-start">
                <Typography variant="h5" className={classes.item}>
                  <Link href="/search" color="inherit">search</Link>
                </Typography>
                <Typography variant="h5" className={classes.item}>
                  <Link href="/collection" color="inherit">collection</Link>
                </Typography>
              </Grid>
            </Box>
            <Box >
              {/* <div style={{padding:10}}> */}
              <Box display="flex" flexDirection="row" alignItems="center" justify="flex-start" flexWrap="nowrap">
                {/* <Typography variant="button" className={classes.item}> */}
                  {renderAuthItem()}
                {/* </Typography> */}
              </Box>
              {/* </div> */}
            </Box>
          </Box>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}



export default MyNavbar;