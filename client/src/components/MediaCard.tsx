import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Theme,
  Box,
} from '@material-ui/core';

interface Props {
  name: string;
  description: string;
  image: string;
  containedImage?: boolean;
}

const MediaCard = ({ name, description, image, containedImage = false }: Props) => {
  const classes = useStyles(containedImage);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Box className={classes.mediaContainer}>
          <CardMedia className={classes.media} image={image} title={name} />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
      height: '100%',
      [theme.breakpoints.down('xs')]: {
        borderRadius: 0,
      },
    },
    mediaContainer: {
      width: '100%',
      paddingTop: '40%',
      position: 'relative',
    },
    media: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      backgroundColor: theme.palette.common.black,
      backgroundSize: (containedImage: boolean) => (containedImage ? 'contain' : 'cover'),
    },
  }),
);

export default MediaCard;
