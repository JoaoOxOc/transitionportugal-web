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

import Loader from '../../../../components/Loader';
import { useRefMounted } from '../../../../hooks/useRefMounted';
import { ClientAppsSearchContext } from '../../../../contexts/Search/ClientAppsSearchContext';
import { GetClientApps } from '../../../../services/clientApps';
import { useErrorHandler } from 'react-error-boundary';

import SecretTransform from '../../../../utils/secretTransform';
import Link from '../../../../components/Link';
import clsx from 'clsx';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
import Label from '../../../../components/Label';
// import BulkActions from './BulkActions';
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useSnackbar } from 'notistack';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

import SearchBar from './SearchBar';
import ResultsHeader from '../../../../components/Table/Header';
import ResultsPagination from '../../../../components/Table/Pagination';

import { i18nextClientsList } from "@transitionpt/translations";
  
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

const Results = () => {
    const { t } = i18nextClientsList;
    const isMountedRef = useRefMounted();
    const clientAppsSearchData = useContext(ClientAppsSearchContext);
    const [clientAppsError, setClientAppsError] = useState(null);
    useErrorHandler(clientAppsError);
    const [clientApps, setClientApps] = useState(null);
    const [totalClientApps, setTotalClientApps] = useState(0);

    let clientAppsUri = "/app/client/get";
    let clientAppDetailsBaseUri = "/management/app/clients/single/";

    const headCells = [
        {
            id: 'Name',
            isSort: true,
            disablePadding: false,
            align: 'left',
            label: t('CLIENTOBJECT.name'),
        },
        {
            id: 'Description',
            isSort: true,
            disablePadding: false,
            align: 'left',
            label: t('CLIENTOBJECT.description'),
        },
        {
            id: 'ClientId',
            isSort: true,
            disablePadding: false,
            align: 'center',
            label: t('CLIENTOBJECT.clientId'),
        },
        {
            id: 'actions',
            isSort: false,
            disablePadding: false,
            align: 'center',
            label: t('LABELS.actions'),
        },
    ];

    const getClientAppsData = useCallback(async (searchDataJson) => {
      try {
        let clientAppsData = await GetClientApps(process.env.NEXT_PUBLIC_API_BASE_URL + clientAppsUri, searchDataJson);
        
        if (isMountedRef()) {
          if (clientAppsData.clientApps) {
            setClientApps(clientAppsData.clientApps);
            setTotalClientApps(clientAppsData.totalCount);
          }
          else {
            setClientAppsError(clientAppsData);
            setClientApps([]);
            setTotalClientApps(0);
          }
        }
      } catch (err) {
        setClientAppsError(err);
        console.error(err);
      }
    }, [isMountedRef, clientAppsUri]);

    useEffect(() => {
        if (clientAppsSearchData.doSearch) {
            getClientAppsData(clientAppsSearchData.searchData);
        }
    }, [clientAppsSearchData, getClientAppsData]);

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

              {!clientApps || clientApps.length === 0 ? (
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
                    {t("LABELS.noClientsFound")}
                  </Typography>
                </>
              ) : (
                <>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <ResultsHeader headerCells={headCells} defaultSort={'Key'} defaultSortDirection={'asc'} searchContext={clientAppsSearchData}/>
                      </TableHead>
                      <TableBody>
                      {!clientApps || clientApps.length == 0 ? (
                          <Loader />
                        ) : (
                            clientApps.map((clientApp) => {
                        return (
                          <TableRow hover key={clientApp.id}>
                            <TableCell>
                              <Typography variant="h5">{clientApp.name}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>
                                {clientApp.description}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography fontWeight="bold">
                                {clientApp.clientId}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography noWrap>
                                <Tooltip title={t('LABELS.view')} arrow>
                                  <Link href={clientAppDetailsBaseUri + clientApp.id} isNextLink={true}>
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
                    <ResultsPagination gridDisplay={false} totalElements={totalClientApps} searchContext={clientAppsSearchData} paginationLabels={{ of: t('LABELS.ofSmall')}} paginationRowsPerPageLabel={t('LABELS.paginationRowsPerPage')}/>
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
                {clientApps && clientApps.length > 0 && (
                  <SearchBar/>
                )}
              </Card>
              {!clientApps || clientApps.length === 0 ? (
                <Typography
                  sx={{
                    py: 10
                  }}
                  variant="h3"
                  fontWeight="normal"
                  color="text.secondary"
                  align="center"
                >
                  {t("LABELS.noClientsFound")}
                </Typography>
              ) : (
                <>
                  <Grid container spacing={3}>
                    {clientApps.map((clientApp) => {

                      return (
                        <Grid item xs={12} sm={6} md={4} key={clientApp.id}>
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
                                    <Link variant="h5" href={clientAppDetailsBaseUri + clientApp.id} isNextLink={true}>
                                      {clientApp.name}
                                    </Link>{' '}
                                    <Typography
                                      component="span"
                                      variant="h6"
                                    >
                                      ({t('CLIENTOBJECT.clientId') + ": " + clientApp.clientId})
                                    </Typography>
                                  </Box>
                                  <Typography
                                    sx={{
                                      pt: 1
                                    }}
                                    variant="h6"
                                  >
                                    {clientApp.description}
                                  </Typography>
                                  { clientApp.createdBy &&
                                    <Typography
                                        sx={{
                                            pt: 1
                                        }}
                                        variant="body2"
                                        color="text.secondary"
                                        >
                                        <b>{t('CLIENTOBJECT.createdAt') + ": "}</b>{clientApp.createdAt}
                                    </Typography>
                                  }
                                  { clientApp.updatedBy &&
                                    <Typography
                                        sx={{
                                            pt: 1
                                        }}
                                        variant="body2"
                                        color="text.secondary"
                                        >
                                        <b>{t('CLIENTOBJECT.updatedAt') + ": "}</b>{clientApp.updatedAt}
                                    </Typography>
                                  }
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
                    <ResultsPagination gridDisplay={true} pageElementsCount={clientApps.length} totalElements={totalClientApps} searchContext={clientAppsSearchData} paginationLabels={{ of: t('LABELS.ofSmall'), showing: t('LABELS.showing'), dataTitle: t('LIST.clientsTitle')}} paginationRowsPerPageLabel={t('LABELS.paginationRowsPerPage')}/>
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