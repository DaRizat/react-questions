import React from 'react';
import {
  FormProvider, ValuesConsumer, ErrorsConsumer,
} from 'context';

const Answer = ({ name, children }) => {
  return (
    <ValuesConsumer>
      {values => (
        <ErrorsConsumer>
          {errors => (
            <FormProvider value={{
              name,
              value: values[name],
              error: errors[name],
            }}>
              {children}
            </FormProvider>
          )}
        </ErrorsConsumer>
      )}
    </ValuesConsumer>
  );
};

export default Answer;
