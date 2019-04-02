import React, { Component } from 'react';
import { ValuesProvider, ErrorsProvider, ActionsProvider } from 'context';

class QuestionFlow extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      index: 0,
      values: {},
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }
  
  runValidations(values) {
    // TODO: implement yup validations
    return {};
  }

  handleNext() {
    
  }

  handlePrev() {
  
  }

  handleChange(payload) {
    const { validate } = this.props;
    const { values } = this.state;
    const { name, value } = payload;
    let errors = {};
    const newValues = Object.assign({}, values, { [name]: value });
    if (validate) {
      errors = runValidations(newValues);
    }
    this.setState({ values: newValues, errors });
  }

  render() {
    const { children } = this.props;
    return (
      <ValuesProvider value={this.state.values}>
        <ErrorsProvider value={this.state.errors}>
          <ActionsProvider value={{
            handleChange: this.handleChange,
            handleNext: this.handleNext,
            handlePrev: this.handlePrev,
          }}>
            { children }
          </ActionsProvider>
        </ErrorsProvider>
      </ValuesProvider>
    );
  }
}

export default QuestionFlow;
