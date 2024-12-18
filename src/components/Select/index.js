import React from 'react';
import * as C from './styles';

const Select = ({ value, onChange, options }) => {
  return (
    <C.Select value={value} onChange={onChange}>
      <option value="" disabled="true">Selecione uma função*</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </C.Select>
  );
};

export default Select;
