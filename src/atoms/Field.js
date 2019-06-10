import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';
import { reach } from 'yup';
import { FormContext, ChangeContext, ValidationContext } from 'context';

const Field = ({ name, children }) => {
  const [registered, setRegistered] = useState(false);
  const { name: formName, values, errors, registerInput } = useContext(FormContext);
  const { schema, handleInvalidInput, handleValidInput } = useContext(ValidationContext);
  const handleChange = useContext(ChangeContext);
  const inputName = (!name || name === formName) ? formName : `${formName}.${name}`;
  const value = get(inputName, values);
  const error = get(inputName, errors);

  const newChild = React.cloneElement(children, {
    name: inputName,
    value,
    error,
    handleChange,
    handleInvalidInput,
    handleValidInput,
    validator: (schema && reach(schema, inputName)) || null,
  });

  if (!registered) {
    registerInput(newChild);
    setRegistered(true);
  }

  return newChild;
};

Field.propTypes = {
  name: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
};

Field.defaultProps = {
  name: null,
};

export default Field;
