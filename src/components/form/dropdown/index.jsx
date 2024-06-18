import React from "react";
import StyledDropdown from "./styled";
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/KeyboardArrowDown';
import ClickOutsideWrapper from '../../common/ClickOutsideElement';
import Tooltip from "@mui/material/Tooltip";
import { white, smokeWhiteLightHover, smokeWhite, smoke, smokeHover, smokeBlack } from "../../common/style/index";
import IconButton from "@mui/material/IconButton";

const isThisTheLastOfArray = (array, element) => {
  let lastIndex = array.length - 1;
  let currentIndex = array.indexOf(element);

  return lastIndex === currentIndex;
}

export default ({ options, value, onChange, placeholder, hasNewValueOption, onNewValueOptionClick, isEnabled, tooltipTitle, iconSizes }) => {
  const [isOptionsOpen, setIsOptionOpen] = React.useState(false);
  const [display, setDisplay] = React.useState("");
  const [hasChanged, setHasChanged] = React.useState(false);

  iconSizes = (typeof iconSizes != "undefined") ? iconSizes : { width: '25px', height: '25px' };

  React.useEffect(() => {
    options = options.map(option => {
      option.isLastOne = isThisTheLastOfArray(options, option);
      return option;
    })
  }, [])

  React.useEffect(() => {
    if (value !== null && typeof value !== 'undefined' && typeof value['key'] !== 'undefined' && value['key'] !== 'key') {
      setHasChanged(true);
    }

    setDisplay(
      value !== null &&
      value instanceof Object &&
        value !== "" &&
        value.label !== undefined &&
        value.label !== ""
        ? value.label
        : placeholder
    );
  }, [value]);

  const getVariableValue = (variable) => {
    if (variable !== null && typeof variable !== "undefined" && variable.constructor === ({}).constructor) {
      return JSON.stringify(variable);
    }

    return String(variable)
  }

  if (typeof isEnabled === 'undefined') {
    isEnabled = true;
  }

  return (
    <StyledDropdown value={value} style={{ backgroundColor: ((isEnabled) ? white : smokeWhiteLightHover), borderBottomLeftRadius: (isOptionsOpen && isEnabled) ? "0px" : "8px", borderBottomRightRadius: (isOptionsOpen && isEnabled) ? "0px" : "8px", cursor: (!isEnabled) ? "not-allowed" : "pointer" }} >
      <ClickOutsideWrapper
        className="wrapper"
        onOutsideClick={() => { setIsOptionOpen(false); }}
      >
        <Tooltip title={(!isEnabled || !isOptionsOpen) ? tooltipTitle : ""} disableInteractive>
          <div className="dropdown-label-display" style={{ borderColor: ((hasChanged) ? smokeBlack : smokeHover) }} onClick={() => { setIsOptionOpen(latest => !latest) }}>
            <p className="dropdown-placeholder" style={{ color: ((hasChanged) ? smokeBlack : smokeHover) }} >{display}</p>
            {isEnabled &&
              (
                <div className="dropdown-buttons">
                  <IconButton className={`dropdown-drop-icon`} sx={{ ...iconSizes, color: white, rotate: (isOptionsOpen) ? "180deg" : "0deg" }}>
                    <ArrowBackIosIcon />
                  </IconButton>
                  {hasNewValueOption &&
                    <IconButton
                      className='dropdown-add-icon'
                      onClick={() => {
                        onNewValueOptionClick();
                        setIsOptionOpen(latest => !latest)
                      }}
                      style={{ ...iconSizes }}
                    >
                      <AddIcon />
                    </IconButton>
                  }
                </div>
              )
            }
          </div>
        </Tooltip>
        {
          isOptionsOpen && isEnabled &&
          <div className="dropdown-options">
            {
              options.length > 0 &&
              options.map((option) => (
                <Tooltip title={getVariableValue(option.value)} key={option.key} disableInteractive>
                  <div
                    className="dropdown-option"
                    onClick={() => {
                      onChange(option);
                      setHasChanged(true);
                      setIsOptionOpen(false)
                    }}
                    style={{
                      borderBottomLeftRadius: (option.isLastOne) ? "8px" : "0px",
                      borderBottomRightRadius: (option.isLastOne) ? "8px" : "0px",
                      cursor: 'pointer'
                    }}
                  >
                    <p>{option.label}</p>
                  </div>
                </Tooltip>
              ))
            }
            {
              options.length <= 0 &&
              (
                <div
                  className="dropdown-option no_options_available"
                  key="no_options_available"
                  style={{ borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" }}
                >
                  Nenhuma opção disponível!
                </div>
              )
            }
          </div>
        }
      </ClickOutsideWrapper>

    </StyledDropdown>
  );
};
