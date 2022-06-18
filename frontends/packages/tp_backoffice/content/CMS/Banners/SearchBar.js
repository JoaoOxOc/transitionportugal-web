import { useContext, useState } from 'react';
import {
    Grid,
    Box,
    InputAdornment,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    Tooltip
} from '@mui/material';

import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import MarkEmailReadTwoToneIcon from '@mui/icons-material/MarkEmailReadTwoTone';
import { BannersSearchContext } from '../../../contexts/Search/CMS/BannersSearchContext';
import BulkActions from './BulkActions';

import { i18nextBannersList } from "@transitionpt/translations";

const SearchBar = ({itemsSelected}) => {
    const { t } = i18nextBannersList;

    const [selectableValues, setSelectableValues] = useState(() => []);
    const [searchName, setSearchName] = useState('');

    const searchContext = useContext(BannersSearchContext);
    console.log(searchContext);

    const handleQueryChange = (event) => {
        console.log(event.target.name);
        event.persist();
        setSearchName(event.target.value);
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
        },
        {
          value: 'IsInactive',
          icon: <MarkEmailReadTwoToneIcon/>,
          label: t('SEARCH.searchInactive')
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
        if (selectables.filter((selected) => { return selected == "IsInactive"; }).length > 0) {
            searchContext.searchData.isActive = false;
        }
        else if (selectables.filter((selected) => { return selected == "IsInactive"; }).length == 0) {
            searchContext.searchData.isActive = true;
        }
        searchContext.search(searchContext.searchData);
    };

    return(
        <Box p={2}>
            {!itemsSelected && (
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
                    <Grid
                        item
                    >
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
                            value={searchName}
                            name="searchByName"
                            size="small"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            )}
            {itemsSelected && <BulkActions />}
        </Box>
    );
}

export default SearchBar;