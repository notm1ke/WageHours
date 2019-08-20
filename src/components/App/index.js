import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import Result from '../Result';
import tlue from '../../colors/tlue';
import './App.css';

const theme = createMuiTheme({
  palette: {
      primary: tlue,
      type: 'dark'
  }
});

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 3),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Details', 'Result'];

function getStepContent(step, params) {
  switch (step) {
    case 1:
      return <Result data={params} />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [start, setStart] = React.useState(null);
  const [end, setEnd] = React.useState(null);
  const [wage, setWage] = React.useState(10.10);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleStart = (date) => {
    setStart(date);
  }

  const handleEnd = (date) => {
    setEnd(date);
  }

  const handleWage = (event) => {
    setWage(event.target.value);
  }

  const renderButton = () => {
    if (start && end && wage) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
        >
          {activeStep === steps.length - 1 ? 'Done' : 'Next'}
        </Button>
      );
    }
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
        className={classes.button}
        disabled
      >
        {activeStep === steps.length - 1 ? 'Done' : 'Next'}
      </Button>
    )
  } 

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CssBaseline />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {
                  activeStep === steps.length && (
                    <React.Fragment>
                      { window.location.reload() }
                    </React.Fragment>
                  )}
                {
                  activeStep === steps.length - 2 && (
                  <React.Fragment>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                          <KeyboardTimePicker
                              margin="normal"
                              id="start"
                              label="When did you start working?"
                              value={start}
                              fullWidth
                              onChange={handleStart}
                              KeyboardButtonProps={{
                                  'aria-label': 'change time',
                              }}
                          />
                      </Grid>
                      <Grid item xs={12} md={6}>
                          <KeyboardTimePicker
                              margin="normal"
                              id="end"
                              label="When did you stop working?"
                              value={end}
                              fullWidth
                              onChange={handleEnd}
                              KeyboardButtonProps={{
                                  'aria-label': 'change time',
                              }}
                          />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <TextField
                          id="wage"
                          type="number"
                          label="What is your hourly wage?"
                          fullWidth
                          onChange={handleWage}
                          value={wage}
                        />
                      </Grid>
                    </Grid>
                      <div className={classes.buttons}>
                        { renderButton() }
                      </div>
                  </React.Fragment>
                )}
                {
                  activeStep === steps.length - 1 && (
                  <React.Fragment>
                    {getStepContent(activeStep, { start, end, wage })}
                    <div className={classes.buttons}>
                      { renderButton() }
                    </div>
                  </React.Fragment>
              )}
              </React.Fragment>
            </Paper>
          </main>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
