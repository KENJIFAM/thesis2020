import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
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
  DialogActions,
  CircularProgress,
  FormHelperText,
} from '@material-ui/core';
import useFormField, { FormFieldProps } from '../../hooks/useFormField';
import { isValidEmail } from '../../services/utils';
import { auth, authReset } from '../../store/authSlice';
import { LogInFormData, SignUpFormData } from '../../services/types';
import { RootState } from '../../store/rootReducer';

type LogInField = 'email' | 'password';
type SignUpField = LogInField | 'orgType' | 'orgName';

type AuthForm =
  | { [key in LogInField]: FormFieldProps<string> }
  | { [key in SignUpField]: FormFieldProps<string> };

interface Props {
  open: boolean;
  onClose: () => void;
  isSignUp: boolean;
  setIsSignUp: (isSignUp: boolean) => void;
}

const orgTypes = [
  { value: 'SUPERMARKET', label: 'Supermarket' },
  { value: 'NON-PROFIT', label: 'Non-profit organization' },
  { value: 'BUSINESS', label: 'Restaurant & Cafeteria' },
];

const validateFormField = (name: string, value: string): string => {
  switch (name) {
    case 'email':
      const validEmail = isValidEmail(value);
      return !validEmail ? `${value} is not a valid email` : '';
    case 'password':
      const validPassword = value.length >= 6;
      return !validPassword ? 'Password must be at least 6 characters' : '';
    case 'orgType':
      const validOrgType = Boolean(value);
      return !validOrgType ? 'Please select your organization type' : '';
    case 'orgName':
      const validOrgName = value.length >= 3 || value.length <= 100;
      return !validOrgName ? 'Organization name must be 3-100 characters' : '';
    default:
      return '';
  }
};

const validateForm = (form: AuthForm): boolean =>
  Object.entries(form)
    .map(([name, field]) => {
      const error = validateFormField(name, field.value);
      field.setError(error);
      return !error;
    })
    .reduce((res, field) => res && field, true);

const createAuthFormData = (form: AuthForm): LogInFormData | SignUpFormData =>
  Object.fromEntries(Object.entries(form).map(([name, field]) => [name, field.value])) as {
    [K in keyof AuthForm]: string;
  };

const AuthDialog = ({ open, onClose, isSignUp, setIsSignUp }: Props) => {
  const email = useFormField<string>('');
  const password = useFormField<string>('');
  const orgType = useFormField<string>('');
  const orgName = useFormField<string>('');
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const { error, isLoading, isLoggedIn } = useSelector(
    (state: RootState) => state.auth,
    shallowEqual,
  );

  useEffect(() => {
    if (isLoggedIn) {
      onClose();
    }
  }, [isLoggedIn, onClose]);

  const handleChange = (
    formField: FormFieldProps<string>,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    formField.handleChange(value);
    if (formField.error && value) {
      formField.setError(validateFormField(name, value));
    }
  };

  const handleCancel = () => {
    onClose();
    dispatch(authReset());
  };

  const getForm = (): AuthForm =>
    isSignUp ? { email, password, orgType, orgName } : { email, password };

  const onSubmit = () => {
    const form = getForm();
    if (!validateForm(form)) {
      return;
    }
    const formData = createAuthFormData(form);
    dispatch(auth(isSignUp ? 'signup' : 'login', formData));
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
    <Dialog
      open={open}
      onClose={handleCancel}
      fullWidth
      fullScreen={isMobile}
      maxWidth="sm"
      disableScrollLock
    >
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
              margin="normal"
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
              margin="normal"
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
                  margin="normal"
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
                  margin="normal"
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
            <FormHelperText error variant="outlined">
              {error}
            </FormHelperText>
            <Box className={classes.controlButtons}>
              <Button
                onClick={onSubmit}
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={20} /> : isSignUp ? 'Sign up' : 'Log in'}
              </Button>
              <Button
                onClick={handleCancel}
                variant="contained"
                color="default"
                className={classes.button}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Typography>
          {isSignUp ? 'Already have an account? ' : 'Not have an account yet? '}
          <span className={classes.textAction} onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Log in!' : 'Sign up!'}
          </span>
        </Typography>
      </DialogActions>
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
    },
    controlButtons: {
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(2, 0, 5),
    },
    button: {
      margin: theme.spacing(0, 2),
      minWidth: 82,
    },
    dialogAction: {
      justifyContent: 'center',
    },
    textAction: {
      color: theme.palette.primary.main,
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  }),
);

export default AuthDialog;
