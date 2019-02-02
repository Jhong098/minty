import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import ReactTable from 'react-table';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    height: '60%',
    padding: '10px',
    margin: theme.spacing.unit * 2,
    overflowX: 'auto',
  },
  title: {
    fontSize: 16,
    margin: theme.spacing.unit,
  },
});

let id = 0;

class TransactionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.getData(),
    };
  }

  getData = () => {
    return this.props.transactions.map(({ account, name, date, amount, category }) => {
      return this.createData(account, name, date, amount, category);
    });
  };

  createData = (account, name, date, amount, category, location) => {
    id += 1;
    return { id, account, name, date, amount, category, location };
  }

  render() {
    const { classes } = this.props;
    const { data } = this.state;

    return (
      <Paper className={classes.root}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Transactions
        </Typography>
        <ReactTable
          data={data}
          columns={[
            {
              Header: 'Name',
              accessor: 'name',
            },
            {
              Header: 'Date',
              accessor: 'date',
            },
            {
              Header: 'Amount',
              accessor: 'amount',
            },
            {
              Header: 'Category',
              id: 'catogory',
              accessor: d => d.category[1] || d.category[0],
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </Paper>
    );
  }
}

TransactionTable.propTypes = {
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({
    account: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    category: PropTypes.array.isRequired,
    // location: PropTypes.object,
    // cuid: PropTypes.string.isRequired,
  })).isRequired,
};

export default withStyles(styles)(TransactionTable);
