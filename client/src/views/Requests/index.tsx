import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Paper, Box, Tabs, Tab } from '@material-ui/core';
import LinkButton from '../../components/LinkButton';

const Requests = () => {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const renderTabs = () => (
    <Paper square className={classes.tabs}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={(e, newValue: number) => setValue(newValue)}
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

      <Paper>Hi</Paper>
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
    },
  }),
);

export default Requests;
