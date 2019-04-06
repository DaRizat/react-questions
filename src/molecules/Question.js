import React from 'react';
import PropTypes from 'prop-types';
import { Skip } from 'atoms';
import { ValuesConsumer, ErrorsConsumer, FormProvider } from 'context';

const Question = ({
  children, answer, name, ask, condition,
}) => {
  const Answer = answer || children;
  return (
    <ValuesConsumer>
      {values => (
        <ErrorsConsumer>
          {errors => (
            <FormProvider value={{
              name,
              values,
              errors,
            }}
            >
              {(condition && condition(values))
                ? <Skip />
                : <Answer question={ask} />
              }
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
  condition: PropTypes.func,
};

Question.defaultProps = {
  children: null,
  answer: null,
  condition: null,
};

export default Question;
