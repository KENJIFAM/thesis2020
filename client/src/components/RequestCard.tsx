import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Theme, Box, IconButton, Avatar } from '@material-ui/core';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import EcoIcon from '@material-ui/icons/Eco';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ChatIcon from '@material-ui/icons/Chat';
import moment from 'moment';
import { Request, User } from '../services/types';
import ImagePlaceHolder from './ImagePlaceholder';

interface Props {
  request: Request;
  deleteRequest: (id: string) => void;
  openChat: (toId: string) => void;
  userId?: string;
}

const mapOrgTypeToIcon = (orgType: User['orgType']) =>
  ({
    SUPERMARKET: LocalGroceryStoreIcon,
    NONPROFIT: EcoIcon,
    RESTAURANT: RestaurantIcon,
    CAFETERIA: LocalCafeIcon,
  }[orgType]);

const RequestCard = ({ request, userId, deleteRequest, openChat }: Props) => {
  const { id, message, startTime, endTime, foodList, user, createdAt } = request;
  const { orgName, orgType } = user;
  const classes = useStyles();
  const Icon = mapOrgTypeToIcon(orgType);

  const renderButtons = () =>
    userId === user.id ? (
      <Box>
        <IconButton className={classes.editButton}>
          <EditIcon />
        </IconButton>
        <IconButton className={classes.deleteButton} onClick={() => deleteRequest(id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    ) : (
      <Box>
        <IconButton className={classes.chatButton} onClick={() => openChat(user.id)}>
          <ChatIcon />
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
          <Box className={classes.userInfo}>
            <Avatar>
              <ImagePlaceHolder title={user.orgName} />
            </Avatar>
            <Box className={classes.userName}>
              <Typography variant="body1">{orgName}</Typography>
              <Typography variant="caption" component="p">
                {moment(createdAt).fromNow()}
              </Typography>
            </Box>
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
    userInfo: {
      display: 'flex',
      alignItems: 'center',
    },
    userName: {
      paddingLeft: theme.spacing(1),
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
    chatButton: {
      '&:hover': {
        color: theme.palette.success.main,
      },
    },
    fieldContent: {
      paddingLeft: theme.spacing(2),
      fontWeight: 500,
    },
  }),
);

export default RequestCard;
