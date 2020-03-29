import React from 'react';
import { Link } from 'react-router-dom';
import Button, { ButtonProps } from '@material-ui/core/Button';

const LinkButton = <Link extends typeof Link>(props: ButtonProps<Link>) => (
  <Button {...props} component={Link} />
);

export default LinkButton;
