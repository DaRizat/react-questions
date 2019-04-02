import React from 'react';
import {
  FormProvider, ValuesConsumer, ErrorsConsumer, ActionsConsumer,
} from 'context';

const Question = ({ name, children }) => {
  return (
    <ValuesConsumer>
      {values => (
        <ErrorsConsumer>
          {errors => (
            <ActionsConsumer>
              {({ handleChange, handleNext, handlePrev }) => (
                <FormProvider value={{
                  name,
                  value: values[name],
                  error: errors[name],
                  handleChange,
                  handleNext,
                  handlePrev,
                }}>
                  {children}
                </FormProvider>
              )} 
            </ActionsConsumer>
          )}
        </ErrorsConsumer>
      )}
    </ValuesConsumer>
  );
};

export default Question;
