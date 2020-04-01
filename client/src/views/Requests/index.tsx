import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Paper, Box, Tabs, Tab } from '@material-ui/core';
import classNames from 'classnames';
import LinkButton from '../../components/LinkButton';
import { fetchRequests } from '../../store/requestsSlice';
import { RootState } from '../../store/rootReducer';
import RequestCard from '../../components/RequestCard';
import { Request } from '../../services/types';
import Spinner from '../../components/Spinner';

const Requests = () => {
  const [tab, setTab] = useState<Request['reqType']>('offer');
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading: authLoading } = useSelector(
    (state: RootState) => state.auth,
    shallowEqual,
  );
  const { data: requests, isLoading: requestsLoading } = useSelector(
    (state: RootState) => state.requests,
    shallowEqual,
  );
  const requestsToRender = Object.entries(requests).filter(
    ([id, request]) => request.reqType === tab,
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchRequests());
    }
  }, [isLoggedIn, dispatch]);

  const renderTabs = () => (
    <Paper square className={classes.tabs}>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={(e, newTab: Request['reqType']) => setTab(newTab)}
        variant="fullWidth"
        centered
      >
        <Tab value="offer" label="Offers" />
        <Tab value="need" label="Needs" />
      </Tabs>
    </Paper>
  );

  if (authLoading || requestsLoading) {
    return (
      <Box className={classNames(classes.container, classes.spinner)}>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box className={classes.container}>
      <Typography variant="h3" align="center" gutterBottom>
        Food requests
      </Typography>
      {renderTabs()}
      <Box className={classes.newButtonWrapper}>
        <LinkButton to="/requests/new" variant="contained" color="primary">
          New request
        </LinkButton>
      </Box>
      {requestsToRender.map(([id, request]) => (
        <RequestCard key={id} request={request} />
      ))}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: theme.spacing(5, 3),
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(4, 0),
      },
    },
    tabs: {
      maxWidth: 600,
      margin: '0 auto',
    },
    newButtonWrapper: {
      margin: theme.spacing(2, 0),
      display: 'flex',
      justifyContent: 'flex-end',
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(0, 2),
      },
    },
    spinner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 140px)',
    },
  }),
);

export default Requests;
