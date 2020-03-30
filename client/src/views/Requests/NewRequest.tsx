import React from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Box, TextField, Button, CircularProgress, Grid } from '@material-ui/core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment, { Moment } from 'moment';
import useFormField, { FormFieldProps } from '../../hooks/useFormField';

const validateFormField = (name: string, value: string): string =>
  value.length < 3 ? `${name} must be at least 3 characters` : '';

const NewRequest = () => {
  const message = useFormField<string>('');
  const place = useFormField<string>('');
  const startTime = useFormField<Moment | null>(moment());
  const endTime = useFormField<Moment | null>(moment());
  const foodList = useFormField<string>('');
  const classes = useStyles();
  const history = useHistory();

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

  const handleCancel = () => history.replace('/requests');

  const onSubmit = () => {};

  return (
    <Box className={classes.container}>
      <Typography variant="h3" align="center" gutterBottom>
        New request
      </Typography>
      <Box className={classes.formWrapper}>
        <form onSubmit={onSubmit}>
          <TextField
            label="Message"
            placeholder="Your message"
            name="message"
            value={message.value}
            onChange={(e) => handleChange(message, e)}
            margin="normal"
            type="text"
            error={Boolean(message.error)}
            helperText={message.error}
            required
            fullWidth
            autoFocus
            multiline
            rows={3}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Place"
            placeholder="Your place"
            name="place"
            value={place.value}
            onChange={(e) => handleChange(place, e)}
            margin="normal"
            type="text"
            error={Boolean(place.error)}
            helperText={place.error}
            required
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <KeyboardDateTimePicker
                  label="Available pickup from"
                  name="startTime"
                  value={startTime.value}
                  onChange={startTime.handleChange}
                  format="DD/MM/YYYY HH:mm"
                  margin="normal"
                  ampm={false}
                  required
                  fullWidth
                  disablePast
                  showTodayButton
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <KeyboardDateTimePicker
                  label="Available pickup to"
                  name="endTime"
                  value={endTime.value}
                  onChange={endTime.handleChange}
                  format="DD/MM/YYYY HH:mm"
                  margin="normal"
                  ampm={false}
                  required
                  fullWidth
                  disablePast
                  showTodayButton
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
          <TextField
            label="Food list"
            placeholder="Food 1, food 2"
            name="text"
            value={foodList.value}
            onChange={(e) => handleChange(foodList, e)}
            margin="normal"
            type="text"
            error={Boolean(foodList.error)}
            helperText={foodList.error}
            required
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          {/* <FormHelperText error variant="outlined">
            {error}
          </FormHelperText> */}
          <Box className={classes.controlButtons}>
            <Button
              onClick={onSubmit}
              variant="contained"
              color="primary"
              className={classes.button}
              // disabled={isLoading}
            >
              {/* {isLoading ? <CircularProgress size={20} /> : isSignUp ? 'Sign up' : 'Log in'} */}
              Create request
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
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: theme.spacing(5, 3),
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(4, 3),
      },
    },
    formWrapper: {
      maxWidth: 600,
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
  }),
);

export default NewRequest;
