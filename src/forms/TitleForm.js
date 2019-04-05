import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, NextButton, PrevButton } from 'atoms';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  width: 500px;
  height: 250px;
  min-height: 250px;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: green;
  border-radius: 10px;
  margin-top: auto;
`;

const Heading = styled.span`
  font-family: Roboto;
  font-size: 20px;
  color: gray;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 36px;
  border-radius: 10px;
  border: 1px solid gray;
  padding: 5px 10px;
  font-size: 14px;
`;

const TitleForm = ({ question }) => (
  <Container>
    <Heading>{question}</Heading>
    <Field
      name="title"
      component={({ handleChange }) => (
        <Input type="text" onChange={handleChange} />
      )}
    />
    <Row>
      <PrevButton />
      <NextButton />
    </Row>
  </Container>
);

TitleForm.propTypes = {
  question: PropTypes.string.isRequired,
};

export default TitleForm;
