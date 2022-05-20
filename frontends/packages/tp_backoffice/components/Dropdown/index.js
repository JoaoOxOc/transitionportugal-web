import React, { useState } from 'react'
import { 
    Select,
    MenuItem,
    ListItemIcon,
    ListItemText,
    styled
} from '@mui/material';

const DropdownItem = styled(MenuItem)(
    ({ theme }) => `
  
    .MuiListItemIcon-root {
    }
    
    `
  );

export function GenericDropdown({ items, elementId, defaultOption, name, className, ariaLabel, onChangedOption, ...extraProps }) {
    const [selectedOption, setSelectedOption] = useState(defaultOption);

    const buildOptions = () => {
        const listItems = items.map((item, i) =>
            <DropdownItem key={item.key} value={item.key}>
            <div style={{display:'flex', alignItems:'center'}}>
                { item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}<ListItemText primary={item.label}/>
            </div>
            </DropdownItem>
            // <option key={item.key} value={item.key}>{item.icon} {item.label}</option>
        );
        return listItems;
    }
    
    const handleInputChange = (event) => {
        setSelectedOption(event.target.value);
        onChangedOption(event.target.value);
    }

    return (
            <Select
                value={selectedOption}
                onChange={handleInputChange}
                inputProps={{
                name: name,
                id: elementId,
                }}
                {...extraProps}
            >
                {buildOptions()}
            </Select>
    );
}