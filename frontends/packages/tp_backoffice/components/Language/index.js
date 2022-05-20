import React from 'react';
import ReactCountryFlag from "react-country-flag"

// import local libraries
import {GenericDropdown} from '../Dropdown';

export default function Language({selectId, readonly, defaultValue, sendSelectedLanguage, ...extraProps}) {

    if (readonly == true) {
        extraProps.disabled = true;
    }
    const langOptions = [
        {label: "United States", key: "en-us", icon: <ReactCountryFlag className="emojiFlag" countryCode="US" svg/>},
        {label: "Portugal", key: "pt-pt", icon: <ReactCountryFlag className="emojiFlag" countryCode="PT" svg/>},
    ];

    const handleLanguage = (langValue) => {
        if (sendSelectedLanguage) {
            sendSelectedLanguage(langValue);
        }
        else {
            const customEvent = new CustomEvent('newLang', { detail: langValue });
            window.dispatchEvent(customEvent);
        }
    }

    return (
        <GenericDropdown elementId={selectId} onChangedOption={handleLanguage} items={langOptions} defaultOption={defaultValue ? defaultValue.toLowerCase() : langOptions[1].key} ariaLabel="select your language" name="select-language-drop" className={'selectbox-right'} {...extraProps}/>
    );
}