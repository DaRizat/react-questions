import React from 'react';
import { InputConsumer } from 'context';

const Field = ({ name, component }) => {
  const Component = component;
  return (
    <InputConsumer>
      {({ handleChange }) => (
        
      )}
    </InputConsumer>
  )
};

export const Field;
