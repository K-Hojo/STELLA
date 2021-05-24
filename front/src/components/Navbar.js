import React from 'react';
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container:{

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
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid container direction="row" alignItems="center" justify="flex-start">
            <Grid item>
              <Grid container direction="row" alignItems="center" justify="flex-start">
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h4" className={classes.title}>
                  <Link href="/" color="inherit">stella</Link>
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction="row" alignItems="center" justify="flex-start">
                <Typography variant="h5" className={classes.item}>
                  <Link href="/search" color="inherit">search</Link>
                </Typography>
                <Typography variant="h5" className={classes.item}>
                  <Link href="/collection" color="inherit">collection</Link>
                </Typography>
              </Grid>
            </Grid>
            <Grid item >
              <Grid container direction="row" alignItems="center" >
                <Typography variant="h6" className={classes.item}>
                  {/* {auth && <Link href="/logout" color="inherit">ログアウト</Link>}
                  {!auth && <Link href="/login" color="inherit">ログイン</Link>} */}
                </Typography>
                <Typography variant="h6" className={classes.item}>
                  <Link href="/signup" color="inherit">新規登録</Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MyNavbar;