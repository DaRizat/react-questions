import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'atoms';
import FormNav from 'molecules/FormNav';
import TextInput from 'molecules/TextInput';

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

class TextForm extends Component {
  constructor (props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    const input = this.inputRef.current;
    if (input.props.autoFocus) {
      input.focus();
    }
  }

  componentDidUpdate() {
    const input = this.inputRef.current;
    if (input.props.autoFocus) {
      input.focus();
    }
  }

  render () {
    const { question } = this.props;
    return (
      <Container>
        <Heading>{question}</Heading>
        <Field>
          <TextInput autoFocus ref={this.inputRef}/>
        </Field>
        <FormNav />
      </Container>
    )
  }
}

TextForm.propTypes = {
  question: PropTypes.string.isRequired,
};

export default TextForm;
