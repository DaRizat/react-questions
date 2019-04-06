import React from 'react';
import PropTypes from 'prop-types';
import { ValuesConsumer, ErrorsConsumer, FormProvider } from 'context';

const Question = ({
  children, answer, name, ask,
}) => {
  const Answer = answer || children;
  return (
    <ValuesConsumer>
      {values => (
        <ErrorsConsumer>
          {errors => (
            <FormProvider value={{ name, values, errors }}>
              <Answer question={ask} />
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
};

Question.defaultProps = {
  children: null,
  answer: null,
};

export default Question;
