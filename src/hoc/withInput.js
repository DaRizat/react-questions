import React from 'react';
import { FormConsumer, InputProvider } from 'context';

export default (WrappedComponent) => (
  <FormConsumer>
    ({ formName }) => (
      <WrappedComponent />
    )
  </FormConsumer>
);
