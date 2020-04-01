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
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import { Request } from '../services/types';

interface Props {
  request: Request;
}

const RequestCard = ({ request }: Props) => {
  const { message, place, startTime, endTime, foodList, reqType, user, createdAt } = request;
  const { orgName, orgType } = user;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Box className={classes.mediaContainer}>
          <LocalGroceryStoreIcon className={classes.media} />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {orgName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {message}
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
    },
    media: {
      fontSize: 50,
    },
  }),
);

export default RequestCard;
