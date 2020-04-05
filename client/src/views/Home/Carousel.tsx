import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography, MobileStepper, Button, Box } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import axios from '../../apis';

export interface Step {
  title: string;
  description: string;
  imgPath: string;
}

interface Props {
  autoInterval?: number;
}

const Carousel = ({ autoInterval }: Props) => {
  const classes = useStyles();
  const [feeds, setFeeds] = useState<Step[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = feeds.length;

  useEffect(() => {
    (async () => {
      const feeds = await axios.get('/public/feeds');
      setFeeds(feeds.data);
    })();
  }, []);

  useEffect(() => {
    if (autoInterval) {
      const interval = setInterval(() => {
        setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
      }, autoInterval);
      return () => clearInterval(interval);
    }
  }, [autoInterval, maxSteps]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1) % maxSteps);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.imgContainer}>
        <Box className={classes.imgInnerContainer}>
          <Box
            className={classes.img}
            style={{ backgroundImage: `url(${feeds[activeStep]?.imgPath})` }}
          />
        </Box>
      </Box>
      <Box className={classes.textArea}>
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="dots"
          activeStep={activeStep}
          classes={{
            root: classes.stepperRoot,
            dot: classes.stepperDot,
          }}
          backButton={
            <Button
              size="small"
              variant="outlined"
              onClick={handleBack}
              // disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
            </Button>
          }
          nextButton={
            <Button
              size="small"
              variant="outlined"
              onClick={handleNext}
              // disabled={activeStep === maxSteps - 1}
            >
              <KeyboardArrowRight />
            </Button>
          }
        />
        <Box className={classes.textAreaContent}>
          <Typography variant="h5" className={classes.title}>
            {feeds[activeStep]?.title}
          </Typography>
          <Typography variant="body1" className={classes.description}>
            {feeds[activeStep]?.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%',
      height: 0,
      paddingTop: '37.19298%',
      background: theme.palette.background.paper,
      '-webkit-box-shadow': '0 1px 4px 0 rgba(32,33,37,0.06)',
      boxShadow: '0 1px 4px 0 rgba(32,33,37,0.06)',
      borderRadius: 4,
      marginBottom: 44,
      [theme.breakpoints.down('sm')]: {
        paddingTop: '40%',
        marginBottom: 70,
      },
    },
    imgContainer: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '66.14035%',
      overflow: 'hidden',
      borderRadius: '4px 0 0 4px',
      touchAction: 'pan-y pinch-zoom',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        borderRadius: 4,
      },
      [theme.breakpoints.down('xs')]: {
        borderRadius: 0,
      },
    },
    imgInnerContainer: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      // borderRadius: '4px 0 0 4px',
    },
    img: {
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      transition: 'opacity 0.3s linear',
      // borderRadius: '4px 0 0 4px',
    },
    textArea: {
      position: 'absolute',
      top: 0,
      left: '66.14035%',
      right: 0,
      bottom: 0,
      padding: theme.spacing(2, 2, 2, 3),
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: '0 4px 4px 0',
      borderLeft: 'none',
      userSelect: 'none',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('sm')]: {
        left: 0,
        padding: theme.spacing(3, 2),
        border: 'none',
        pointerEvents: 'none',
        '&::before': {
          content: '""',
          borderRadius: 4,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            'linear-gradient(-180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.06) 30%, rgba(0,0,0,0.14) 50%, rgba(0,0,0,0.27) 70%, rgba(0,0,0,0.41) 90%, rgba(0,0,0,0.48) 100%)',
        },
      },
    },
    textAreaContent: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        color: theme.palette.common.white,
        justifyContent: 'flex-end',
        transform: 'translate3d(0px, 0px, 0px)',
      },
    },
    title: {
      marginLeft: -1,
    },
    description: {},
    stepperRoot: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1, 0),
      [theme.breakpoints.down('sm')]: {
        backgroundColor: theme.palette.background.default,
        position: 'absolute',
        width: '100%',
        bottom: -50,
        left: 0,
        pointerEvents: 'auto',
      },
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(1),
      },
    },
    stepperDot: {
      margin: theme.spacing(0, 1),
    },
  }),
);

export default Carousel;
