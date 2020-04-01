import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Theme, Box } from '@material-ui/core';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import EcoIcon from '@material-ui/icons/Eco';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import moment from 'moment';
import { Request, User } from '../services/types';

interface Props {
  request: Request;
}

const mapOrgTypeToIcon = (orgType: User['orgType']) =>
  ({
    SUPERMARKET: LocalGroceryStoreIcon,
    NONPROFIT: EcoIcon,
    RESTAURANT: RestaurantIcon,
    CAFETERIA: LocalCafeIcon,
  }[orgType]);

const RequestCard = ({ request }: Props) => {
  const { message, startTime, endTime, foodList, user, createdAt } = request;
  const { orgName, orgType } = user;
  const classes = useStyles();
  const Icon = mapOrgTypeToIcon(orgType);

  return (
    <Card className={classes.root}>
      <Box className={classes.mediaContainer}>
        <Icon className={classes.media} />
      </Box>
      <CardContent>
        <Box>
          <Typography variant="h6">{orgName}</Typography>
          <Typography gutterBottom variant="caption" component="p">
            {moment(createdAt).fromNow()}
          </Typography>
        </Box>
        <Typography variant="body2">{message}</Typography>
        <Typography variant="body2">Time available:</Typography>
        <Typography className={classes.fieldContent} variant="body2" noWrap>
          {moment(startTime).format('ddd D.M, H:mm')} - {moment(endTime).format('ddd D.M, H:mm')}
        </Typography>
        <Typography variant="body2">Food list:</Typography>
        <Typography className={classes.fieldContent} variant="body2">
          {foodList}
        </Typography>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      margin: theme.spacing(2, 0, 1),
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        borderRadius: 0,
      },
    },
    mediaContainer: {
      width: 100,
      minWidth: 100,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    media: {
      fontSize: 80,
    },
    fieldContent: {
      paddingLeft: theme.spacing(2),
      fontWeight: 500,
    },
  }),
);

export default RequestCard;
