import React, { Component } from 'react';
import PropTypes from 'prop-types';
import concat from 'lodash/fp/concat';
import {
  FormProvider, ValuesConsumer, ErrorsConsumer,
} from 'context';

class Answer extends Component {
  state = {
    inputs: [],
  };

  registerInput = (input) => {
    console.log('REGISTERING', input);
    const { inputs } = this.state;
    const newInputs = concat(inputs)([input]);
    this.setState({ inputs: newInputs });
  }

  componentDidMount() {
    const { inputs } = this.state;
    for (let i = 0; i < inputs.length; i += 1) {
      if (i.props.autoFocus && i.focus) {
        i.focus();
        break;
      }
    }
  }

  render () {
    const { name, question, children, required } = this.props;
    const { registerInput } = this;
    return (
      <ValuesConsumer>
        {values => (
          <ErrorsConsumer>
            { errors => (
              <FormProvider value={{ name, values, errors, registerInput }}>
                { React.cloneElement(children, { ...children.props, question, required, errors, formName: name }) }
              </FormProvider>
            )}
          </ErrorsConsumer>
        )}
      </ValuesConsumer>
    );
  }
}

Answer.propTypes = {
  name: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.func),
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default Answer;
