import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import TransactionTable from '../components/TransactionTable';

// Import Actions
import { fetchTransactions } from '../DashActions';

// Import Selectors
import { getTransactions } from '../DashReducer';

class DashMainPage extends Component {

  componentDidMount = () => {
    this.props.dispatch(fetchTransactions());
  }

  render() {
    return (
      <div>
        <TransactionTable transactions={this.props.transactions} />
      </div>
    );
  }
}

DashMainPage.need = [() => { return fetchTransactions(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    transactions: getTransactions(state),
  };
}

DashMainPage.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    account: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

DashMainPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(DashMainPage);

