import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, InputBase, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const MessageInput = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <InputBase classes={{ root: classes.root, input: classes.input }} />
      <IconButton color="primary">
        <SendIcon />
      </IconButton>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      margin: 0,
      padding: theme.spacing(0, 1),
      flexDirection: 'row',
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
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
