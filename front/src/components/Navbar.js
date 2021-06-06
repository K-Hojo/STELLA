import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import AuthContext from '../operations/auth/context';
import { AuthUrls } from '../operations/auth/urls'
import { logoutAction } from '../operations/auth/actions';
import { Link as RouterLink } from 'react-router-dom'
import { Link, AppBar, Toolbar, Typography, Box, Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';



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
          <Link href="/login" color="inherit" className={classes.item}>ログイン</Link>
          <Link href="/signup" color="inherit" className={classes.item}>新規登録</Link>
      </div>
    )
  }}

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div style={{width: '100%'}}>
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" flexWrap="nowrap">
            <Box >
              <Grid container direction="row" alignItems="center" justify="flex-start">
                <Typography variant="h4" className={classes.title}>
                  <Link component={RouterLink} to="/" color="inherit">stella</Link>
                </Typography>
              </Grid>
            </Box>

            <Box flexGrow={1}>
              <Grid container direction="row" alignItems="center" justify="flex-start">
                <Typography variant="h5" className={classes.item}>
                  <Link component={RouterLink} to={{pathname:"/search"}} color="inherit">search</Link>
                </Typography>
                <Typography variant="h5" className={classes.item}>
                  <Link component={RouterLink} to={{pathname:"/collection"}} color="inherit">collection</Link>
                </Typography>
              </Grid>
            </Box>
            <Box >
              <Box display="flex" flexDirection="row" alignItems="center" justify="flex-start" flexWrap="nowrap">
                <Box p={2}>
                  <Typography variant="h6">
                    <Link component={RouterLink} to={{pathname: "/about"}} color="inherit">about</Link>
                  </Typography>
                </Box>
                {renderAuthItem()}
              </Box>
            </Box>
          </Box>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}



export default MyNavbar;