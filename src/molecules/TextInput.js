import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  border: 1px solid ${props => (props.error ? 'red' : 'gray')};
  padding: 5px 10px;
  font-size: 14px;
`;

class TextInput extends Component {
  constructor (props) {
    super(props);
    this.inputRef = React.createRef();
  }

  focus () {
    this.inputRef.current.focus();
  }

  render() {
    const {
      name, value, error, autoFocus, handleChange, handleInvalidInput, handleValidInput, validator,
    } = this.props;
    return (
      <Row>
        <Input
          type="text"
          ref={this.inputRef}
          error={error}
          value={value || ''}
          onChange={(event) => {
            event.preventDefault();
            const v = event.target.value;
            handleChange({ name, value: v });
          }}
          onBlur={(event) => {
            event.preventDefault();
            const v = event.target.value;
            if (validator) {
              validator.validate(v)
                .then(() => {
                  console.log(`VALID INPUT ${name}`);
                  handleValidInput(name)
                })
                .catch(e => handleInvalidInput({ name, error: e }));
            }
          }}
        />
        { error
            && <Error>{error}</Error>
        }
      </Row>
    )
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
    validate: PropTypes.func.isRequired,
  }),
  autoFocus: PropTypes.bool,
};

TextInput.defaultProps = {
  error: null,
  validator: null,
  autoFocus: false,
};

export default TextInput;
