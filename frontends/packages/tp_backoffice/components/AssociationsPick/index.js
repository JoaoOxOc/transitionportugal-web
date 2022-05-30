import { useState, useEffect, useContext, useCallback, useRef, Fragment } from 'react';
import {
    Autocomplete,
    CircularProgress,
    TextField,
    styled
} from '@mui/material';
import { useErrorHandler } from 'react-error-boundary';

// import local libraries
import { useRefMounted } from '../../hooks/useRefMounted';
import { AssociationsSearchContext } from '../../contexts/Search/AssociationsSearchContext';
import { useSession } from "next-auth/react";
import { GetAssociations } from '../../services/associations';

const CustomAutocomplete = styled(Autocomplete)(
    () =>`
    input {
        height: 15px !important;
    }
    `
)

export default function AssociationPicker({selectId, selectLabel, notFoundLabel, defaultValue, sendSelectedAssociation, ...extraProps}) {
    const isMountedRef = useRefMounted();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [associationsError, setAssociationsError] = useState(null);
    useErrorHandler(associationsError);
    const { data: session, status } = useSession();
    const loading = open && options.length === 0;
    const associationsSearchData = useContext(AssociationsSearchContext);
    const associationsApiUri = "/associations/get";

    const fetchAssociationOptions = useCallback(
        async (searchDataJson) => {
            const associationsData = await GetAssociations(process.env.NEXT_PUBLIC_API_BASE_URL + associationsApiUri,searchDataJson, session.accessToken);
            if (isMountedRef()) {
                if (associationsData.associations && associationsData.associations.length > 0) {
                    let newOptions = [];
                    associationsData.associations.forEach(element => {
                        const opt = {
                            label: element.name,
                            key: element.id
                        }
                        newOptions.push(opt);
                    });
                    setOptions(newOptions);
                }
                else if (associationsData.associations) {
                    setOptions([{label: notFoundLabel, key: ''}]);
                }
                else {
                    setAssociationsError(associationsData);
                    setAssociations([]);
                    setTotalAssociations(0);
                }
            }
        }, [notFoundLabel, isMountedRef, associationsApiUri]
    );

    useEffect(() => {
        let active = true;
    
        // if (inputValue === '') {
        //   setOptions(value ? [value] : []);
        //   return undefined;
        // }

        fetchAssociationOptions(associationsSearchData.searchData);

        return () => {
            active = false;
        };
      }, [associationsSearchData.searchData, value, inputValue, fetchAssociationOptions]);

    const handleSelectAssociation = (associationValue) => {
        setValue(associationValue);
        if (sendSelectedAssociation) {
            sendSelectedAssociation(associationValue ? associationValue.key : '');
        }
    }

    return (
        <CustomAutocomplete
            filterOptions={(x) => x}
            id={selectId}
            sx={{ width: "100%", height: "10px" }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.key === value.key}
            getOptionLabel={(option) => option.label}
            autoComplete
            includeInputInList
            filterSelectedOptions
            options={options}
            loading={loading}
            onChange={(event, newValue) => {
                handleSelectAssociation(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                associationsSearchData.searchData.searchText = newInputValue;
            }}
            renderInput={(params) => (
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