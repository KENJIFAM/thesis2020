import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import socketIoClient from 'socket.io-client';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, InputBase, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { Message, Chat, ChatResponse } from '../../services/types';
import {
  updateActiveChat,
  updateChatFromChatResponse,
  getChatFromChatResponse,
} from '../../store/chatsSlice';
import { updateMessage } from '../../store/messagesSlice';

interface ChatData {
  message: Message;
  chat: ChatResponse;
}

interface Props {
  activeChat: Chat;
  currentUserId: string;
}

const MessageInput = ({ activeChat, currentUserId }: Props) => {
  const [inputMessage, setInputMessage] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();

  const socket = socketIoClient('/', {
    path: '/api/chatlive',
  });

  useEffect(() => {
    socket.on('message', ({ message, chat }: ChatData) => {
      dispatch(updateActiveChat(getChatFromChatResponse(chat, currentUserId)));
      dispatch(updateChatFromChatResponse(chat));
      dispatch(updateMessage(message));
    });
    return () => {
      socket.removeAllListeners();
      socket.close();
    };
  }, [socket, dispatch, currentUserId]);

  const onSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (inputMessage.length) {
      socket.emit('message', {
        content: inputMessage,
        from: currentUserId,
        to: activeChat.to.id,
        chatId: activeChat.id,
      });
      setInputMessage('');
    }
  };

  return (
    <Box className={classes.container}>
      <form onSubmit={onSubmit} className={classes.form}>
        <InputBase
          classes={{ root: classes.root, input: classes.input }}
          placeholder="Type your message"
          name="inputMessage"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          type="text"
        />
        <IconButton color="primary" type="submit" onClick={onSubmit}>
          <SendIcon />
        </IconButton>
      </form>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: 0,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    form: {
      display: 'flex',
      alignItems: 'center',
      margin: 0,
      padding: theme.spacing(0, 1),
      flexDirection: 'row',
      overflow: 'hidden',
      position: 'relative',
    },
    root: {
      backgroundColor: `rgba(0, 0, 0, .05)`,
      borderRadius: 18,
      display: 'flex',
      flex: `1 1 auto`,
      margin: theme.spacing(1),
      minWidth: 100,
      padding: theme.spacing(0, 1, 0, 1.5),
      fontSize: 14,
      lineHeight: 1.28,
    },
    input: {
      padding: theme.spacing(1.125, 0),
      height: 18,
    },
  }),
);

export default React.memo(MessageInput);
