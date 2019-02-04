import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const styles = {
  card: {
    minWidth: 275,
    width: '30%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 16,
    marginTop: '8px',
  },
  pos: {
    margin: 15,
    fontSize: 16,
  },
};

function Balances(props) {
  const { classes, balances } = props;
  console.log(balances)
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent css={css`display: flex; flex-direction: column;`}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Balances
        </Typography>
        {
          balances.map((balance, index) => (
            <div key={balance.name} css={css`margin: 20px 0;`}>
              <Typography variant="h5" component="h2">
                {balance.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {`$${balance.balance}`}
              </Typography>
              {index === balances.length - 1 ? null : <Divider />}
            </div>
          ))
        }
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

Balances.propTypes = {
  classes: PropTypes.object.isRequired,
  balances: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    balance: PropTypes.number,
  })).isRequired,
};

export default withStyles(styles)(Balances);
