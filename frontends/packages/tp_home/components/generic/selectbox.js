import React from 'react'
import { Select, Box } from 'theme-ui'

export function GenericSelectBox({ items, name, className, ariaLabel }) {
    const buildOptions = () => {
        const listItems = items.map((item, i) => 
            <option key={i} value={item.value}>
                {item.label}
            </option>
        );
        return (
          <Select 
            arrow={
                <Box
                    as="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="black"
                    sx={{
                        ml: -28,
                        alignSelf: 'center',
                        pointerEvents: 'none',
                    }}>
                    <path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
                </Box>
            }
            defaultValue="pt" 
            className={className} 
            aria-label={ariaLabel} 
            name={name} 
            onChange={handleInputChange}>
                {listItems}
          </Select>
        );
    }
    
    const handleInputChange = (event) => {
        console.log(event);
    }

    return (
        <div>
        {buildOptions()}
        </div>
    );
}