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

import { getFilteredCategory } from '../utils/categories';
import { uniq } from 'lodash';

const containerStyle = css`
  display: flex;
  flex-direction: column;
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
      const deduped = uniq(categories.map(category => getFilteredCategory(category)));
      this.setState({
        loaded: true,
        categories: [...categories],
        deduped: [...deduped],
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
    const { loaded, deduped } = this.state;

    return (
      loaded && (
        <div className="budget-container" css={containerStyle}>
          {/* <CategoryIcons categories={deduped} /> */}
          {
            deduped.map(category => {
              return <BudgetPanel key={category} category={category} />;
            })
          }
        </div>
      )
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

