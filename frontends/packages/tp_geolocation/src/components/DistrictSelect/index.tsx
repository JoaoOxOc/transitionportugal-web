import React, { ReactElement, useState, Fragment } from 'react';
import {
    Autocomplete,
    CircularProgress,
    TextField,
    styled
} from '@mui/material';
import {getOdsPtDistricts} from '../../odsptagreggator';

const CustomAutocomplete = styled(Autocomplete)(
    () =>`
    input {
        height: 15px !important;
    }
    `
)

export default function DistrictSelect({selectId, selectLabel, notFoundLabel, defaultValue, sendSelectedDistrict, ...extraProps}: any): ReactElement {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<any[]>([]);
    const [value, setValue] = useState(null);
    // const [inputValue, setInputValue] = useState<any>('');
    const loading = open && options.length === 0;

    const fetchDistrictOptions = () => {
        let newOptions: any = [];
        getOdsPtDistricts().forEach((element: any) => {
            const opt = {
                label: element.distrito,
                key: element.district_code
            }
            newOptions.push(opt);
        });
        setOptions(newOptions);
        if (defaultValue) {
            const defaultOption: any = newOptions.filter((x:any) => x.key === defaultValue);
            if (defaultOption && defaultOption.length > 0) {
                setValue(defaultOption[0]);
            }
        }
    };

    if (!options || options.length === 0) {
        fetchDistrictOptions();
    }

    const handleSelectDistrict = (districtValue: any) => {
        setValue(districtValue);
        if (sendSelectedDistrict) {
            sendSelectedDistrict(districtValue ? districtValue.key : '');
        }
    }

    return (
        <CustomAutocomplete
            filterOptions={(x:any) => x}
            id={selectId}
            sx={{ width: "100%", height: "10px" }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option: any, value: any) => option.key === value.key}
            getOptionLabel={(option: any) => option.label}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            options={options}
            loading={loading}
            onChange={(event:any, newValue: any) => {
                handleSelectDistrict(newValue);
            }}
            onInputChange={(event:any, newInputValue:any) => {
                // setInputValue(newInputValue);
            }}
            renderInput={(params:any) => (
                <TextField
                {...params}
                label={selectLabel}
                InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                    <Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                    </Fragment>
                    ),
                }}
                />
            )}
        />
    );
}