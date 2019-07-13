import React, { Component } from 'react';
import PropTypes from 'prop-types';
import set from 'lodash/fp/set';
import get from 'lodash/fp/get';
import unset from 'lodash/fp/unset';
import {
  ChangeProvider,
  ErrorsProvider,
  IndexProvider,
  NextProvider,
  PrevProvider,
  ValidationProvider,
  ValuesProvider,
} from 'context';
import { reach } from 'yup';

class QuestionFlow extends Component {
  state = {
    index: this.props.children,
    current: 0,
    values: this.props.initialValues || {},
    errors: {},
  };

  calculateIndex = (values) => {
    const { children } = this.props;
    return children.filter(child => (
      !child.props.when || (child.props.when && child.props.when(values))
    ));
  };

  handleNext = async () => {
    const { current, values, index } = this.state;
    const { children, onSubmit, validates } = this.props;
    const currentKey = index[current].props.name;
    const validator = (validates && reach(validates, currentKey)) || null;

    if (validator) {
      try {
        const value = get(currentKey, values);
        await validator.validate(value);
        this.handleValidInput(currentKey);
      } catch(e) {
        this.handleInvalidInput({ name: currentKey, error: e });
      }
    }

    if (!this.state.errors[currentKey]) {
      if (current < children.length - 1) {
        this.setState({ current: current + 1 });
      } else {
        onSubmit(values);
      }
    }
  };

  handlePrev = () => {
    const { current } = this.state;
    if (current > 0) {
      this.setState({ current: current - 1 });
    }
  };

  handleChange = (payload) => {
    const { onChange } = this.props;
    const { values } = this.state;
    const { name, value } = payload;
    const newValues = set(name, value, values);
    const newIndex = this.calculateIndex(newValues);
    this.setState({ values: newValues, index: newIndex });

    if (onChange) {
      onChange(newValues);
    }
  };

  handleInvalidInput = (payload) => {
    const { name, error } = payload;
    const { errors } = this.state;
    const newErrors = set(name, error.message, errors);
    this.setState({ errors: newErrors });
  };

  handleValidInput = (name) => {
    const { errors } = this.state;
    let newErrors = errors;
    if (get(name, errors)) {
      newErrors = unset(name, errors);
    }
    this.setState({ errors: newErrors });
  };

  render() {
    const { validates } = this.props;
    const {
      values, index, current, errors,
    } = this.state;
    const activeChild = index[current];
    return (
      <ValuesProvider value={values}>
        <ErrorsProvider value={errors}>
          <IndexProvider value={{ current, total: index.length }}>
            <ValidationProvider
              value={{
                schema: validates,
                handleInvalidInput: this.handleInvalidInput,
                handleValidInput: this.handleValidInput,
              }}>
              <NextProvider value={this.handleNext}>
                <PrevProvider value={this.handlePrev}>
                  <ChangeProvider value={this.handleChange}>
                    {activeChild}
                  </ChangeProvider>
                </PrevProvider>
              </NextProvider>
            </ValidationProvider>
          </IndexProvider>
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
  onChange: PropTypes.func,
  initialValues: PropTypes.shape({}),
  validates: PropTypes.shape({}),
};

QuestionFlow.defaultProps = {
  onChange: null,
  initialValues: null,
  validates: {},
};

export default QuestionFlow;
