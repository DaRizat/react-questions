import React from 'react';
import {
  FormProvider, ValuesConsumer, ErrorsConsumer,
} from 'context';

export default (WrappedComponent, question) => {
  const { name, condition } = question;
  return (() => (
    <ValuesConsumer>
      {values => (
        <ErrorsConsumer>
          {errors => (
            <FormProvider value={{
              name,
              value: values[name],
              error: errors[name],
            }}
            >
              <WrappedComponent
                {...question}
                condition={(condition) ? () => condition(values) : null}
              />
            </FormProvider>
          )}
        </ErrorsConsumer>
      )}
    </ValuesConsumer>
  ));
};
