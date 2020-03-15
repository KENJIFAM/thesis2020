import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Box className={classes.content}>{children}</Box>
      <Footer />
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      marginTop: '0',
      minHeight: 'calc(100vh - 140px)',
    },
  }),
);

export default Layout;
