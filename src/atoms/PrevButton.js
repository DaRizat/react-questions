import React from 'react';
import styled from 'styled-components';
import { PrevConsumer } from 'context';

const Button = styled.button`
  background-color: green;
  border-radius: 10px;
  padding: 10px;
  color: white;
  border-width: 0;
  cusror: pointer;
`;

const PrevButton = () => (
  <PrevConsumer>
    {handlePrev => (
      <Button onClick={handlePrev}>Prev</Button>
    )}
  </PrevConsumer>
);

export default PrevButton;
