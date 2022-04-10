import { useContext, useState } from 'react';
import {
    Box,
    InputAdornment,
    TextField
} from '@mui/material';

import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { AssociationsSearchContext } from '../../../contexts/Search/AssociationsSearchContext';
import BulkActions from './BulkActions';

import { i18nextAssociationsList } from "@transitionpt/translations";

const SearchBar = ({itemsSelected}) => {
    const { t } = i18nextAssociationsList;

    const [query, setQuery] = useState('');

    const searchContext = useContext(AssociationsSearchContext);
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
            {!itemsSelected && (
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
                    placeholder={t('SEARCH.searchByNameOrEmailPlaceholder')}
                    value={query}
                    size="small"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
            )}
            {itemsSelected && <BulkActions />}
        </Box>
    );
}

export default SearchBar;