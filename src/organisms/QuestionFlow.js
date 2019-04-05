import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ValuesProvider,
  ErrorsProvider,
  NextProvider,
  PrevProvider,
  ChangeProvider,
} from 'context';

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

  /*
  runValidations(values) {
    // TODO: implement yup validations
    return {};
  }
  */

  handleNext() {
    const { index } = this.state;
    const { children } = this.props;
    if (index < children.length - 1) {
      this.setState({ index: index + 1 });
    }
  }

  handlePrev() {
    const { index } = this.state;
    if (index > 0) {
      this.setState({ index: index - 1 });
    }
  }

  handleChange(payload) {
    // const { validate } = this.props;
    const { values } = this.state;
    const { name, value } = payload;
    const errors = {};
    const newValues = Object.assign({}, values, { [name]: value });
    /*
    if (validate) {
      errors = runValidations(newValues);
    }
    */
    this.setState({ values: newValues, errors });
  }

  render() {
    const { children } = this.props;
    const { values, errors, index } = this.state;
    const activeChild = children[index];
    return (
      <ValuesProvider value={values}>
        <ErrorsProvider value={errors}>
          <NextProvider value={this.handleNext}>
            <PrevProvider value={this.handlePrev}>
              <ChangeProvider value={this.handleChange}>
                {activeChild}
              </ChangeProvider>
            </PrevProvider>
          </NextProvider>
        </ErrorsProvider>
      </ValuesProvider>
    );
  }
}

QuestionFlow.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]),
  ).isRequired,
};

export default QuestionFlow;
