import React from 'react';
import styled from 'styled-components';
import { NextConsumer } from 'context';

const Button = styled.button`
  background-color: green;
  border-radius: 10px;
  padding: 10px;
  color: white;
  border-width: 0;
  cusror: pointer;
`;

const NextButton = () => (
  <NextConsumer>
    {handleNext => (
      <Button onClick={handleNext}>Next</Button>
    )}
  </NextConsumer>
);

export default NextButton;
