import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, List } from '@material-ui/core';
import classNames from 'classnames';
import { fetchMessages } from '../../store/messagesSlice';
import { RootState } from '../../store/rootReducer';
import Spinner from '../../components/Spinner';
import MessageItem from './MessageItem';
import MessageInput from './MessageInput';

const ChatList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading: authLoading } = useSelector(
    (state: RootState) => state.auth,
    shallowEqual,
  );
  const { data: messages, isLoading: messagesLoading } = useSelector(
    (state: RootState) => state.messages,
    shallowEqual,
  );
  const activeChatId = useSelector((state: RootState) => state.chats.activeChatId, shallowEqual);
  const messagesToRender = (activeChatId && messages[activeChatId]) || [];

  useEffect(() => {
    if (isLoggedIn && activeChatId) {
      dispatch(fetchMessages(activeChatId));
    }
  }, [isLoggedIn, activeChatId, dispatch]);

  const renderMessageItems = () =>
    messagesToRender.map((message) => <MessageItem key={message.id} message={message} />);

  if (authLoading || messagesLoading) {
    return (
      <Box className={classNames('', classes.spinner)}>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <List className={classes.chatList}>{renderMessageItems()}</List>
      <MessageInput />
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
    chatList: {
      width: '100%',
      height: 'calc(100% - 52px)',
      padding: 0,
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    spinner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
  }),
);

export default React.memo(ChatList);
