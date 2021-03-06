import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, List } from '@material-ui/core';
import classNames from 'classnames';
import { fetchMessages } from '../../store/messagesSlice';
import { RootState } from '../../store/rootReducer';
import Spinner from '../../components/Spinner';
import MessageItem from './MessageItem';
import MessageInput from './MessageInput';

const ChatArea = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading: authLoading, user } = useSelector(
    (state: RootState) => state.auth,
    shallowEqual,
  );
  const { data: messages, isLoading: messagesLoading } = useSelector(
    (state: RootState) => state.messages,
    shallowEqual,
  );
  const activeChat = useSelector((state: RootState) => state.chats.activeChat, shallowEqual);
  const activeChatId = activeChat?.id;
  const messagesToRender = (activeChatId && messages[activeChatId]) || [];

  useEffect(() => {
    if (isLoggedIn && activeChatId) {
      dispatch(fetchMessages(activeChatId));
    }
  }, [isLoggedIn, activeChatId, dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [messagesToRender]);

  const renderMessageItems = () =>
    messagesToRender.map((message) => <MessageItem key={message.id} message={message} />);

  const endMessageRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () =>
    endMessageRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });

  if (authLoading || messagesLoading) {
    return (
      <Box className={classNames(classes.root, classes.spinner)}>
        <Spinner />
      </Box>
    );
  }

  if (!activeChat || !user) {
    return null;
  }

  return (
    <Box className={classes.root}>
      <List className={classes.messages}>
        {renderMessageItems()}
        <div ref={endMessageRef} />
      </List>
      <MessageInput activeChat={activeChat} currentUserId={user.id} />
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flex: 3,
      flexDirection: 'column',
      borderLeft: `1px solid ${theme.palette.divider}`,
      position: 'relative',
      overflow: 'hidden',
    },
    messages: {
      width: '100%',
      height: 'calc(100% - 52px)',
      padding: 0,
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    spinner: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
  }),
);

export default React.memo(ChatArea);
