import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Import Components
import TransactionTable from '../components/TransactionTable';
import LineGraph from '../components/LineGraph';
import Balances from '../components/Balances';
import PieGraph from '../components/PieGraph';
import WeeklyOverview from '../components/WeeklyOverview';

// Import Actions
import { fetchDashData } from '../DashActions';

// Import Selectors
import { getAmountsByDay, getCategoryCounts } from '../DashReducer';
import { getBalances, getTransactions } from '../../App/AppReducer';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const containerStyle = css`
  display: flex;
  width: 93%;
  height: 100vh;
  margin-top: 80px;
  margin-left: 80px;
  flex-wrap: wrap;

  &>* {
    flex: 1 1 33.3333%;
    width: 60%;
    minWidth: 275px;
    height: 60%;
    margin: 16px;
  }
`;

class DashMainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      amounts: [],
      counts: [],
    };
  }

  componentDidMount = () => {
    this.props.dispatch(fetchDashData()).then(() => {
      console.log('fetched all data');
    });
  }

  componentWillReceiveProps({ amounts, transactions, counts, balances }) {
    if (amounts.length && transactions.length && counts.length && balances.length) {
      this.setState({
        loaded: true,
        transactions: [...transactions],
        amounts: [...amounts],
        counts: [...counts],
        balances: [...balances],
      });
    }
  }

  shouldComponentUpdate(nextState) {
    if (nextState.loaded === this.state.loaded) {
      // console.log('do not render, already loaded')
      return false;
    }
    return true;
  }

  render() {
    const { loaded, transactions, amounts, counts, balances } = this.state;
    return (
      <div>
        {
          loaded && (
            <div className="dash-container" css={containerStyle}>
              <Balances balances={balances} />
              <LineGraph amounts={amounts} />
              <TransactionTable transactions={transactions} />
              <PieGraph data={counts} />
              <WeeklyOverview amounts={amounts} />
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
    amounts: getAmountsByDay(state),
    counts: getCategoryCounts(state),
    transactions: getTransactions(state),
    balances: getBalances(state),
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
  balances: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    balance: PropTypes.number,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

DashMainPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(DashMainPage);

