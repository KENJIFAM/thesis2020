import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Box } from '@material-ui/core';
import moment from 'moment';
import ImagePlaceHolder from '../../components/ImagePlaceholder';
import { Message } from '../../services/types';

interface Props {
  message: Message;
}

const MessageItem = ({ message }: Props) => {
  const { content, createdAt, from } = message;
  const classes = useStyles();

  const primaryText = (
    <Box className={classes.header}>
      <span>{from.orgName}</span>
      <span className={classes.dot}>{' · '}</span>
      <span className={classes.time}>{moment(createdAt).fromNow()}</span>
    </Box>
  );

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ImagePlaceHolder title={from.orgName} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={primaryText} secondary={content} />
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
    header: {
      display: 'flex',
      alignItems: 'center',
    },
    dot: {
      margin: theme.spacing(0, 0.5),
    },
    time: {
      color: theme.palette.text.secondary,
      fontSize: 14,
    },
  }),
);

export default React.memo(MessageItem);
