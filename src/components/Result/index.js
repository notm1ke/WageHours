import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(4),
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const { hours, wage, tab, dayDiff } = props.data;

  const total = parseFloat(wage * hours).toFixed(2);

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Your earnings
          </Typography>
          {
            tab === 0 &&
            <Typography color="textSecondary" gutterBottom>You worked a {hours} hour day, earning a total of <b>${total}</b>, at ${wage} per hour.</Typography>
          }
          {
            tab === 2 &&
            <Typography color="textSecondary" gutterBottom>You worked a {hours} hour day, earning a total of <b>${total}</b>, at ${wage} per hour.</Typography>
          }
          {
            tab === 1 &&
            <Typography color="textSecondary" gutterBottom>You worked for {hours} hours over the course of {dayDiff} days, earning a total of <b>${total}</b>, at ${wage} per hour.</Typography>
          }
        </Grid>
      </Grid>
    </React.Fragment>
  );
}