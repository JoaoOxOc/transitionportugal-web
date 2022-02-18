import React from 'react';
import ReactCountryFlag from "react-country-flag"

// import local libraries
import {GenericDropdown} from '../generic/dropdown';

export default function Language() {

    const langOptions = [
        {label: "United States", key: "en", icon: <ReactCountryFlag className="emojiFlag" countryCode="US" svg/>},
        {label: "Portugal", key: "pt", icon: <ReactCountryFlag className="emojiFlag" countryCode="PT" svg/>},
    ];

    const handleLanguage = (langValue) => {
        console.log(langValue);
        const customEvent = new CustomEvent('newLang', { detail: langValue });
        window.dispatchEvent(customEvent);
    }

    return (
        <GenericDropdown onChangedOption={handleLanguage} items={langOptions} defaultOption={<>{langOptions[1].icon} {langOptions[1].label}</>} ariaLabel="select your language" name="select-language-drop" className={'selectbox-right'}/>
    );
}