import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  AppBar,
  Toolbar,
  List,
  ListItem,
  Hidden,
  IconButton,
  Drawer,
  Theme,
  Typography,
  Button,
} from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import classNames from 'classnames';
import AuthDialog from './AuthDialog';
import { RootState } from '../../store/rootReducer';
import { logOut } from '../../store/authSlice';

const MENUS = [
  { path: '/', label: 'Home' },
  { path: '/requests', label: 'Requests' },
  { path: '/messages', label: 'Messages' },
  { path: '/profile', label: 'Profile' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const openAuthDialog = (isSignUp: boolean = false) => {
    setMobileOpen(false);
    setIsSignUp(isSignUp);
    setAuthOpen(true);
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const renderLinks = () => (
    <List className={classes.list}>
      {isLoggedIn ? (
        <>
          {MENUS.map((item) => (
            <ListItem
              key={item.label}
              className={classNames(
                classes.listItem,
                pathname === item.path && classes.listItemActive,
              )}
              onClick={() => {
                setMobileOpen(false);
                history.push(item.path);
              }}
            >
              {item.label}
            </ListItem>
          ))}
          <ListItem className={classes.listItem}>
            <Button variant="outlined" color="primary" onClick={handleLogOut}>
              Log out
            </Button>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem className={classes.listItem}>
            <Button variant="outlined" color="primary" onClick={() => openAuthDialog()}>
              Log in
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button variant="contained" color="primary" onClick={() => openAuthDialog(true)}>
              Sign up
            </Button>
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <Box>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.container}>
          <Typography
            variant="h2"
            color="primary"
            className={classes.brand}
            onClick={() => history.push('/')}
          >
            Food Supporter
          </Typography>
          <Hidden smDown implementation="css">
            {renderLinks()}
          </Hidden>
          <Hidden mdUp>
            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle}>
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
        <Hidden mdUp implementation="js">
          <Drawer
            variant="temporary"
            anchor={'right'}
            open={mobileOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
            onClose={handleDrawerToggle}
          >
            <Box className={classes.appResponsive}>{renderLinks()}</Box>
          </Drawer>
        </Hidden>
      </AppBar>
      <AuthDialog
        open={authOpen}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
        onClose={() => setAuthOpen(false)}
      />
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      display: 'flex',
      padding: theme.spacing(1.25, 0),
      color: 'inherit',
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      boxShadow: 'none',
      transition: 'all 150ms ease 0s',
      alignItems: 'center',
      flexFlow: 'row nowrap',
      justifyContent: 'flex-start',
      position: 'relative',
      zIndex: 'unset',
      '&:after': {
        width: '100%',
        content: '""',
        height: '1px',
        backgroundColor: theme.palette.divider,
        position: 'absolute',
        bottom: 0,
      },
    },
    container: {
      minHeight: 50,
      maxWidth: 1200,
      margin: '0 auto',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      display: 'flex',
      flexWrap: 'nowrap',
    },
    drawerPaper: {
      border: 'none',
      bottom: '0',
      transitionProperty: 'top, bottom, width',
      transitionDuration: '.2s, .2s, .35s',
      transitionTimingFunction: 'linear, linear, ease',
      width: 160,
      boxShadow:
        '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
      position: 'fixed',
      display: 'block',
      top: '0',
      height: '100vh',
      right: '0',
      left: 'auto',
      visibility: 'visible',
      overflowY: 'visible',
      borderTop: 'none',
      textAlign: 'left',
      paddingRight: '0px',
      paddingLeft: '0',
      transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
    },
    appResponsive: {
      margin: theme.spacing(3, 2),
    },
    list: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      color: 'inherit',
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    listItem: {
      float: 'left',
      color: 'inherit',
      position: 'relative',
      display: 'block',
      width: 'auto',
      margin: 0,
      cursor: 'pointer',
      padding: theme.spacing(0, 2),
      '&:hover,&:focus': {
        color: theme.palette.primary.main,
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding: theme.spacing(1, 2),
      },
    },
    listItemActive: {
      color: theme.palette.primary.main,
      fontWeight: 'bold',
    },
    brand: {
      fontWeight: 'bold',
      cursor: 'pointer',
    },
  }),
);

export default Navbar;
