import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Theme, Box, IconButton } from '@material-ui/core';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import EcoIcon from '@material-ui/icons/Eco';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import { Request, User } from '../services/types';

interface Props {
  request: Request;
  deleteRequest: (id: string) => void;
  userId?: string;
}

const mapOrgTypeToIcon = (orgType: User['orgType']) =>
  ({
    SUPERMARKET: LocalGroceryStoreIcon,
    NONPROFIT: EcoIcon,
    RESTAURANT: RestaurantIcon,
    CAFETERIA: LocalCafeIcon,
  }[orgType]);

const RequestCard = ({ request, userId, deleteRequest }: Props) => {
  const { id, message, startTime, endTime, foodList, user, createdAt } = request;
  const { orgName, orgType } = user;
  const classes = useStyles();
  const Icon = mapOrgTypeToIcon(orgType);

  const renderButtons = () =>
    userId === user.id && (
      <Box>
        <IconButton className={classes.editButton}>
          <EditIcon />
        </IconButton>
        <IconButton className={classes.deleteButton} onClick={() => deleteRequest(id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    );

  return (
    <Card className={classes.root}>
      <Box className={classes.mediaContainer}>
        <Icon className={classes.media} />
      </Box>
      <CardContent className={classes.cardContent}>
        <Box className={classes.header}>
          <Box>
            <Typography variant="h6">{orgName}</Typography>
            <Typography gutterBottom variant="caption" component="p">
              {moment(createdAt).fromNow()}
            </Typography>
          </Box>
          {renderButtons()}
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
    cardContent: {
      width: '100%',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    editButton: {
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    deleteButton: {
      '&:hover': {
        color: theme.palette.error.main,
      },
    },
    fieldContent: {
      paddingLeft: theme.spacing(2),
      fontWeight: 500,
    },
  }),
);

export default RequestCard;
