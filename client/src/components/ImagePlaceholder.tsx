import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface Props {
  title?: string;
}

const ImagePlaceHolder = (props: Props) => <div className={useStyles(props).image} />;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      height: '100%',
      width: '100%',
      backgroundImage: ({ title = '' }: Props) =>
        `url(https://avatars.dicebear.com/v2/initials/${encodeURIComponent(title)}.svg)`,
    },
  }),
);

export default ImagePlaceHolder;
