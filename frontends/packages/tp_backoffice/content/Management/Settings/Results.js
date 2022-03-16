import { useContext, useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Card,
    Grid,
    Divider,
    Tooltip,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
    TableRow,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    styled
  } from '@mui/material';

import Loader from '../../../components/Loader';
import { useRefMounted } from '../../../hooks/useRefMounted';
import { SettingsSearchContext } from '../../../contexts/Search/SettingsSearchContext';
import { GetSettings } from '../../../services/settings';
import { useErrorHandler } from 'react-error-boundary';

import SecretTransform from '../../../utils/secretTransform';
import Link from '../../../components/Link';

import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';

import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';

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
    const isMountedRef = useRefMounted();
    const SettingsSearchData = useContext(SettingsSearchContext);
    const [settingsError, setSettingsError] = useState(null);
    useErrorHandler(settingsError);
    const [settings, setSettings] = useState(null);
    const [totalSsettings, setTotalSettings] = useState(0);

    let settingsUri = "";
    let settingDetailsBaseUri = "";
    let settingsTitle = "";
    switch (settingsType) {
      case "email": {
        settingsUri = "/emailsettings/get";
        settingDetailsBaseUri = "/management/settings/email/single/";
        settingsTitle = t('LIST.emailSettingsTitle');
      } break;
      case "user": {
        settingsUri = "/usersettings/get";
        settingDetailsBaseUri = "/management/settings/auth/single/";
        settingsTitle = t('LIST.userSettingsTitle');
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
                    {t("LABELS.noSettingsFound")}
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
                    <ResultsPagination gridDisplay={false} totalElements={totalSsettings} searchContext={SettingsSearchData} paginationLabels={{ of: t('LABELS.ofSmall')}} paginationRowsPerPageLabel={t('LABELS.paginationRowsPerPage')}/>
                  </Box>
                </>
              )}
            </Card>
          )}
          {toggleView === 'grid_view' && (
            <>
              <Card
                  sx={{
                    p: 2,
                    mb: 3
                  }}
                >
                {settings && settings.length > 0 && (
                  <SearchBar/>
                )}
              </Card>
              {!settings || settings.length === 0 ? (
                <Typography
                  sx={{
                    py: 10
                  }}
                  variant="h3"
                  fontWeight="normal"
                  color="text.secondary"
                  align="center"
                >
                  {t("LABELS.noSettingsFound")}
                </Typography>
              ) : (
                <>
                  <Grid container spacing={3}>
                    {settings.map((setting) => {

                      return (
                        <Grid item xs={12} sm={6} md={4} key={setting.id}>
                          <CardWrapper>
                            <Box
                              sx={{
                                position: 'relative',
                                zIndex: '2'
                              }}
                            >
                              {/* <Box
                                px={2}
                                pt={2}
                                display="flex"
                                alignItems="flex-start"
                                justifyContent="space-between"
                              >
                                <IconButton
                                  color="primary"
                                  sx={{
                                    p: 0.5
                                  }}
                                >
                                  <MoreVertTwoToneIcon />
                                </IconButton>
                              </Box> */}
                              <Box p={2} display="flex" alignItems="flex-start">
                                <Box>
                                  <Box>
                                    <Link variant="h5" href={settingDetailsBaseUri + setting.id + "?settingType=" + settingsType} isNextLink={true}>
                                      {setting.key}
                                    </Link>{' '}
                                    <Typography
                                      component="span"
                                      variant="h6"
                                    >
                                      ({t('LABELS.actualValue') + ": " + SecretTransform(setting.value, setting.description)})
                                    </Typography>
                                  </Box>
                                  <Typography
                                    sx={{
                                      pt: 1
                                    }}
                                    variant="h6"
                                  >
                                    {setting.description}
                                  </Typography>
                                  <Typography
                                      sx={{
                                          pt: 1
                                      }}
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      <b>{t('SETTINGOBJECT.defaultValue') + ": "}</b>{SecretTransform(setting.defaultValue, setting.description)}
                                    </Typography>
                                </Box>
                              </Box>
                              <Divider />
                              <Box
                                pl={2}
                                py={1}
                                pr={1}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                              >
                              </Box>
                            </Box>
                          </CardWrapper>
                        </Grid>
                      );
                    })}
                  </Grid>
                  <Card
                    sx={{
                      p: 2,
                      mt: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <ResultsPagination gridDisplay={true} pageElementsCount={settings.length} totalElements={totalSsettings} searchContext={SettingsSearchData} paginationLabels={{ of: t('LABELS.ofSmall'), showing: t('LABELS.showing'), dataTitle: settingsTitle}} paginationRowsPerPageLabel={t('LABELS.paginationRowsPerPage')}/>
                  </Card>
                </>
              )}
            </>
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
                  'LABELS.chooseGrid'
                )}
              </Typography>
            </Card>
          )}
        </>
    )
}

Results.propTypes = {
};
  
Results.defaultProps = {
};
  
export default Results;