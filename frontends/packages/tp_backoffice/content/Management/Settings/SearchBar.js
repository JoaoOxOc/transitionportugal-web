import { useContext, useEffect, useState } from 'react';
import {
    Box,
    InputAdornment,
    TextField
} from '@mui/material';

import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { SettingsSearchContext } from '../../../contexts/Search/SettingsSearchContext';

import { i18nextSettingsList } from "@transitionpt/translations";

const SearchBar = () => {
    const { t } = i18nextSettingsList;
    const [currentLang, setLang] = useState("pt");
    i18nextSettingsList.changeLanguage(currentLang);

    useEffect(() => {
        const handleNewMessage = (event) => {
            setLang(event.detail);
        };
                
        window.addEventListener('newLang', handleNewMessage);
    }, []);

    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState({
      role: null
    });
    const searchContext = useContext(SettingsSearchContext);
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
                    )
                }}
                onChange={handleQueryChange}
                placeholder={t('Search by description or key...')}
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