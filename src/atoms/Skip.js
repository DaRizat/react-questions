import React from 'react';
import PropTypes from 'prop-types';
import { NextConsumer } from 'context';

const Skip = ({ when, unless }) => (
  <NextConsumer>
    {(nextAction) => {
      if (when && !unless) {
        nextAction();
      }
    }}
  </NextConsumer>
);

Skip.propTypes = {
  when: PropTypes.bool,
  unless: PropTypes.bool,
};

Skip.defaultProps = {
  when: undefined,
  unless: undefined,
};

export default Skip;
