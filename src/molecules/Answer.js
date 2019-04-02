import React, { Component } from 'react';
import { InputConsumer } from 'context';

const Answer = ({ children }) => {
  return (
    <FormConsumer>
      {(formValues) => (
        <Form {...formValues}>
          {children}
        </Form>
      )}
    </FormConsumer>
  );
};

export default Answer;
