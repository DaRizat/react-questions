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
    const { children } = props;
    this.state = {
      index: children,
      current: 0,
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
    const { current, values } = this.state;
    const { children, onSubmit } = this.props;
    if (current < children.length - 1) {
      this.setState({ current: current + 1 });
    } else {
      onSubmit(values);
    }
  }

  handlePrev() {
    const { current } = this.state;
    if (current > 0) {
      this.setState({ current: current - 1 });
    }
  }

  handleChange(payload) {
    const { values } = this.state;
    const { name, value } = payload;
    const newValues = Object.assign({}, values, { [name]: value });
    const { children } = this.props;
    const newIndex = children.filter(child => (
      !child.props.skipWhen || !child.props.skipWhen(newValues)
    ));

    this.setState({ values: newValues, index: newIndex });
  }

  render() {
    const {
      values, errors, index, current,
    } = this.state;
    const activeChild = index[current];
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
  onSubmit: PropTypes.func.isRequired,
};

export default QuestionFlow;
