import { __rest } from "tslib";
import React, { useState, Fragment } from 'react';
import { Autocomplete, CircularProgress, TextField, styled } from '@mui/material';
import { getOdsPtDistricts } from '../../odsptagreggator';
const CustomAutocomplete = styled(Autocomplete)(() => `
    input {
        height: 15px !important;
    }
    `);
export default function DistrictSelect(_a) {
    var { selectId, selectLabel, notFoundLabel, defaultValue, sendSelectedDistrict } = _a, extraProps = __rest(_a, ["selectId", "selectLabel", "notFoundLabel", "defaultValue", "sendSelectedDistrict"]);
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const loading = open && options.length === 0;
    const fetchDistrictOptions = () => {
        let newOptions = [];
        getOdsPtDistricts().forEach((element) => {
            const opt = {
                label: element.distrito,
                key: element.district_code
            };
            newOptions.push(opt);
        });
        setOptions(newOptions);
    };
    fetchDistrictOptions();
    const handleSelectDistrict = (districtValue) => {
        setValue(districtValue);
        if (sendSelectedDistrict) {
            sendSelectedDistrict(districtValue ? districtValue.key : '');
        }
    };
    return (React.createElement(CustomAutocomplete, { filterOptions: (x) => x, id: selectId, sx: { width: "100%", height: "10px" }, open: open, onOpen: () => {
            setOpen(true);
        }, onClose: () => {
            setOpen(false);
        }, isOptionEqualToValue: (option, value) => option.key === value.key, getOptionLabel: (option) => option.label, autoComplete: true, includeInputInList: true, filterSelectedOptions: true, options: options, loading: loading, onChange: (event, newValue) => {
            setOptions(newValue ? [newValue, ...options] : options);
            handleSelectDistrict(newValue);
        }, onInputChange: (event, newInputValue) => {
            setInputValue(newInputValue);
        }, renderInput: (params) => (React.createElement(TextField, Object.assign({}, params, { label: selectLabel, InputProps: Object.assign(Object.assign({}, params.InputProps), { endAdornment: (React.createElement(Fragment, null,
                    loading ? React.createElement(CircularProgress, { color: "inherit", size: 20 }) : null,
                    params.InputProps.endAdornment)) }) }))) }));
}
//# sourceMappingURL=index.js.map