import React from 'react';
import PropTypes from 'prop-types';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Icon from './Icon';
import { getIconByCategory, getColorByCategory } from '../utils/categories';

const containerStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

function CategoryIcons(props) {
  const { categories } = props;
  categories.push('add');

  return (
    <div css={containerStyles}>
      {
        categories.map(category => {
          return (
            <Icon
              size="large"
              svg={getIconByCategory(category)}
              key={category}
              color={getColorByCategory(category)}
            />
          );
        })
      }
    </div>
  );
}

CategoryIcons.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default CategoryIcons;
