import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import SvgIcon from '@material-ui/core/SvgIcon';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';

function Icon(props) {
  const { size, svg, color } = props;
  return (
    <Avatar
      css={css`
        width: ${size === 'small' ? '40px' : '60px'};
        height: ${size === 'small' ? '40px' : '60px'};
        margin: 10px;
        color: #fff;
        background-color: ${color};`}
    >
      <SvgIcon fontSize={size}>{svg}</SvgIcon>
    </Avatar>
  );
}

Icon.propTypes = {
  svg: PropTypes.object.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
};

export default Icon;
