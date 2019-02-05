import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Import Components

// Import Actions
import { fetchCategories } from '../BudgetActions';

// Import Selectors
import { getCategories } from '../BudgetReducer';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const containerStyle = css`
  display: flex;
  width: 93%;
  height: 100vh;
  margin-top: 80px;
  margin-left: 80px;
`;

class Budgets extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      categories: [],
    };
  }

  componentDidMount = () => {
    this.props.dispatch(fetchCategories()).then(() => {
      console.log('fetched all budget data');
    });
    // this.props.dispatch(fetchDashData()).then(() => {
    //   console.log('fetched all data');
    // });
  }

  // componentWillReceiveProps({ amounts, transactions, counts, balances }) {
  //   if (amounts.length && transactions.length && counts.length && balances.length) {
  //     this.setState({
  //       loaded: true,
  //       transactions: [...transactions],
  //       amounts: [...amounts],
  //       counts: [...counts],
  //       balances: [...balances],
  //     });
  //   }
  // }

  // shouldComponentUpdate(nextState) {
  //   if (nextState.loaded === this.state.loaded) {
  //     // console.log('do not render, already loaded')
  //     return false;
  //   }
  //   return true;
  // }

  render() {
    return (
      <div className="budget-container" css={containerStyle}>
        BUDGET
      </div>
    );
  }
}

// Budgets.need = [() => { return fetchDashData(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    categories: getCategories(state),
  };
}

Budgets.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

Budgets.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Budgets);

