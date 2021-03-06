import React from 'react';
import PropTypes from 'prop-types';
import { Answer } from 'molecules';

const Ask = ({ children, question, name, required }) => (
  <Answer name={name} question={question} required={required}>
    { children }
  </Answer>
);

Ask.propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
};

export default Ask;
