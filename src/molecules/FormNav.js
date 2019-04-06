import React from 'react';
import styled from 'styled-components';
import { withNavigation } from 'hoc';

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 20px;
  background-color: green;
  margin-top: auto;
`;

const FormNav = ({ handleNext, handlePrev }) => (
  <Row>
    <button type="button" onClick={handlePrev}>Prev</button>
    <button type="button" onClick={handleNext}>Next</button>
  </Row>
);

export default withNavigation(FormNav);
