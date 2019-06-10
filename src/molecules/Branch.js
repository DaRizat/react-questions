import React from 'react';
import PropTypes from 'prop-types';

const Branch = ({ children }) => (children);

Branch.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default Branch;
