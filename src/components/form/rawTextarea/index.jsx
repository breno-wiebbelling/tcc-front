import React, { useState } from 'react';

export default ({ value, onChange, placeholder, error }) => {
  const [inputValue, setInputValue] = useState(value);
  const [showLimitMessage, setShowLimitMessage] = useState(false);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 500) {
      setInputValue(inputValue);
      onChange(event);
      setShowLimitMessage(false);
    } else {
      setShowLimitMessage(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const { selectionStart, selectionEnd } = event.target;
      const newInputValue = inputValue.substring(0, selectionStart) + '\t' + inputValue.substring(selectionEnd);
      setInputValue(newInputValue);
      event.target.setSelectionRange(selectionStart + 1, selectionStart + 1);
    }
  };

  return (
    <div>
      <textarea
        placeholder={placeholder} style={{ width: "100%", height: "50%", fontSize: "15px", padding: "15px", boxSizing: "border-box", resize: "none", border: `2px solid ${error ? 'red' : 'black'}`, borderRadius: "5px", marginTop: "8px"}}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {showLimitMessage && <span style={{ color: 'gray', fontSize: '12px' }}>Você atingiu o limite de caracteres (400)</span>}
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  );
};