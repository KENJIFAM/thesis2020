import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface Props {
  size?: number;
}

const Spinner = ({ size = 64 }: Props) => {
  const classes = useStyles(size);
  return <div className={classes.root} />;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: 'transparent',
      width: (size: number) => size,
      height: (size: number) => size,
      borderRadius: '100%',
      border: (size: number) => `${size / 20}px solid ${theme.palette.primary.main}`,
      borderBottomColor: 'transparent',
      display: 'inline-block',
      animation: '$clip 0.75s 0s infinite linear',
      animationFillMode: 'both',
    },
    '@keyframes clip': {
      '0%': { transform: 'rotate(0deg) scale(1)' },
      '50%': { transform: 'rotate(180deg) scale(0.8)' },
      '100%': { transform: 'rotate(360deg) scale(1)' },
    },
  }),
);

export default Spinner;
