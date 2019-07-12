import React from 'react';
import PropTypes from 'prop-types';
import { NextConsumer, ValuesConsumer } from 'context';

const asyncDo = async (action, values, next) => {
  await action(values);
  next();
};

const syncDo = (action, values, next) => {
  action(values);
  next();
};

const Do = ({ async, action }) => (
  <ValuesConsumer>
    { values => (
      <NextConsumer>
        { (handleNext) => {
          if (async) {
            asyncDo(action, values, handleNext);
          } else {
            syncDo(action, values, handleNext);
          }
        }}
      </NextConsumer>
    )}
  </ValuesConsumer>
);

Do.propTypes = {
  async: PropTypes.bool,
  action: PropTypes.func.isRequired,
};

Do.defaultProps = {
  async: false,
};

export default Do;
