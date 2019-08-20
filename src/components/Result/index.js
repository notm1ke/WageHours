import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';

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

function calculateDiff(s, e) {
  let start = moment(s);
  let end = moment(e);
  
  let res = moment.duration(start.diff(end)).asHours();
  if (res < 0) {
    res = -res;
  }

  return res;
}

export default function Review(props) {
  const classes = useStyles();
  const { start, end, wage } = props.data;
  const timeDiff = parseFloat(calculateDiff(start, end)).toFixed(2);
  const total = parseFloat(wage * timeDiff).toFixed(2);

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Your earnings
          </Typography>
          <Typography color="textSecondary" gutterBottom>You worked a {timeDiff} hour day, earning a total of <b>${total}</b>, at ${wage} per hour.</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}