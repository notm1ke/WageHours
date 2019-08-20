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
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import Result from '../Result';
import tlue from '../../colors/tlue';
import './App.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

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

function calculateDiff(s, e) {
  let start = moment(s);
  let end = moment(e);
  
  let res = moment.duration(start.diff(end)).asHours();
  if (res < 0) {
    res = -res;
  }

  return res;
}

function calculateDayDiff(s, e) {
  let start = moment(s);
  let end = moment(e);
  
  let res = moment.duration(start.diff(end)).asDays();
  if (res < 0) {
    res = -res;
  }

  return res;
}

function getStepContent(step, params) {
  switch (step) {
    case 1:
      if (!params.hours) {
        switch (params.tab) {
          case 0:
          case 2:
            params.hours = calculateDiff(moment(params.start), moment(params.end));
            break;
          case 1: 
            params.hours = calculateDiff(moment(params.rangeStart), moment(params.rangeEnd));
            params.dayDiff = calculateDayDiff(moment(params.rangeStart), moment(params.rangeEnd));
            break;
          default: throw new Error('Unsupported tab index');
        }
      }
      localStorage.setItem('wage', params.wage);
      localStorage.setItem('defaultTab', params.tab);
      return <Result data={params} />;
    default:
      throw new Error('Unknown step');
  }
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Checkout() {
  const classes = useStyles();
  const defaultWage = parseFloat(localStorage.getItem('wage'));
  const defaultValue = parseInt(localStorage.getItem('defaultTab'));

  const [activeStep, setActiveStep] = React.useState(0);
  const [start, setStart] = React.useState(null);
  const [end, setEnd] = React.useState(null);
  const [rangeStart, setRangeStart] = React.useState(null);
  const [rangeEnd, setRangeEnd] = React.useState(null);
  const [rangeHours, setRangeHours] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [value, setValue] = React.useState(defaultValue ? defaultValue : 0);
  const [wage, setWage] = React.useState(defaultWage ? defaultWage : 10.10);

  const handleNext = () => { setActiveStep(activeStep + 1) }
  const handleTabValue = (event, newValue) => { setValue(newValue) }
  const handleChangeIndex = (index) => { setValue(index) }
  
  // Exact hours
  const handleExactHours = (event) => { setHours(event.target.value) }
  
  // Date Range
  const handleRangeStart = (date) => { setRangeStart(date) }
  const handleRangeEnd = (date) => { setRangeEnd(date) }
  const handleRangeHours = (event) => { setRangeHours(event.target.value) } 

  // Time Range
  const handleStart = (date) => { setStart(date) }
  const handleEnd = (date) => { setEnd(date) }

  const handleWage = (event) => { setWage(event.target.value) }

  const resetAll = () => {
    setActiveStep(0);
    setStart(null);
    setEnd(null);
    setRangeStart(null);
    setRangeEnd(null);
    setRangeHours(0);
    setHours(0);
    setValue(defaultValue ? defaultValue : 0);
    setWage(defaultWage ? defaultWage : 10.10);
  }

  const renderButton = () => {
    if (((start && end) || hours || (rangeStart && rangeEnd && rangeHours)) && wage) {
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
                      { resetAll() }
                    </React.Fragment>
                  )}
                {
                  activeStep === steps.length - 2 && (
                  <React.Fragment>
                    <AppBar position="static" color="inherit">
                      <Tabs
                        value={value}
                        onChange={handleTabValue}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="Mode selector"
                      >
                        <Tab label="Exact" {...a11yProps(0)} />
                        <Tab label="Date Range" {...a11yProps(1)} />
                        <Tab label="Time Range" {...a11yProps(2)} />
                      </Tabs>
                    </AppBar>
                    <SwipeableViews
                      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                      index={value}
                      onChangeIndex={handleChangeIndex}
                    >
                      <TabPanel value={value} index={0} dir={theme.direction}>
                        <Grid container spacing={3}>
                          <Grid item xs={6} md={6}>
                            <TextField
                              id="wage"
                              type="number"
                              label="Total hours worked"
                              fullWidth
                              onChange={handleExactHours}
                              value={hours}
                            />
                          </Grid>
                          <Grid item xs={6} md={6}>
                            <TextField
                              id="wage"
                              type="number"
                              label="Wage"
                              fullWidth
                              onChange={handleWage}
                              value={wage}
                            />
                          </Grid>
                        </Grid>
                      </TabPanel>
                      <TabPanel value={value} index={1} dir={theme.direction}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                          <KeyboardDatePicker
                              margin="normal"
                              id="date-range-start"
                              label="Date range start"
                              format="MM/dd/yyyy"
                              value={rangeStart}
                              onChange={handleRangeStart}
                              fullWidth
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-range-end"
                                label="Date range end"
                                format="MM/dd/yyyy"
                                value={rangeEnd}
                                onChange={handleRangeEnd}
                                fullWidth
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                              />
                          </Grid>
                          <Grid item xs={6} md={6}>
                            <TextField
                              id="rangeHours"
                              type="number"
                              label="Hours per day"
                              fullWidth
                              onChange={handleRangeHours}
                              value={rangeHours}
                            />
                          </Grid>
                          <Grid item xs={6} md={6}>
                            <TextField
                              id="wage"
                              type="number"
                              label="Wage"
                              fullWidth
                              onChange={handleWage}
                              value={wage}
                            />
                          </Grid>
                        </Grid>
                      </TabPanel>
                      <TabPanel value={value} index={2} dir={theme.direction}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                              <KeyboardTimePicker
                                  margin="normal"
                                  id="start"
                                  label="Start time"
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
                                  label="End time"
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
                              label="Wage"
                              fullWidth
                              onChange={handleWage}
                              value={wage}
                            />
                          </Grid>
                        </Grid>
                      </TabPanel>
                    </SwipeableViews>
                    <div className={classes.buttons}>
                      { renderButton() }
                    </div>
                  </React.Fragment>
                )}
                {
                  activeStep === steps.length - 1 && (
                  <React.Fragment>
                    {getStepContent(activeStep, {
                      start,
                      end,
                      wage,
                      rangeStart,
                      rangeEnd,
                      hours: hours,
                      tab: value })}
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
