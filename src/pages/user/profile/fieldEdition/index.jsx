import React from 'react';
import Input from "../../../../components/form/rawInput/index"
import EditIcon from '@mui/icons-material/Edit';

export default ({ fieldName, fieldValue, handleValueChange }) => {

  const [isEditionEnabled, setIsEditionEnabled] = React.useState(false);
  const [fieldState, setFieldState] = React.useState(fieldValue);

  React.useEffect(() => {
    setFieldState(fieldValue)
  }, [fieldValue])

  return (
    <div style={{ width: '100%', justifyContent: 'start' }} >
      {isEditionEnabled &&
        (
          <Input
            value={ fieldState }
            onChange={(event) => { setFieldState(event.target.value); handleValueChange(event.target.value, fieldName) }}
            type="text"
            placeholder={`Insira seu ${fieldName}`}
          />
        )
      }
      {!isEditionEnabled &&
        (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} >
            <p style={{ margin: "10px 0px" }} > { fieldValue } </p>
            <EditIcon onClick={() => { setIsEditionEnabled(true) }} className="edit_field_name_icon" />
          </div>
        )
      }
    </div>
  )
}