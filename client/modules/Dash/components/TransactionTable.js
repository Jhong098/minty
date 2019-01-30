import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;

class TransactionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.createRows(),
      page: 0,
      rowsPerPage: 10,
    };
  }

  createData = (account, name, date, amount, category, location) => {
    id += 1;
    return { id, account, name, date, amount, category, location };
  }

  createRows = () => {
    return this.props.transactions.map(({ account, name, date, amount, category }) => {
      return this.createData(account, name, date, amount, category);
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>account</TableCell>
                <TableCell align="right">name</TableCell>
                <TableCell align="right">date</TableCell>
                <TableCell align="right">amount</TableCell>
                <TableCell align="right">category</TableCell>
                {/* <TableCell align="right">location</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.account}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.category[1] || row.category[0]}</TableCell>
                  {/* <TableCell align="right">{row.location}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
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
