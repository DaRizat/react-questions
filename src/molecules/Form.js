import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    const { children, name, values, errors } = this.props;
    this.state = {
      formName: name,
      values,
      errors,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(payload) {
    const { name, value } = payload;
    const { values, formName } = this.state;
    const { handleChange } = this.props;
    let newValues;
    if (name === undefined || name === formName) {
      newValues = value; 
    } else {
      newValues = Object.assign({}, values, { [name]: value });
    }
    this.setState({ values: newValues });
    handleChange({ [formName]: newValues });
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default Form;
