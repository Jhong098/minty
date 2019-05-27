import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Import Components
import { jsx, css } from '@emotion/core';
import { Button } from '@material-ui/core';
import TransactionTable from './TransactionTable';
import LineGraph from './LineGraph';
import Balances from './Balances';
import PieGraph from './PieGraph';
import WeeklyOverview from './WeeklyOverview';

// Import Actions
import { fetchAppData, dispatchUpdateTransactions } from "../../actions/AppActions";
import { fetchDashData } from "../../actions/DashActions";

// Import Selectors
import { getAmountsByDay, getCategoryCounts } from '../../reducers/DashReducer';
import { getBalances, getTransactions } from '../../reducers/AppReducer';

/** @jsx jsx */

const containerStyle = css`
  display: flex;
  width: 93%;
  height: 100vh;
  margin-top: 10px;
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

const toolBarStyle = css`
  width: 80%;
  margin-top: 80px;
  margin-left: 100px;
  margin-right: auto;
  height: 50px;
`;

class DashMainPage extends Component {

  componentDidMount = () => {
    const { dispatch } = this.props;
    Promise.all([
      dispatch(fetchAppData()),
      dispatch(fetchDashData())
    ]).then(() => {
      console.log('fetched all data');
    });
  }

  // componentWillReceiveProps({ amounts, transactions, counts, balances }) {
  //   // if (amounts && transactions && counts && amounts.length && transactions.length && counts.length && balances.length) {
  //   //   this.setState({
  //   //     loaded: true,
  //   //     transactions: [...transactions],
  //   //     amounts: [...amounts],
  //   //     counts: [...counts],
  //   //     balances: [...balances],
  //   //   });
  //   // }
  //   this.setState({
  //     amounts, transactions, counts, balances
  //   });
  // }

  render() {
    const { transactions, amounts, counts, balances } = this.props;
    return (
      <div>
        <div css={toolBarStyle}>
          <Button variant="outlined" color="primary" onClick={() => this.props.dispatch(dispatchUpdateTransactions())}>UPDATE</Button>
        </div>
        <div className="dash-container" css={containerStyle}>
          {balances && <Balances balances={balances} />}
          {amounts && <LineGraph amounts={amounts} />}
          {transactions && <TransactionTable transactions={transactions} />}
          {counts && <PieGraph data={counts} />}
          {amounts && <WeeklyOverview amounts={amounts} />}
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
const mapStateToProps = (state) => {
  return {
    amounts: getAmountsByDay(state),
    counts: getCategoryCounts(state),
    transactions: getTransactions(state),
    balances: getBalances(state),
  };
}

export default connect(mapStateToProps)(DashMainPage);

