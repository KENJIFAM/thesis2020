import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Paper, Box } from '@material-ui/core';
import ChatList from './ChatList';
import ChatArea from './ChatArea';

const Messages = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography variant="h3" align="center" gutterBottom>
        Messages
      </Typography>
      <Paper className={classes.chatBox} variant="outlined" square elevation={0}>
        <ChatList />
        <ChatArea />
      </Paper>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: theme.spacing(5, 3, 0),
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(4, 0),
      },
    },
    chatBox: {
      width: '100%',
      height: 'calc(100vh - 250px)',
      marginTop: theme.spacing(2),
      display: 'flex',
    },
  }),
);

export default Messages;
