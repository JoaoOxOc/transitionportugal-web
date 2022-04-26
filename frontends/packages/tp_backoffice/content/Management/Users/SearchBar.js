import { useContext, useState } from 'react';
import {
    Box,
    InputAdornment,
    Grid,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Tooltip,
    styled
} from '@mui/material';

import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import MarkEmailReadTwoToneIcon from '@mui/icons-material/MarkEmailReadTwoTone';
import { UsersSearchContext } from '../../../contexts/Search/UsersSearchContext';
import AssociationPicker from '../../../components/AssociationsPick';

import { i18nextUsersList } from "@transitionpt/translations";
import BulkActions from './BulkActions';

const CustomInputLabel = styled(InputLabel)(
    () =>`
    label {
        position: relative !important;
        margin-top: 10px !important;
    }
    `
)

const SearchBar = ({itemsSelected, isAllUsersTab}) => {
    const { t } = i18nextUsersList;
    const [selectableValues, setSelectableValues] = useState(() => []);
    const [searchName, setSearchName] = useState('');

    const searchContext = useContext(UsersSearchContext);
    console.log(searchContext);

    const selectables = [
        {
          value: 'IsActive',
          icon: <CheckTwoToneIcon/>,
          label: t('SEARCH.searchActive')
        },
        {
          value: 'IsEmailVerified',
          icon: <MarkEmailReadTwoToneIcon/>,
          label: t('SEARCH.searchVerified')
        }
    ];

    const handleQueryChange = (event) => {
        event.persist();
        setSearchName(event.target.value);
        if (!event.target.value || event.target.value.length > 2) {
            searchContext.searchData.searchText = event.target.value;
            searchContext.search(searchContext.searchData);
        }
    };

    const handleSelectableChange = (_event, selectables) => {
        setSelectableValues(selectables);
        if (selectables.filter((selected) => { return selected == "IsActive"; }).length > 0) {
            searchContext.searchData.isActive = true;
        }
        else if (selectables.filter((selected) => { return selected == "IsActive"; }).length == 0) {
            searchContext.searchData.isActive = '';
        }
        if (selectables.filter((selected) => { return selected == "IsEmailVerified"; }).length > 0) {
            searchContext.searchData.isVerified = true;
        }
        else if (selectables.filter((selected) => { return selected == "IsEmailVerified"; }).length == 0) {
            searchContext.searchData.isVerified = '';
        }
        searchContext.search(searchContext.searchData);
    };

    const receiveSelectedAssociation = (value) => {
        searchContext.searchData.associationId = value;
        searchContext.search(searchContext.searchData);
    }

    return(
        <Box p={2}>
            {!itemsSelected && (
                <Grid direction="column" container>
                    <Grid direction="row" container>
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
                            sx={{
                                width: "calc(100% - 102px)",
                                pl: "15px"
                            }}
                        >
                            { isAllUsersTab == true &&
                                <FormControl fullWidth variant="outlined" style={{ marginTop: '18px' }}>
                                    <AssociationPicker selectId={"search-association-dropdown"} notFoundLabel={t("SEARCH.associationNotFound")} selectLabel={t("SEARCH.searchByAssociationName")} defaultValue={''} sendSelectedAssociation={receiveSelectedAssociation}/>
                                </FormControl>
                            }
                        </Grid>
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