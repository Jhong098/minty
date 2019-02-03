import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from './CustomTooltip';

const styles = theme => ({
  card: {
    width: '60%',
    minWidth: 275,
    height: '60%',
    margin: theme.spacing.unit * 2,
  },
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

function LineGraph(props) {
  const { classes, amounts } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Daily Spendings
        </Typography>
        <ResponsiveContainer width="90%" height={400}>
          <LineChart data={amounts} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <XAxis />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="dailyTotal" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
        {/* <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'} */}
        {/* </Typography> */}
      </CardContent>
    </Card>
  );
}

LineGraph.propTypes = {
  classes: PropTypes.object.isRequired,
  amounts: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.object.isRequired,
    dailyTotal: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  })),
};

export default withStyles(styles)(LineGraph);
