import React from 'react';
import PropTypes from 'prop-types';
import { ValuesConsumer, ErrorsConsumer, FormProvider } from 'context';

const Question = ({
  children, answer, name, ask, required,
}) => {
  const Answer = answer || children;
  return (
    <ValuesConsumer>
      {values => (
        <ErrorsConsumer>
          {errors => (
            <FormProvider value={{ name, values, errors }}>
              <Answer question={ask} required={required} />
            </FormProvider>
          )}
        </ErrorsConsumer>
      )}
    </ValuesConsumer>
  );
};

Question.propTypes = {
  children: PropTypes.element,
  answer: PropTypes.element,
  name: PropTypes.string.isRequired,
  ask: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

Question.defaultProps = {
  children: null,
  answer: null,
  required: false,
};

export default Question;
