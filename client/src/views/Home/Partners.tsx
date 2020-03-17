import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Theme } from '@material-ui/core';

const Partners = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h5">Our Partners</Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(1),
      },
    },
  }),
);

export default Partners;
