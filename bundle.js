'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var lodash = require('lodash');
var concat = _interopDefault(require('lodash/fp/concat'));
var styled = _interopDefault(require('styled-components'));
var yup = require('yup');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

const ChangeContext = React__default.createContext(() => {});
const ChangeProvider = ChangeContext.Provider;
const ChangeConsumer = ChangeContext.Consumer;
const ErrorsContext = React__default.createContext({});
const ErrorsProvider = ErrorsContext.Provider;
const ErrorsConsumer = ErrorsContext.Consumer;
const FormContext = React__default.createContext({});
const FormProvider = FormContext.Provider;
const FormConsumer = FormContext.Consumer;
const IndexContext = React__default.createContext(() => ({
  current: 0,
  total: 0
}));
const IndexProvider = IndexContext.Provider;
const IndexConsumer = IndexContext.Consumer;
const InputContext = React__default.createContext({});
const InputProvider = InputContext.Provider;
const InputConsumer = InputContext.Consumer;
const NextContext = React__default.createContext(() => {});
const NextProvider = NextContext.Provider;
const NextConsumer = NextContext.Consumer;
const PrevContext = React__default.createContext(() => {});
const PrevProvider = PrevContext.Provider;
const PrevConsumer = PrevContext.Consumer;
const ValidationContext = React__default.createContext(() => {});
const ValidationProvider = ValidationContext.Provider;
const ValidationConsumer = ValidationContext.Consumer;
const ValuesContext = React__default.createContext({});
const ValuesProvider = ValuesContext.Provider;
const ValuesConsumer = ValuesContext.Consumer;

class QuestionFlow extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      index: this.props.children,
      current: 0,
      values: {},
      errors: {}
    });

    _defineProperty(this, "calculateIndex", values => {
      const {
        children
      } = this.props;
      return children.filter(child => !child.props.when || child.props.when && child.props.when(values));
    });

    _defineProperty(this, "handleNext", () => {
      const {
        current,
        values,
        errors
      } = this.state;
      const {
        children,
        onSubmit
      } = this.props;

      if (Object.keys(errors).length === 0) {
        if (current < children.length - 1) {
          this.setState({
            current: current + 1
          });
        } else {
          onSubmit(values);
        }
      }
    });

    _defineProperty(this, "handlePrev", () => {
      const {
        current
      } = this.state;

      if (current > 0) {
        this.setState({
          current: current - 1
        });
      }
    });

    _defineProperty(this, "handleChange", payload => {
      const {
        onChange
      } = this.props;
      const {
        values
      } = this.state;
      const {
        name,
        value
      } = payload;
      const newValues = lodash.set(name, value, values);
      const newIndex = this.calculateIndex(newValues);
      this.setState({
        values: newValues,
        index: newIndex
      });

      if (onChange) {
        onChange(newValues);
      }
    });

    _defineProperty(this, "handleInvalidInput", payload => {
      const {
        name,
        error
      } = payload;
      const {
        errors
      } = this.state;
      const newErrors = lodash.set(name, error.message, errors);
      this.setState({
        errors: newErrors
      });
    });

    _defineProperty(this, "handleValidInput", name => {
      const {
        errors
      } = this.state;
      let newErrors = errors;

      if (lodash.get(name, errors)) {
        newErrors = lodash.unset(name, errors);
      }

      this.setState({
        errors: newErrors
      });
    });
  }

  render() {
    const {
      validates
    } = this.props;
    const {
      values,
      index,
      current,
      errors
    } = this.state;
    const activeChild = index[current];
    return React__default.createElement(ValuesProvider, {
      value: values
    }, React__default.createElement(ErrorsProvider, {
      value: errors
    }, React__default.createElement(IndexProvider, {
      value: {
        current,
        total: index.length
      }
    }, React__default.createElement(ValidationProvider, {
      value: {
        schema: validates,
        handleInvalidInput: this.handleInvalidInput,
        handleValidInput: this.handleValidInput
      }
    }, React__default.createElement(NextProvider, {
      value: this.handleNext
    }, React__default.createElement(PrevProvider, {
      value: this.handlePrev
    }, React__default.createElement(ChangeProvider, {
      value: this.handleChange
    }, activeChild)))))));
  }

}

QuestionFlow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.func])).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  initialValues: PropTypes.shape({}),
  validates: PropTypes.shape({})
};
QuestionFlow.defaultProps = {
  onChange: null,
  initialValues: null,
  validates: {}
};

/* eslint-disable import/prefer-default-export */

const Ask = ({
  children,
  question,
  name
}) => React__default.createElement(Answer, {
  name: name,
  question: question
}, children);

Ask.propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired
};

class Answer extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      inputs: []
    });

    _defineProperty(this, "registerInput", input => {
      console.log('REGISTERING', input);
      const {
        inputs
      } = this.state;
      const newInputs = concat(inputs)([input]);
      this.setState({
        inputs: newInputs
      });
    });
  }

  componentDidMount() {
    const {
      inputs
    } = this.state;

    for (let i = 0; i < inputs.length; i += 1) {
      if (i.props.autoFocus && i.focus) {
        i.focus();
        break;
      }
    }
  }

  render() {
    const {
      name,
      question,
      children
    } = this.props;
    const {
      registerInput
    } = this;
    return React__default.createElement(ValuesConsumer, null, values => React__default.createElement(ErrorsConsumer, null, errors => React__default.createElement(FormProvider, {
      value: {
        name,
        values,
        errors,
        registerInput
      }
    }, React__default.cloneElement(children, { ...children.props,
      question
    }))));
  }

}

Answer.propTypes = {
  name: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.arrayOf(PropTypes.func), PropTypes.arrayOf(PropTypes.element)]).isRequired
};

const asyncDo = async (action, values, next) => {
  await action(values);
  next();
};

const syncDo = (action, values, next) => {
  action(values);
  next();
};

const Do = ({
  async,
  action
}) => React__default.createElement(ValuesConsumer, null, values => React__default.createElement(NextConsumer, null, handleNext => {
  if (async) {
    asyncDo(action, values, handleNext);
  } else {
    syncDo(action, values, handleNext);
  }
}));

Do.propTypes = {
  async: PropTypes.bool,
  action: PropTypes.func.isRequired
};
Do.defaultProps = {
  async: false
};

const Branch = ({
  children
}) => children;

Branch.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
};

const Row = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  flex-direction: column;
`;
const Error = styled.span`
  width: 100%;
  text-align: right;
  color: red;
`;
const Input = styled.input`
  height: 36px;
  border-radius: 10px;
  border: 1px solid ${props => props.error ? 'red' : 'gray'};
  padding: 5px 10px;
  font-size: 14px;
`;

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React__default.createRef();
  }

  focus() {
    this.inputRef.current.focus();
  }

  render() {
    const {
      name,
      value,
      error,
      autoFocus,
      handleChange,
      handleInvalidInput,
      handleValidInput,
      validator
    } = this.props;
    return React__default.createElement(Row, null, React__default.createElement(Input, {
      type: "text",
      ref: this.inputRef,
      error: error,
      value: value || '',
      onChange: event => {
        event.preventDefault();
        const v = event.target.value;
        handleChange({
          name,
          value: v
        });
      },
      onBlur: event => {
        event.preventDefault();
        const v = event.target.value;

        if (validator) {
          validator.validate(v).then(() => {
            console.log(`VALID INPUT ${name}`);
            handleValidInput(name);
          }).catch(e => handleInvalidInput({
            name,
            error: e
          }));
        }
      }
    }), error && React__default.createElement(Error, null, error));
  }

}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleInvalidInput: PropTypes.func.isRequired,
  handleValidInput: PropTypes.func.isRequired,
  validator: PropTypes.shape({
    validate: PropTypes.func.isRequired
  }),
  autoFocus: PropTypes.bool
};
TextInput.defaultProps = {
  error: null,
  validator: null,
  autoFocus: false
};

const Field = ({
  name,
  children
}) => {
  const [registered, setRegistered] = React.useState(false);
  const {
    name: formName,
    values,
    errors,
    registerInput
  } = React.useContext(FormContext);
  const {
    schema,
    handleInvalidInput,
    handleValidInput
  } = React.useContext(ValidationContext);
  const handleChange = React.useContext(ChangeContext);
  const inputName = !name || name === formName ? formName : `${formName}.${name}`;
  const value = lodash.get(inputName, values);
  const error = lodash.get(inputName, errors);
  const newChild = React__default.cloneElement(children, {
    name: inputName,
    value,
    error,
    handleChange,
    handleInvalidInput,
    handleValidInput,
    validator: schema && yup.reach(schema, inputName) || null
  });

  if (!registered) {
    registerInput(newChild);
    setRegistered(true);
  }

  return newChild;
};

Field.propTypes = {
  name: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired
};
Field.defaultProps = {
  name: null
};

const Skip = ({
  when,
  unless
}) => React__default.createElement(NextConsumer, null, nextAction => {
  if (when && !unless) {
    nextAction();
  }
});

Skip.propTypes = {
  when: PropTypes.bool,
  unless: PropTypes.bool
};
Skip.defaultProps = {
  when: undefined,
  unless: undefined
};

const Button = styled.button`
  background-color: green;
  border-radius: 10px;
  padding: 10px;
  color: white;
  border-width: 0;
  cusror: pointer;
`;

const NextButton = () => React__default.createElement(NextConsumer, null, handleNext => React__default.createElement(Button, {
  onClick: handleNext
}, "Next"));

const Button$1 = styled.button`
  background-color: green;
  border-radius: 10px;
  padding: 10px;
  color: white;
  border-width: 0;
  cusror: pointer;
`;

const PrevButton = () => React__default.createElement(PrevConsumer, null, handlePrev => React__default.createElement(Button$1, {
  onClick: handlePrev
}, "Prev"));

var withQuestion = ((WrappedComponent, question) => {
  const {
    name,
    condition
  } = question;
  return () => React__default.createElement(ValuesConsumer, null, values => React__default.createElement(ErrorsConsumer, null, errors => React__default.createElement(FormProvider, {
    value: {
      name,
      value: values[name],
      error: errors[name]
    }
  }, React__default.createElement(WrappedComponent, _extends({}, question, {
    condition: condition ? () => condition(values) : null
  })))));
});

const WithNavigation = WrappedComponent => {
  const {
    props
  } = WrappedComponent;
  return () => React__default.createElement(NextConsumer, null, handleNext => React__default.createElement(PrevConsumer, null, handlePrev => React__default.createElement(IndexConsumer, null, index => React__default.createElement(WrappedComponent, _extends({}, props, {
    handleNext: handleNext,
    handlePrev: handlePrev,
    current: index.current,
    total: index.total
  })))));
};

exports.Answer = Answer;
exports.Field = Field;
exports.NextButton = NextButton;
exports.PrevButton = PrevButton;
exports.QuestionFlow = QuestionFlow;
exports.Skip = Skip;
exports.withNavigation = WithNavigation;
exports.withQuestion = withQuestion;
