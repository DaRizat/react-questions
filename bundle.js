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

class QuestionFlow extends React.Component {
  constructor(props) {
    super(props);
    const {
      children
    } = props;
    this.state = {
      index: children,
      current: 0,
      values: {},
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
      current
    } = this.state;
    const {
      children
    } = this.props;

    if (current < children.length - 1) {
      this.setState({
        current: current + 1
      });
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
    // const { validate } = this.props;
    const {
      values
    } = this.state;
    const {
      name,
      value
    } = payload;
    const errors = {};
    const newValues = Object.assign({}, values, {
      [name]: value
    });
    /*
    if (validate) {
      errors = runValidations(newValues);
    }
    */

    const {
      children
    } = this.props;
    const newIndex = children.filter(child => !child.props.skipWhen || !child.props.skipWhen(newValues));
    this.setState({
      values: newValues,
      errors,
      index: newIndex
    });
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
    }, React__default.createElement(NextProvider, {
      value: this.handleNext
    }, React__default.createElement(PrevProvider, {
      value: this.handlePrev
    }, React__default.createElement(ChangeProvider, {
      value: this.handleChange
    }, activeChild)))));
  }

}

QuestionFlow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.func])).isRequired
};

/* eslint-disable import/prefer-default-export */

const Question = ({
  children,
  answer,
  name,
  ask
}) => {
  const Answer = answer || children;
  return React__default.createElement(ValuesConsumer, null, values => React__default.createElement(ErrorsConsumer, null, errors => React__default.createElement(FormProvider, {
    value: {
      name,
      values,
      errors
    }
  }, React__default.createElement(Answer, {
    question: ask
  }))));
};

Question.propTypes = {
  children: PropTypes.element,
  answer: PropTypes.element,
  name: PropTypes.string.isRequired,
  ask: PropTypes.string.isRequired
};
Question.defaultProps = {
  children: null,
  answer: null
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

const Skip = () => React__default.createElement(NextConsumer, null, nextAction => nextAction());

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
  return () => React__default.createElement(NextConsumer, null, handleNext => React__default.createElement(PrevConsumer, null, handlePrev => React__default.createElement(WrappedComponent, _extends({}, props, {
    handleNext: handleNext,
    handlePrev: handlePrev
  }))));
};

exports.QuestionFlow = QuestionFlow;
exports.Question = Question;
exports.Answer = Answer;
exports.Field = Field;
exports.Skip = Skip;
exports.NextButton = NextButton;
exports.PrevButton = PrevButton;
exports.withQuestion = withQuestion;
exports.withNavigation = WithNavigation;
