import React, { useEffect, useRef } from 'react';

const ClickOutsideWrapper = ({ onOutsideClick, children }) => {
  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      onOutsideClick();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onOutsideClick]);

  return <div 
    ref={wrapperRef}
    style={{
      width:"100%",
      height:"100%"
    }}
  >
    {children}
  </div>;
};

export default ClickOutsideWrapper;
