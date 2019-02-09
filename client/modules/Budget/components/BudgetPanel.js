import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Chip from '@material-ui/core/Chip';
// import Button from '@material-ui/core/Button';
// import Divider from '@material-ui/core/Divider';
import Icon from './Icon';

import { getIconByCategory, getColorByCategory } from '../utils/categories';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';


const expansionContainer = css`
  width: 98%;
  margin: 15px;
`;

const column = css`
  flex-basis: 33.33%
`;

function BudgetPanel(props) {
  const { category } = props;
  return (
    <div css={expansionContainer}>
      <ExpansionPanel defaultExpanded={false}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div css={css`${column} margin-right: 15px;`}>
            <Icon
              size="small"
              svg={getIconByCategory(category)}
              color={getColorByCategory(category)}
            />
          </div>
          <div css={column}>
            <Typography variant="h6">{category.charAt(0).toUpperCase() + category.slice(1)}</Typography>
            <Typography>Select trip destination</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ alignItems: 'center' }}>
          <div css={column} />
          <div css={column}>
            HELLO! My Name is
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

BudgetPanel.propTypes = {
  category: PropTypes.string.isRequired,
};

export default BudgetPanel;
