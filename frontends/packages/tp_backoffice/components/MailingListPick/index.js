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
import { useSession } from "next-auth/react";
import { GetMailingLists } from '../../services/newsletters';

const CustomAutocomplete = styled(Autocomplete)(
    () =>`
    input {
        height: 15px !important;
    }
    `
)

export default function MailingListPicker({selectId, selectLabel, notFoundLabel, defaultValue, sendSelectedMailingList, ...extraProps}) {
    const isMountedRef = useRefMounted();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [mailingListsError, setMailingListsError] = useState(null);
    useErrorHandler(mailingListsError);
    const { data: session, status } = useSession();
    const loading = open && options.length === 0;
    // const mailingListsSearchData = useContext(MailingListsSearchContext);
    const mailingListsApiUri = "/newsletter/get/lists";

    const fetchMailingListOptions = useCallback(
        async (searchDataJson) => {
            const mailingListsData = await GetMailingLists(process.env.NEXT_PUBLIC_API_BASE_URL + mailingListsApiUri,searchDataJson, session.accessToken);
            if (isMountedRef()) {
                if (mailingListsData.mailingLists && mailingListsData.mailingLists.length > 0) {
                    let newOptions = [];
                    mailingListsData.mailingLists.forEach(element => {
                        const opt = {
                            label: element.name,
                            key: element.id
                        }
                        newOptions.push(opt);
                    });
                    setOptions(newOptions);
                }
                else if (mailingListsData.mailingLists) {
                    setOptions([{label: notFoundLabel, key: ''}]);
                }
                else {
                    setMailingListsError(mailingListsData);
                }
            }
        }, [notFoundLabel, isMountedRef, mailingListsApiUri, session.accessToken]
    );

    const handleSelectMailingList = (mailingListValue) => {
        console.log("handleSelectMailingList",mailingListValue)
        setValue(mailingListValue);
        if (sendSelectedMailingList) {
            sendSelectedMailingList(mailingListValue ? mailingListValue.key : '');
        }
    }

    useEffect(() => {
        let active = true;
    
        // if (inputValue === '') {
        //   setOptions(value ? [value] : []);
        //   return undefined;
        // }
        if (!options || options.length == 0) {
            fetchMailingListOptions(null);
        }

        if (!value && options.length > 0) {
            handleSelectMailingList(options[0]);
        }

        return () => {
            active = false;
        };
      }, [value, inputValue, fetchMailingListOptions, options]);

    return (
        <Autocomplete
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
            value={value}
            options={options}
            loading={loading}
            onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                handleSelectMailingList(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                // associationsSearchData.searchData.searchText = newInputValue;
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