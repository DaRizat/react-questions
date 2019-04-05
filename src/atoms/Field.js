import React from 'react';
import PropTypes from 'prop-types';
import { FormConsumer, ChangeConsumer } from 'context';

const Field = ({ name, component }) => {
  const Component = component;
  return (
    <FormConsumer>
      {(form) => {
        const { name: formName, value } = form;
        const inputName = (name === formName) ? name : `${formName}.${name}`;
        return (
          <ChangeConsumer>
            {handleChange => (
              <Component
                name={inputName}
                value={value}
                handleChange={(event) => {
                  event.preventDefault();
                  handleChange({ name: inputName, value: event.target.value });
                }}
              />
            )}
          </ChangeConsumer>
        );
      }}
    </FormConsumer>
  );
};

Field.propTypes = {
  name: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
};

export default Field;
