import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, List } from '@material-ui/core';
import classNames from 'classnames';
import { fetchChats, updateActiveChatId } from '../../store/chatsSlice';
import { RootState } from '../../store/rootReducer';
import ChatItem from './ChatItem';
import { Chat } from '../../services/types';
import Spinner from '../../components/Spinner';

const getChatLastTime = (chat: [string, Chat]) => new Date(chat[1].lastMessage.createdAt).getTime();

const sortChats = (a: [string, Chat], b: [string, Chat]) => getChatLastTime(b) - getChatLastTime(a);

const ChatList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading: authLoading } = useSelector(
    (state: RootState) => state.auth,
    shallowEqual,
  );
  const { data: chats, isLoading: chatsLoading, activeChatId } = useSelector(
    (state: RootState) => state.chats,
    shallowEqual,
  );
  const chatsToRender = Object.entries(chats).sort(sortChats);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchChats());
    }
  }, [isLoggedIn, dispatch]);

  useEffect(() => {
    if (chatsToRender.length && !activeChatId) {
      dispatch(updateActiveChatId(chatsToRender[0][1].id));
    }
  }, [chatsToRender, dispatch, activeChatId]);

  const renderSpinner = () => (
    <Box className={classNames('', classes.spinner)}>
      <Spinner />
    </Box>
  );

  const renderChatItems = () =>
    chatsToRender.map(([toId, chat]) => <ChatItem key={toId} chat={chat} />);

  return (
    <Box className={classes.root}>
      {authLoading || chatsLoading ? (
        renderSpinner()
      ) : (
        <List className={classes.chatList}>{renderChatItems()}</List>
      )}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: '0 0 25%',
      maxWidth: 420,
      minWidth: 285,
      overflowY: 'auto',
      overflowX: 'hidden',
      position: 'relative',
      height: '100%',
      outline: 'none',
    },
    chatList: {
      width: '100%',
      padding: 0,
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
