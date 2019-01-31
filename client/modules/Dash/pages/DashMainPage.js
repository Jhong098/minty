import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Import Components
import TransactionTable from '../components/TransactionTable';
import LineGraph from '../components/LineGraph';

// Import Actions
import { fetchTransactions, fetchAmountsByDay } from '../DashActions';

// Import Selectors
import { getTransactions, getAmountsByDay } from '../DashReducer';

const containerStyle = {
  display: 'flex',
  width: '100%',
  height: '100vh',
  paddingTop: '80px',
  paddingLeft: '80px',
};

class DashMainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      transactions: [],
      amounts: [],
    };
  }

  componentDidMount = () => {
    this.props.dispatch(fetchTransactions());
    this.props.dispatch(fetchAmountsByDay());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.amounts && nextProps.transactions) {
      this.setState({
        loaded: true,
        transactions: [...nextProps.transactions],
        amounts: [...nextProps.amounts],
      });
    }
  }

  render() {
    const { loaded, transactions, amounts } = this.state;
    return (
      <div>
        {
          loaded && (
            <div className="dash-container" style={containerStyle}>
              <LineGraph amounts={amounts} />
              <TransactionTable transactions={transactions} />
            </div>
          )
        }
      </div>
    );
  }
}

DashMainPage.need = [() => { return fetchTransactions(); }];
DashMainPage.need = [() => { return fetchAmountsByDay(); }];

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
    _id: PropTypes.object.isRequired,
    dailyTotal: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  })),
  dispatch: PropTypes.func.isRequired,
};

DashMainPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(DashMainPage);

