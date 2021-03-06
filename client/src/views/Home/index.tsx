import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Carousel from './Carousel';
import Partners from './Partners';

const Home = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Carousel autoInterval={5000} />
      <Partners />
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
  }),
);

export default Home;
