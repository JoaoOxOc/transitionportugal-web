import { useContext, useState } from 'react';
import {
    Box,
    InputAdornment,
    TextField
} from '@mui/material';

import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { ClientAppsSearchContext } from '../../../../contexts/Search/ClientAppsSearchContext';

import { i18nextClientsList } from "@transitionpt/translations";

const SearchBar = () => {
    const { t } = i18nextClientsList;

    const [query, setQuery] = useState('');

    const searchContext = useContext(ClientAppsSearchContext);
    console.log(searchContext);

    const handleQueryChange = (event) => {
        event.persist();
        setQuery(event.target.value);
        if (!event.target.value || event.target.value.length > 2) {
            searchContext.searchData.searchText = event.target.value;
            searchContext.search(searchContext.searchData);
        }
    };

    return(
        <Box p={2}>
            <TextField
                sx={{
                    m: 0
                }}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <SearchTwoToneIcon />
                    </InputAdornment>
                    ),
                    type: "search"
                }}
                onChange={handleQueryChange}
                placeholder={t('SEARCH.searchByNamePlaceholder')}
                value={query}
                size="small"
                fullWidth
                margin="normal"
                variant="outlined"
            />
        </Box>
    );
}

export default SearchBar;