import { useState, useEffect, useContext, useCallback, useRef, Fragment } from 'react';
import {
    Autocomplete,
    CircularProgress,
    TextField,
    styled
} from '@mui/material';
import { useErrorHandler } from 'react-error-boundary';
import { i18nextUserDetails } from "@transitionpt/translations";

// import local libraries
import { useRefMounted } from '../../hooks/useRefMounted';
import { useSession } from "next-auth/react";
import { GetRoles } from '../../services/roles';

export default function UserRolePicker({selectId, selectLabel, notFoundLabel, defaultValue, sendSelectedRole, ...extraProps}) {
    const { t } = i18nextUserDetails;
    const isMountedRef = useRefMounted();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [rolesError, setRolesError] = useState(null);
    useErrorHandler(rolesError);
    const { data: session, status } = useSession();
    const loading = open && options.length === 0;
    const getRolesApiUri = "/roles/get";

    const getRolesData = useCallback(async (searchDataJson) => {
        let rolesData = await GetRoles(process.env.NEXT_PUBLIC_API_BASE_URL + getRolesApiUri, searchDataJson, session.accessToken);
        if (isMountedRef()) {
            if (rolesData.roles && rolesData.roles.length > 0) {
                let newOptions = [];
                rolesData.roles.forEach(element => {
                    const opt = {
                        label: t("ROLES."+element.roleName),
                        key: element.roleName
                    }
                    newOptions.push(opt);
                });
                setOptions(newOptions);
            }
            else if (rolesData.roles) {
                setOptions([{label: notFoundLabel, key: ''}]);
            }
            else {
                setRolesError(rolesData);
            }
        }
    }, [isMountedRef, getRolesApiUri, notFoundLabel]);

    const handleSelectRole = (roleValue) => {
        console.log("handleSelectRole",roleValue)
        setValue(roleValue);
        if (sendSelectedRole) {
            sendSelectedRole(roleValue ? roleValue.key : '');
        }
    }

    useEffect(() => {
        let active = true;
    
        // if (inputValue === '') {
        //   setOptions(value ? [value] : []);
        //   return undefined;
        // }
        if (!options || options.length == 0) {
            getRolesData({offset: "", limit: "", searchText: "", sort: "Name", sortDirection: "asc" });
        }

        if (!value && options.length > 0 && defaultValue) {
            setValue(roleValue);
        }

        return () => {
            active = false;
        };
      }, [value, inputValue, getRolesData, options]);

    return (
        <Autocomplete
            filterOptions={(x) => x}
            id={selectId}
            sx={{ width: "70%" }}
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
                handleSelectRole(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
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