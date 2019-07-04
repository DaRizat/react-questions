'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var styled = _interopDefault(require('styled-components'));

const ValuesContext = React__default.createContext({});
const ErrorsContext = React__default.createContext({});
const FormContext = React__default.createContext({});
const InputContext = React__default.createContext({});
const NextContext = React__default.createContext(() => {});
const PrevContext = React__default.createContext(() => {});
const ChangeContext = React__default.createContext(() => {});
const IndexContext = React__default.createContext(() => ({
  current: 0,
  total: 0
}));
const ValuesProvider = ValuesContext.Provider;
const ValuesConsumer = ValuesContext.Consumer;
const ErrorsProvider = ErrorsContext.Provider;
const ErrorsConsumer = ErrorsContext.Consumer;
const FormProvider = FormContext.Provider;
const FormConsumer = FormContext.Consumer;
const InputProvider = InputContext.Provider;
const InputConsumer = InputContext.Consumer;
const ChangeProvider = ChangeContext.Provider;
const ChangeConsumer = ChangeContext.Consumer;
const NextProvider = NextContext.Provider;
const NextConsumer = NextContext.Consumer;
const PrevProvider = PrevContext.Provider;
const PrevConsumer = PrevContext.Consumer;
const IndexProvider = IndexContext.Provider;
const IndexConsumer = IndexContext.Consumer;

class QuestionFlow extends React.Component {
  constructor(props) {
    super(props);
    const {
      children
    } = props;
    this.state = {
      index: children,
      current: 0,
      values: props.initialValues || {},
      errors: {}
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
    const {
      current,
      values
    } = this.state;
    const {
      children,
      onSubmit
    } = this.props;

    if (current < children.length - 1) {
      this.setState({
        current: current + 1
      });
    } else {
      onSubmit(values);
    }
  }

  handlePrev() {
    const {
      current
    } = this.state;

    if (current > 0) {
      this.setState({
        current: current - 1
      });
    }
  }

  handleChange(payload) {
    const {
      values
    } = this.state;
    const {
      name,
      value
    } = payload;
    const newValues = Object.assign({}, values, {
      [name]: value
    });
    const {
      children,
      onChange
    } = this.props;
    const newIndex = children.filter(child => !child.props.skipWhen || !child.props.skipWhen(newValues));
    this.setState({
      values: newValues,
      index: newIndex
    });

    if (onChange) {
      onChange(newValues);
    }
  }

  render() {
    const {
      values,
      errors,
      index,
      current
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
    }, React__default.createElement(NextProvider, {
      value: this.handleNext
    }, React__default.createElement(PrevProvider, {
      value: this.handlePrev
    }, React__default.createElement(ChangeProvider, {
      value: this.handleChange
    }, activeChild))))));
  }

}

QuestionFlow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.func])).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  initialValues: PropTypes.shape({})
};
QuestionFlow.defaultProps = {
  onChange: null,
  initialValues: null
};

/* eslint-disable import/prefer-default-export */

const Question = ({
  children,
  answer,
  name,
  ask,
  required
}) => {
  const Answer = answer || children;
  return React__default.createElement(ValuesConsumer, null, values => React__default.createElement(ErrorsConsumer, null, errors => React__default.createElement(FormProvider, {
    value: {
      name,
      values,
      errors
    }
  }, React__default.createElement(Answer, {
    question: ask,
    required: required
  }))));
};

Question.propTypes = {
  children: PropTypes.element,
  answer: PropTypes.element,
  name: PropTypes.string.isRequired,
  ask: PropTypes.string.isRequired,
  required: PropTypes.bool
};
Question.defaultProps = {
  children: null,
  answer: null,
  required: false
};

const Answer = ({
  name,
  children
}) => {
  return React__default.createElement(ValuesConsumer, null, values => React__default.createElement(ErrorsConsumer, null, errors => React__default.createElement(FormProvider, {
    value: {
      name,
      value: values[name],
      error: errors[name]
    }
  }, children)));
};

const Field = ({
  name,
  component
}) => {
  const Component = component;
  return React__default.createElement(FormConsumer, null, form => {
    const {
      name: formName,
      values,
      errors
    } = form;
    const inputName = name === formName ? name : `${formName}.${name}`;
    return React__default.createElement(ChangeConsumer, null, handleChange => React__default.createElement(Component, {
      values: values,
      name: inputName,
      value: values[inputName],
      error: errors[inputName],
      handleChange: event => {
        event.preventDefault();
        handleChange({
          name: inputName,
          value: event.target.value
        });
      }
    }));
  });
};

Field.propTypes = {
  name: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired
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
exports.Question = Question;
exports.QuestionFlow = QuestionFlow;
exports.Skip = Skip;
exports.withNavigation = WithNavigation;
exports.withQuestion = withQuestion;
