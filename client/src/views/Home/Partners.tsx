import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Theme } from '@material-ui/core';
import MediaCard from '../../components/MediaCard';
import { supermarkets } from '../../services/mocks';

const Partners = () => {
  const classes = useStyles();

  const renderPartners = () =>
    supermarkets.map((sm) => (
      <MediaCard
        key={sm.id}
        name={sm.name}
        description={sm.description}
        image={sm.image}
        containedImage={sm.containedImage}
      />
    ));

  return (
    <Box className={classes.root}>
      <Typography variant="h5" gutterBottom className={classes.header}>
        Our Partners
      </Typography>
      {renderPartners()}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%',
    },
    header: {
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(1),
      },
    },
  }),
);

export default Partners;
