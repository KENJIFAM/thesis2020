import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import moment from 'moment';
import classNames from 'classnames';
import ImagePlaceHolder from '../../components/ImagePlaceholder';
import { Chat } from '../../services/types';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { updateActiveChat } from '../../store/chatsSlice';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: (relTime: string) => (relTime === 'now' ? 'now' : `${relTime} ago`),
    s: 'now',
    ss: '%ds',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1mth',
    MM: '%dmth',
    y: '1y',
    yy: '%dy',
  },
});

interface Props {
  chat: Chat;
}

const ChatItem = ({ chat }: Props) => {
  const { to, lastMessage, id } = chat;
  const classes = useStyles();
  const dispatch = useDispatch();
  const activeChat = useSelector((state: RootState) => state.chats.activeChat, shallowEqual);

  const secondaryText = (
    <span className={classes.flexParent}>
      <span className={classNames(classes.truncated, !lastMessage && classes.newMessage)}>
        {lastMessage?.content ?? 'Send first message'}
      </span>
      <span className={classes.dot}>{' · '}</span>
      <span className={classNames(classes.time, !lastMessage && classes.newMessage)}>
        {moment(lastMessage?.createdAt ?? chat.createdAt).fromNow()}
      </span>
    </span>
  );

  return (
    <ListItem
      button
      selected={activeChat?.id === id}
      onClick={() => dispatch(updateActiveChat(chat))}
    >
      <ListItemAvatar>
        <Avatar>
          <ImagePlaceHolder title={to.orgName} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={to.orgName} secondary={secondaryText} />
    </ListItem>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ellipsisText: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      minWidth: 0,
    },
    flexParent: {
      display: 'flex',
      alignItems: 'center',
    },
    truncated: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    newMessage: {
      fontStyle: 'oblique',
    },
    time: {
      whiteSpace: 'nowrap',
    },
    dot: {
      margin: theme.spacing(0, 0.5),
    },
  }),
);

export default React.memo(ChatItem);
