import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Import Components
import CategoryIcons from '../components/CategoryIcons';

// Import Actions
import { fetchCategories } from '../BudgetActions';

// Import Selectors
import { getCategories } from '../BudgetReducer';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import BudgetPanel from '../components/BudgetPanel';

const containerStyle = css`
  display: flex;
  width: 93%;
  height: 100vh;
  margin-top: 80px;
  margin-left: 80px;
`;

class BudgetsMain extends Component {

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
  }

  componentWillReceiveProps({ categories }) {
    console.log(categories)
    if (categories.length) {
      this.setState({
        loaded: true,
        categories: [...categories],
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
    const { categories } = this.state;

    return (
      <div className="budget-container" css={containerStyle}>
        <CategoryIcons categories={categories} />
        <BudgetPanel />
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

BudgetsMain.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

BudgetsMain.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(BudgetsMain);

