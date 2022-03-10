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
    TablePagination,
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
    console.log(SettingsSearchData);
    const [settingsError, setSettingsError] = useState(null);
    useErrorHandler(settingsError);
    const [settings, setSettings] = useState(null);

    const getEmailSettings = useCallback(async (searchDataJson) => {
      try {
        let emailSettings = await GetSettings(process.env.NEXT_PUBLIC_API_BASE_URL + "/emailsettings/get", searchDataJson);
        
        if (isMountedRef()) {
          if (emailSettings.settings) {
            setSettings(emailSettings.settings);
          }
          else {
            setSettingsError(emailSettings);
            setSettings([]);
          }
        }
      } catch (err) {
        setSettingsError(err);
        console.error(err);
      }
    }, [isMountedRef]);

    useEffect(() => {
        const handleNewMessage = (event) => {
            setLang(event.detail);
        };
                
        window.addEventListener('newLang', handleNewMessage);

        if (SettingsSearchData.doSearch) {
          getEmailSettings(SettingsSearchData.searchData);
        }
    }, [SettingsSearchData, getEmailSettings]);

    const [toggleView, setToggleView] = useState('table_view');

    const handleViewOrientation = (_event, newValue) => {
      setToggleView(newValue);
    };

    // search definitions

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);

    const handlePageChange = (_event, newPage) => {
      setPage(newPage);
    };
  
    const handleLimitChange = (event) => {
      setLimit(parseInt(event.target.value));
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
                        <TableRow>
                          <TableCell>{t('Description')}</TableCell>
                          <TableCell>{t('Key')}</TableCell>
                          <TableCell align="center">{t('Value')}</TableCell>
                          <TableCell align="center">{t('Actions')}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {!settings ? (
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
                                <Tooltip title={t('View')} arrow>
                                  <IconButton
                                    href={'/management/Settings/single/' + setting.id + "?settingType=" + settingsType}
                                    color="primary"
                                  >
                                    <LaunchTwoToneIcon fontSize="small" />
                                  </IconButton>
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
                    <TablePagination
                      component="div"
                      count={settings.length}
                      onPageChange={handlePageChange}
                      onRowsPerPageChange={handleLimitChange}
                      page={page}
                      rowsPerPage={limit}
                      rowsPerPageOptions={[5, 10, 15]}
                    />
                  </Box>
                </>
              )}
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