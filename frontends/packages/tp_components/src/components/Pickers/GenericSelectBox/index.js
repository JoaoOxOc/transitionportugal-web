import {
    Select
  } from "@mui/material";

const GenericSelectBox = ({ children, form, field }) => {
    const { name, value } = field;
    const { setFieldValue } = form;
  
    return (
      <Select
        sx={{width: '100%'}}
        name={name}
        value={value}
        onChange={e => {
          setFieldValue(name, e.target.value);
        }}
      >
        {children}
      </Select>
    );
  };

export default GenericSelectBox