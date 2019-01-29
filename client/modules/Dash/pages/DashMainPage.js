import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import TransactionTable from '../components/TransactionTable';
// import LineGraph from '../components/LineGraph';

// Import Actions
import { fetchTransactions, fetchAmountsByDay } from '../DashActions';

// Import Selectors
import { getTransactions, getAmountsByDay } from '../DashReducer';

class DashMainPage extends Component {

  componentDidMount = () => {
    this.props.dispatch(fetchTransactions());
    this.props.dispatch(fetchAmountsByDay());
  }

  render() {
    console.log(this.props.amounts)
    return (
      <div>
        <TransactionTable transactions={this.props.transactions} />
        {/* <LineGraph amounts={this.props.amounts} /> */}
      </div>
    );
  }
}

DashMainPage.need = [() => { return fetchTransactions(); }];
// DashMainPage.need = [() => { return fetchAmountsByDay(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    transactions: getTransactions(state),
    amounts: getAmountsByDay(state),
  };
}

DashMainPage.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    account: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  })).isRequired,
  amounts: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    dailyTotal: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

DashMainPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(DashMainPage);

