import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

export function GenericDropdown({ items, defaultOption, name, className, ariaLabel, onChangedOption }) {
    const initOption = defaultOption ? defaultOption : "Select an Option";
    const [toggleContents, setToggleContents] = useState(initOption);
    const [selectedOption, setSelectedOption] = useState();

    const buildOptions = () => {
        const listItems = items.map((item, i) =>
            <Dropdown.Item key={item.key} eventKey={item.key}>{item.icon} {item.label}</Dropdown.Item>
        );
        return (
            <Dropdown.Menu>
                {listItems}
          </Dropdown.Menu>
        );
    }
    
    const handleInputChange = (eventKey) => {
        const {label, icon} = items.find(({key}) => eventKey == key);
        setSelectedOption(eventKey);
        setToggleContents(<>{icon} {label}</>);
        onChangedOption(eventKey);
    }

    return (
        <Dropdown onSelect={eventKey => handleInputChange(eventKey)}>
            <Dropdown.Toggle variant="secondary" id="dropdown-flags" className="text-left" style={{ width: 200 }}>
                {toggleContents}
            </Dropdown.Toggle>
            {buildOptions()}
        </Dropdown>
    );
}