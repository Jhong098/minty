import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Import Components
import TransactionTable from '../components/TransactionTable';
import LineGraph from '../components/LineGraph';

// Import Actions
import { fetchDashData } from '../DashActions';

// Import Selectors
import { getTransactions, getAmountsByDay, getCategoryCounts } from '../DashReducer';
import PieGraph from '../components/PieGraph';

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
      counts: [],
    };
  }

  componentDidMount = () => {
    this.props.dispatch(fetchDashData()).then(() => {
      console.log('fetched all data');
    });
  }

  componentWillReceiveProps({ amounts, transactions, counts }) {
    if (amounts.length && transactions.length && counts.length) {
      this.setState({
        loaded: true,
        transactions: [...transactions],
        amounts: [...amounts],
        counts: [...counts],
      });
    }
  }

  shouldComponentUpdate({ amounts, transactions, counts }, nextState) {
    if (nextState.loaded === this.state.loaded) {
      // console.log('do not render, already loaded')
      return false;
    }
    return true;
  }

  render() {
    const { loaded, transactions, amounts, counts } = this.state;
    return (
      <div>
        {
          loaded && (
            <div className="dash-container" style={containerStyle}>
              <LineGraph amounts={amounts} />
              <TransactionTable transactions={transactions} />
              <PieGraph data={counts} />
            </div>
          )
        }
      </div>
    );
  }
}

DashMainPage.need = [() => { return fetchDashData(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    transactions: getTransactions(state),
    amounts: getAmountsByDay(state),
    counts: getCategoryCounts(state),
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
  })).isRequired,
  counts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.number,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

DashMainPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(DashMainPage);

