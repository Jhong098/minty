import React from 'react';
import PropTypes from 'prop-types';

// TODO: add tooltip styles
const toolTip = {
  background: 'white',
  border: '1px solid grey',
  padding: '5px',
};

function dateFromDay(year, day) {
  const date = new Date(year, 0); // initialize a date in `year-01-01`
  return new Date(date.setDate(day)).toLocaleDateString(); // add the number of days
}

function getDate({ day, year }) {
  return dateFromDay(year, day);
}

export default function CustomTooltip(props) {
  const { active } = props;
  if (active) {
    const { payload } = props;
    const dateObj = payload[0].payload._id;
    const amount = payload[0].payload.dailyTotal;

    return (
      <div style={toolTip}>
        <p>{`Date: ${getDate(dateObj)}`}</p>
        <p>{`Amount Spent: $${amount.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
}

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
};
