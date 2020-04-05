import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Theme, Grid } from '@material-ui/core';
import MediaCard from '../../components/MediaCard';
import axios from '../../apis';

interface Partner {
  id: string;
  name: string;
  description: string;
  containedImage?: boolean;
}

const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const partners = await axios.get('/public/partners');
      setPartners(partners.data);
    })();
  }, []);

  const renderPartners = () =>
    partners.map((sm) => (
      <Grid item key={sm.id} xs={12} sm={6} md={4}>
        <MediaCard name={sm.name} description={sm.description} containedImage={sm.containedImage} />
      </Grid>
    ));

  return (
    <Box className={classes.root}>
      <Typography variant="h5" gutterBottom className={classes.header}>
        Our Partners
      </Typography>
      <Grid container spacing={2} className={classes.list}>
        {renderPartners()}
      </Grid>
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
      fontWeight: 600,
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(1),
      },
    },
    list: {
      paddingTop: theme.spacing(2),
    },
  }),
);

export default Partners;
