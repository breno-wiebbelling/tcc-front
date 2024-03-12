import React from "react";
import StyledDropdown from "./styled";
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ClickOutsideWrapper from '../../workflow/nodes/types/ClickOutsideElement'; 

const isThisTheLastOfArray = (array, element) => {
  let lastIndex = array.length-1;
  let currentIndex = array.indexOf(element);

  return lastIndex === currentIndex;
}

export default ({ options, value, onChange, placeholder, hasNewValueOption, onNewValueOptionClick }) => {
  const [isOptionsOpen, setIsOptionOpen] = React.useState(false);
  const [display, setDisplay] = React.useState("");
 
  React.useEffect(() => {
    options = options.map(option => {
      option.isLastOne = isThisTheLastOfArray(options, option);
      return option;
    })
  },[])

  React.useEffect(() => {
    setDisplay((value!= null && value!=="" && value.label!="") ? value.label : placeholder);
  }, [value])

  return (
    <StyledDropdown 
      value={value} 
      style={{
        borderBottomLeftRadius: (isOptionsOpen) ? "0px" : "8px",
        borderBottomRightRadius: (isOptionsOpen) ? "0px" : "8px"
      }}  
    >
      <ClickOutsideWrapper 
        className="wrapper" 
        onOutsideClick={ () => { setIsOptionOpen(false); } }
      >
          <div 
            className="dropdown-label-display" 
            onClick={()=>{ setIsOptionOpen(latest => !latest) }}
          >
            <p className="dropdown-placeholder">{display}</p>
            <div className="dropdown-buttons">
              <ArrowBackIosIcon
                className='dropdown-drop-icon'
                style={{ rotate: (isOptionsOpen) ? "90deg" : "-90deg" }}
              />
              { hasNewValueOption &&
                <AddIcon className='dropdown-add-icon' onClick={()=>{ setIsOptionOpen(latest => !latest) }} />
              }
            </div>
          </div>
          {
            isOptionsOpen &&
            <div className="dropdown-options">
              {
                options.map((option) => (
                  <div 
                    className="dropdown-option"  
                    key={option.key}
                    onClick={() => { 
                      onChange(option);
                      setIsOptionOpen(false)
                    }}
                    style={{
                      borderBottomLeftRadius: (option.isLastOne) ? "0px" : "8px",
                      borderBottomRightRadius: (option.isLastOne) ? "0px" : "8px",
                    }}  
                  >
                    {option.label}
                  </div>
                ))
              }
            </div>
          }
      </ClickOutsideWrapper>

    </StyledDropdown>
  );
};
