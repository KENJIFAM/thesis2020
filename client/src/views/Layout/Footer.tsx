import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Link, Typography, Box, Theme } from '@material-ui/core';

const Footer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="/">
          Food Supporter
        </Link>{' '}
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
      bottom: 0,
      width: '100%',
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  }),
);

export default Footer;
