import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography, MobileStepper, ButtonGroup, Button, Box } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

const tutorialSteps = [
  {
    title: 'San Francisco',
    description: 'Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    title: 'Bird',
    description: '',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    title: 'Bali, Indonesia',
    description: 'Bali, Indonesia Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    title: 'NeONBRAND',
    description: 'Digital Marketing, Las Vegas, United States',
    imgPath:
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    title: 'Goč, Serbia',
    description: 'Goč, SerbiaGoč, SerbiaGoč, SerbiaGoč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

interface Step {
  title: string;
  description: string;
  imgPath: string;
}

interface OwnProps {
  data?: Step[];
  autoInterval?: number;
}

type Props = OwnProps;

const Carousel = ({ data = tutorialSteps, autoInterval }: Props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = data.length;

  useEffect(() => {
    if (autoInterval) {
      const interval = setInterval(() => {
        setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
      }, autoInterval);
      return () => clearInterval(interval);
    }
  }, [autoInterval, maxSteps]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.imgContainer}>
        <Box className={classes.imgInnerContainer}>
          <Box
            className={classes.img}
            style={{ backgroundImage: `url(${data[activeStep].imgPath})` }}
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
          backButton={null}
          nextButton={
            <ButtonGroup size="small">
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                <KeyboardArrowLeft />
              </Button>
              <Button onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                <KeyboardArrowRight />
              </Button>
            </ButtonGroup>
          }
        />
        <Box className={classes.textAreaContent}>
          <Typography variant="h5" className={classes.title}>
            {data[activeStep].title}
          </Typography>
          <Typography variant="body2" className={classes.description}>
            {data[activeStep].description}
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
      '-webkit-user-select': 'none',
      '-moz-user-select': 'none',
      '-ms-user-select': 'none',
      userSelect: 'none',
      display: 'flex',
      '-webkit-box-orient': 'vertical',
      '-webkit-box-direction': 'normal',
      '-ms-flex-direction': 'column',
      flexDirection: 'column',
      '-webkit-perspective': 100,
      perspective: 100,
      '-webkit-perspective-origin': '-50%',
      perspectiveOrigin: '-50%',
    },
    textAreaContent: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    title: {
      marginLeft: -1,
    },
    description: {},
    stepperRoot: {
      backgroundColor: theme.palette.background.paper,
    },
    stepperDot: {
      margin: theme.spacing(0, 1),
    },
  }),
);

export default Carousel;
