import { useContext, useEffect, useCallback, SyntheticEvent, useState, ReactElement, Ref, forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Card,
    Checkbox,
    Grid,
    Slide,
    Divider,
    Tooltip,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
    TableRow,
    ToggleButton,
    ToggleButtonGroup,
    Tab,
    Tabs,
    TextField,
    Button,
    Typography,
    Dialog,
    Zoom,
    styled
  } from '@mui/material';

import Loader from '../../../components/Loader';
import { useRefMounted } from '../../../hooks/useRefMounted';
import { SettingsSearchContext } from '../../../contexts/Search/SettingsSearchContext';
import { GetSettings } from '../../../services/settings';
import { useErrorHandler } from 'react-error-boundary';

import SecretTransform from '../../../utils/secretTransform';
import Link from '../../../components/Link';
import clsx from 'clsx';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
import Label from '../../../components/Label';
// import BulkActions from './BulkActions';
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useSnackbar } from 'notistack';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

import SearchBar from './SearchBar';
import ResultsHeader from '../../../components/Table/Header';
import ResultsPagination from '../../../components/Table/Pagination';

import { i18nextSettingsList } from "@transitionpt/translations";
  
const CardWrapper = styled(Card)(
    ({ theme }) => `
  
    position: relative;
    overflow: visible;
  
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: inherit;
      z-index: 1;
      transition: ${theme.transitions.create(['box-shadow'])};
    }
        
      &.Mui-selected::after {
        box-shadow: 0 0 0 3px ${theme.colors.primary.main};
      }
    `
);

const Results = ({ settingsType }) => {
    const { t } = i18nextSettingsList;
    const [currentLang, setLang] = useState("pt");
    i18nextSettingsList.changeLanguage(currentLang);
    const isMountedRef = useRefMounted();
    const SettingsSearchData = useContext(SettingsSearchContext);
    const [settingsError, setSettingsError] = useState(null);
    useErrorHandler(settingsError);
    const [settings, setSettings] = useState(null);
    const [totalSsettings, setTotalSettings] = useState(0);

    let settingsUri = "";
    let settingDetailsBaseUri = "";
    switch (settingsType) {
      case "email": {
        settingsUri = "/emailsettings/get";
        settingDetailsBaseUri = "/management/settings/email/single/";
      } break;
      case "user": {
        settingsUri = "/usersettings/get";
        settingDetailsBaseUri = "/management/settings/auth/single/";
      }break;
    }

    const headCells = [
      {
        id: 'Description',
        isSort: true,
        disablePadding: false,
        align: 'left',
        label: t('SETTINGOBJECT.description'),
      },
      {
        id: 'Key',
        isSort: true,
        disablePadding: false,
        align: 'left',
        label: t('SETTINGOBJECT.key'),
      },
      {
        id: 'Value',
        isSort: true,
        disablePadding: false,
        align: 'center',
        label: t('SETTINGOBJECT.value'),
      },
      {
        id: 'actions',
        isSort: false,
        disablePadding: false,
        align: 'center',
        label: t('LABELS.actions'),
      },
    ];

    const getSettingsData = useCallback(async (searchDataJson) => {
      try {
        let settingsData = await GetSettings(process.env.NEXT_PUBLIC_API_BASE_URL + settingsUri, searchDataJson);
        
        if (isMountedRef()) {
          if (settingsData.settings) {
            setSettings(settingsData.settings);
            setTotalSettings(settingsData.totalCount);
          }
          else {
            setSettingsError(settingsData);
            setSettings([]);
            setTotalSettings(0);
          }
        }
      } catch (err) {
        setSettingsError(err);
        console.error(err);
      }
    }, [isMountedRef, settingsUri]);

    useEffect(() => {
        const handleNewMessage = (event) => {
            setLang(event.detail);
        };
                
        window.addEventListener('newLang', handleNewMessage);

        if (SettingsSearchData.doSearch) {
          getSettingsData(SettingsSearchData.searchData);
        }
    }, [SettingsSearchData, getSettingsData]);

    const [toggleView, setToggleView] = useState('table_view');

    const handleViewOrientation = (_event, newValue) => {
      setToggleView(newValue);
    };

    return (
        <>
          <Box
            display="flex"
            alignItems="center"
            flexDirection={{ xs: 'column', sm: 'row' }}
            justifyContent={{ xs: 'center', sm: 'space-between' }}
            pb={3}
          >
            <ToggleButtonGroup
              sx={{
                mt: { xs: 2, sm: 0 }
              }}
              value={toggleView}
              exclusive
              onChange={handleViewOrientation}
            >
              <ToggleButton disableRipple value="table_view">
                <TableRowsTwoToneIcon />
              </ToggleButton>
              <ToggleButton disableRipple value="grid_view">
                <GridViewTwoToneIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {toggleView === 'table_view' && (
            <Card>
              <SearchBar/>

              <Divider />

              {!settings || settings.length === 0 ? (
                <>
                  <Typography
                    sx={{
                      py: 10
                    }}
                    variant="h3"
                    fontWeight="normal"
                    color="text.secondary"
                    align="center"
                  >
                    {t("We couldn't find any settings matching your search criteria")}
                  </Typography>
                </>
              ) : (
                <>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <ResultsHeader headerCells={headCells} defaultSort={'Key'} defaultSortDirection={'asc'} searchContext={SettingsSearchData}/>
                      </TableHead>
                      <TableBody>
                      {!settings || settings.length == 0 ? (
                          <Loader />
                        ) : (
                        settings.map((setting) => {
                        return (
                          <TableRow hover key={setting.id}>
                            <TableCell>
                              <Typography variant="h5">
                                {setting.description}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>{setting.key}</Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography fontWeight="bold">
                                {SecretTransform(setting.value, setting.description)}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography noWrap>
                                <Tooltip title={t('LABELS.view')} arrow>
                                  <Link href={settingDetailsBaseUri + setting.id + "?settingType=" + settingsType} isNextLink={true}>
                                  <IconButton
                                    
                                    color="primary"
                                  >
                                    <LaunchTwoToneIcon fontSize="small" />
                                  </IconButton>
                                  </Link>
                                </Tooltip>
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                        })
                        )
                      }
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box p={2}>
                    <ResultsPagination totalElements={totalSsettings} searchContext={SettingsSearchData} paginationLabels={{ of: "de"}} paginationRowsPerPageLabel={"Linhas por pág.:"}/>
                  </Box>
                </>
              )}
            </Card>
          )}
          {!toggleView && (
            <Card
              sx={{
                textAlign: 'center',
                p: 3
              }}
            >
              <Typography
                align="center"
                variant="h4"
                fontWeight="normal"
                color="text.secondary"
                sx={{
                  my: 5
                }}
                gutterBottom
              >
                {t(
                  'Choose between table or grid views for displaying the users list.'
                )}
              </Typography>
            </Card>
          )}
        </>
    )
}

Results.propTypes = {
    settings: PropTypes.array.isRequired
};
  
Results.defaultProps = {
    settings: []
};
  
export default Results;