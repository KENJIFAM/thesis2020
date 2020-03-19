import React from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { Close as CloseIcon } from '@material-ui/icons';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  IconButton,
  useMediaQuery,
  Box,
  MenuItem,
} from '@material-ui/core';
import useFormField, { FormFieldProps } from '../hooks/useFormField';
import { isValidEmail } from '../services/utils';

export interface AuthForm {
  [field: string]: FormFieldProps<string>;
}

interface Props {
  open: boolean;
  onClose: () => void;
  isSignUp: boolean;
}

const orgTypes = [
  { value: 'SUPERMARKET', label: 'Supermarket' },
  { value: 'NON-PROFIT', label: 'Non-profit organization' },
  { value: 'BUSINESS', label: 'Restaurant & Cafeteria' },
];

const validateFormField = (name: string, formField: FormFieldProps<string>): boolean => {
  switch (name) {
    case 'email':
      const validEmail = isValidEmail(formField.value);
      formField.setError(!validEmail ? `${formField.value} is not a valid email` : '');
      return validEmail;
    case 'password':
      const validPassword = formField.value.length >= 6;
      formField.setError(!validPassword ? 'Password must be at least 6 characters' : '');
      return validPassword;
    case 'orgType':
      const validOrgType = Boolean(formField.value);
      formField.setError(!validOrgType ? 'Please select your organization type' : '');
      return validOrgType;
    case 'orgName':
      const validOrgName = formField.value.length >= 3 || formField.value.length <= 100;
      formField.setError(!validOrgName ? 'Organization name must be 3-100 characters' : '');
      return validOrgName;
    default:
      return true;
  }
};

const validateForm = (form: AuthForm) =>
  Object.entries(form)
    .map(([name, field]) => validateFormField(name, field))
    .reduce((res, field) => res && field, true);

const AuthDialog = ({ open, onClose, isSignUp }: Props) => {
  const email = useFormField<string>('');
  const password = useFormField<string>('');
  const orgType = useFormField<string>('');
  const orgName = useFormField<string>('');
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (
    formField: FormFieldProps<string>,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    console.log(value);

    formField.handleChange(value);
    if (formField.error && value) {
      validateFormField(name, formField);
    }
  };

  const getForm = (): AuthForm =>
    isSignUp ? { email, password, orgType, orgName } : { email, password };

  const onSubmit = () => {
    const form = getForm();
    if (!validateForm(form)) {
      return;
    }
    console.log(form);
  };

  const renderDialogTitle = () => (
    <DialogTitle disableTypography className={classes.dialogTitle}>
      <Typography variant="h6">{isSignUp ? 'Join us!' : 'Welcome back!'}</Typography>
      <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile} maxWidth="sm">
      {renderDialogTitle()}
      <DialogContent dividers>
        <Box className={classes.dialogContent}>
          <form onSubmit={onSubmit}>
            <TextField
              label="Email address"
              placeholder="yourname@domain.com"
              name="email"
              value={email.value}
              onChange={(e) => handleChange(email, e)}
              margin="none"
              type="text"
              autoComplete="username"
              error={Boolean(email.error)}
              helperText={email.error}
              required
              fullWidth
              autoFocus
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Password"
              placeholder="Your password"
              name="password"
              value={password.value}
              onChange={(e) => handleChange(password, e)}
              margin="none"
              type="password"
              autoComplete="current-password"
              error={Boolean(password.error)}
              helperText={password.error}
              required
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            {isSignUp && (
              <>
                <TextField
                  select
                  label="Organization"
                  name="orgType"
                  value={orgType.value}
                  onChange={(e) => handleChange(orgType, e)}
                  margin="none"
                  error={Boolean(orgType.error)}
                  helperText={orgType.error}
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {orgTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Organization name"
                  placeholder="Your organization name"
                  name="text"
                  value={orgName.value}
                  onChange={(e) => handleChange(orgName, e)}
                  margin="none"
                  type="text"
                  error={Boolean(orgName.error)}
                  helperText={orgName.error}
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </>
            )}
            <Box className={classes.dialogAction}>
              <Button
                onClick={onSubmit}
                variant="contained"
                color="primary"
                className={classes.actionBtn}
              >
                {isSignUp ? 'Sign up' : 'Log in'}
              </Button>
              <Button
                onClick={onClose}
                variant="contained"
                color="default"
                className={classes.actionBtn}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogTitle: {
      textAlign: 'center',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    dialogContent: {
      maxWidth: 400,
      margin: '0 auto',
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
    dialogAction: {
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(1, 0, 5),
    },
    actionBtn: {
      margin: theme.spacing(0, 2),
    },
  }),
);

export default AuthDialog;
