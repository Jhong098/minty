import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Icon from './Icon';

import { getIconByCategory, getColorByCategory } from '../utils/categories';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';


const expansionContainer = css`
  display: flex;
  width: 98%;
  margin: 15px;
`;

const expansionSummary = {
  width: '100%',
  alignItems: 'center',
};

const summaryText = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
`;

function BudgetPanel(props) {
  const { category } = props;
  return (
    <div>
      <ExpansionPanel defaultExpanded={false} css={expansionContainer}>
        <ExpansionPanelSummary style={expansionSummary} expandIcon={<ExpandMoreIcon css={css`justify-self: flex-end;`} />}>
          <div>
            <Icon size="small" svg={getIconByCategory(category)} color={getColorByCategory(category)} />
          </div>
          <div css={summaryText}>
            <Typography variant="h6">{category.charAt(0).toUpperCase() + category.slice(1)}</Typography>
            <Typography>Select trip destination</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
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
