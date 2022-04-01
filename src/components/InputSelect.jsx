import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputSelect extends Component {
  render() {
    const { name, type, label, options, onChange, value } = this.props;

    if (type === 'select') {
      return (
        <label htmlFor={ name }>
          { label }
          <select
            data-testid={ `${name}-input` }
            id={ name }
            name={ name }
            onChange={ onChange }
            value={ value }
          >
            { options.map((option) => <option key={ option }>{option}</option>)}
          </select>
        </label>
      );
    }
    return (
      <label htmlFor={ name }>
        { label }
        <input
          onChange={ onChange }
          id={ name }
          data-testid={ `${name}-input` }
          type={ type }
          name={ name }
          value={ value }
        />
      </label>
    );
  }
}

InputSelect.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  handleChange: PropTypes.func,
  value: PropTypes.string,
}.isRequired;

export default InputSelect;
