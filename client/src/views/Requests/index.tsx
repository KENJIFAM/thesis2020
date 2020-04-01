import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Paper, Box, Tabs, Tab } from '@material-ui/core';
import LinkButton from '../../components/LinkButton';
import { fetchRequests } from '../../store/requestsSlice';
import { RootState } from '../../store/rootReducer';
import RequestCard from '../../components/RequestCard';

const Requests = () => {
  const [tab, setTab] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  const requests = useSelector((state: RootState) => state.requests.data, shallowEqual);

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  const renderTabs = () => (
    <Paper square className={classes.tabs}>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={(e, newTab: number) => setTab(newTab)}
        variant="fullWidth"
        centered
      >
        <Tab label="Offers" />
        <Tab label="Needs" />
      </Tabs>
    </Paper>
  );

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
      {Object.entries(requests).map(([id, request]) => (
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
  }),
);

export default Requests;
