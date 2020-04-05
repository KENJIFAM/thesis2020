import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, Typography, Theme, Box } from '@material-ui/core';
import ImagePlaceHolder from './ImagePlaceholder';

interface Props {
  name: string;
  description: string;
  containedImage?: boolean;
}

const MediaCard = ({ name, description, containedImage = false }: Props) => {
  const classes = useStyles(containedImage);

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionArea}>
        <Box className={classes.mediaContainer}>
          <ImagePlaceHolder title={name} className={classes.media} fontSize={30} />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
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
    actionArea: {
      height: '100%',
      flexDirection: 'column',
      alignItems: 'stretch',
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
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: (containedImage: boolean) => (containedImage ? 'contain' : 'cover'),
    },
  }),
);

export default MediaCard;
