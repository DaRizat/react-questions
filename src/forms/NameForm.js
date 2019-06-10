import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'atoms';
import FormNav from 'molecules/FormNav';
import { TextInput } from 'molecules';

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

const Heading = styled.span`
  font-family: Roboto;
  font-size: 20px;
  color: gray;
  margin-bottom: 20px;
`;

const NameForm = ({ question }) => (
  <Container>
    <Heading>{question}</Heading>
    <Field name="first">
      <TextInput autoFocus />
    </Field>
    <Field name="last">
      <TextInput />
    </Field>
    <FormNav />
  </Container>
);

NameForm.propTypes = {
  question: PropTypes.string.isRequired,
};

export default NameForm;
