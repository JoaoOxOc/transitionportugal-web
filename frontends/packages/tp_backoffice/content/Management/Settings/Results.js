import { useContext, SyntheticEvent, useState, ReactElement, Ref, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { SettingsSearchContext } from '../../../contexts/Search/SettingsSearchContext';

const Results = ({ settings, settingsType }) => {
    const {search} = useContext(SettingsSearchContext);
    console.log(search, settings, settingsType);
    return (
        <></>
    )
}

Results.propTypes = {
    settings: PropTypes.array.isRequired
};
  
Results.defaultProps = {
    settings: []
};
  
export default Results;