import {
    Select
  } from "@mui/material";

const GenericSelectBox = ({ children, form, field, sendSelected, fieldDependentOf, fieldDependentOfValue, ...rest }) => {
    const { name, value } = field;
    const { setFieldValue } = form;
  
    return (
      <Select
        sx={{width: '100%'}}
        name={name}
        value={value}
        onChange={(e,child) => {
          if (sendSelected) {
            const label = child && child.props ? child.props.children : '';
            sendSelected(e.target.value,label);
          }
          if (fieldDependentOf) {
            setFieldValue(fieldDependentOf, fieldDependentOfValue);
          }
          setFieldValue(name, e.target.value);
        }}
      >
        {children}
      </Select>
    );
  };

export default GenericSelectBox