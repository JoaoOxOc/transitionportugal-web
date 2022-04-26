import { useContext, useState } from 'react';
import {
    Box,
    Grid,
    InputAdornment,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    Tooltip
} from '@mui/material';

import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import { TermsSearchContext } from '../../../contexts/Search/TermsSearchContext';

import { i18nextTermsList } from "@transitionpt/translations";

const SearchBar = ({itemsSelected}) => {
    const { t } = i18nextTermsList;

    const [query, setQuery] = useState('');
    const [selectableValues, setSelectableValues] = useState(() => []);

    const searchContext = useContext(TermsSearchContext);
    console.log(searchContext);

    const handleQueryChange = (event) => {
        event.persist();
        setQuery(event.target.value);
        if (!event.target.value || event.target.value.length > 2) {
            searchContext.searchData.searchText = event.target.value;
            searchContext.search(searchContext.searchData);
        }
    };
    
    const selectables = [
        {
          value: 'IsActive',
          icon: <CheckTwoToneIcon/>,
          label: t('SEARCH.searchActive')
        }
    ];

    const handleSelectableChange = (_event, selectables) => {
        setSelectableValues(selectables);
        if (selectables.filter((selected) => { return selected == "IsActive"; }).length > 0) {
            searchContext.searchData.isActive = true;
        }
        else if (selectables.filter((selected) => { return selected == "IsActive"; }).length == 0) {
            searchContext.searchData.isActive = false;
        }
        searchContext.search(searchContext.searchData);
    };

    return(
        <Box p={2}>
            <Grid direction="column" container>
                <Grid
                    sx={{
                        marginBottom: '10px !important'
                    }}
                    item
                >
                    <Typography variant="h5" color="text.secondary">
                        {t('SEARCH.filters')}:
                    </Typography>
                    <ToggleButtonGroup
                        value={selectableValues}
                        onChange={handleSelectableChange}
                        aria-label="text formatting"
                    >
                        
                        {selectables.map((select) => (
                            <ToggleButton
                                key={select.value}
                                value={select.value}
                                aria-label={select.label}
                                sx = {{
                                    borderRight: '2px solid rgba(0, 0, 0, 0.12)',
                                    borderTopRightRadius: '10px',
                                    'borderBottomRightRadius': '10px',
                                    'borderTopLeftRadius': '10px',
                                    'borderBottomLeftRadius': '10px'
                                }}
                                >
                                <Tooltip arrow placement="top" title={select.label}>
                                {select.icon}
                                </Tooltip>
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
        </Box>
    );
}

export default SearchBar;