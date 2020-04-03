import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import socketIoClient from 'socket.io-client';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Paper, Box } from '@material-ui/core';
// import classNames from 'classnames';
// import LinkButton from '../../components/LinkButton';
// import { fetchRequests, deleteRequest } from '../../store/requestsSlice';
// import { RootState } from '../../store/rootReducer';
// import RequestCard from '../../components/RequestCard';
// import { Request } from '../../services/types';
// import Spinner from '../../components/Spinner';

const Messages = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  const classes = useStyles();
  const socket = socketIoClient('/', {
    path: '/api/chat',
  });

  useEffect(() => {
    socket.on('message', (msg: { content: string[] }) => {
      setMessages(msg.content);
      setCount(count + 1);
    });
  }, []);

  const onSubmit = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent> | React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    socket.emit('message', { content: message });
  };

  return (
    <Box className={classes.container}>
      <Typography variant="h3" align="center" gutterBottom>
        Messages
      </Typography>
      <form onSubmit={onSubmit}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <input type="submit" value="Send" onClick={onSubmit} />
      </form>
      <Paper className={classes.chatBox}>
        {count}
        {messages.map((m, i) => (
          <Typography key={i}>{m}</Typography>
        ))}
      </Paper>
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
    chatBox: {
      width: '100%',
      height: 'calc(100vh - 300px)',
      marginTop: theme.spacing(2),
    },
  }),
);

export default Messages;
