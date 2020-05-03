import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Box } from '@material-ui/core';

interface Props {
  title?: string;
  className?: string;
  fontSize?: number;
}

const ImagePlaceHolder = (props: Props) => (
  <Box className={classNames(useStyles(props).image, props.className)} />
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      height: '100%',
      width: '100%',
      backgroundImage: ({ title = '', fontSize = 50 }: Props) =>
        `url(https://avatars.dicebear.com/v2/initials/${encodeURIComponent(
          title,
        )}.svg?options[fontSize]=${fontSize})`,
    },
  }),
);

export default ImagePlaceHolder;
