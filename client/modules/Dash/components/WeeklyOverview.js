import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { meanBy, maxBy } from 'lodash';

const styles = theme => ({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 16,
    margin: theme.spacing.unit,
  },
  pos: {
    marginBottom: 12,
  },
});

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/*
  [{
    _id: {
      day: number,
      year: number
    },
    count: number,
    dailyTotal: number
  }]
*/
function getAmountsByWeekday(amounts) {
  const weekday = amounts.map(({ _id: date, dailyTotal }) => {
    return {
      day: days[new Date(date.year, 0, date.day).getDay()],
      amount: dailyTotal,
    };
  });

  const grouped = weekday.reduce((rv, x) => {
    (rv[x.day] = rv[x.day] || []).push(x);
    return rv;
  }, {});

  const calculated = [];

  for (const day in grouped) {
    if (grouped.hasOwnProperty(day)) {
      const dayArray = grouped[day];
      calculated.push({
        day,
        avg: meanBy(dayArray, d => d.amount).toFixed(2),
        max: maxBy(dayArray, d => d.amount).amount.toFixed(2),
      });
    }
  }

  return calculated;
}

function WeeklyOverview(props) {
  const { classes, amounts } = props;
  const amountsByWeekday = getAmountsByWeekday(amounts);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Spendings by Days of the Week
        </Typography>
        <ResponsiveContainer width="90%" height={400}>
          <BarChart width={730} height={250} data={amountsByWeekday}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avg" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

WeeklyOverview.propTypes = {
  classes: PropTypes.object.isRequired,
  amounts: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.object.isRequired,
    dailyTotal: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  })),
};

export default withStyles(styles)(WeeklyOverview);
