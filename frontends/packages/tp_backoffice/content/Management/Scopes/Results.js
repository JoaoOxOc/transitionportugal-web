import { SyntheticEvent, useState, useContext, useCallback, useEffect, ReactElement, Ref, forwardRef } from 'react';

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
import { ScopesSearchContext } from '../../../contexts/Search/ScopesSearchContext';
import { useSession } from "next-auth/react";
import { GetScopes } from '../../../services/scopes';
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

import { i18nextScopesList } from "@transitionpt/translations";

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
  const { t } = i18nextScopesList;
  const isMountedRef = useRefMounted();
  const scopesSearchData = useContext(ScopesSearchContext);
  const [scopesError, setScopesError] = useState(null);
  useErrorHandler(scopesError);
  const [scopes, setScopes] = useState(null);
  const [totalScopes, setTotalScopes] = useState(0);
  const { data: session, status } = useSession();

  let scopesApiUri = "/scopes/get";
  let scopeDetailsBaseUri = "/management/scopes/single/";

  const headCells = [
      {
          id: 'ScopeName',
          isSort: true,
          disablePadding: false,
          align: 'left',
          label: t('SCOPEOBJECT.name'),
      },
      {
          id: 'Description',
          isSort: true,
          disablePadding: false,
          align: 'left',
          label: t('SCOPEOBJECT.description'),
      },
      {
          id: 'actions',
          isSort: false,
          disablePadding: false,
          align: 'center',
          label: t('LABELS.actions'),
      },
  ];

  const getScopesData = useCallback(async (searchDataJson) => {
    try {
      let scopesData = await GetScopes(process.env.NEXT_PUBLIC_API_BASE_URL + scopesApiUri, searchDataJson, session.accessToken);
      
      if (isMountedRef()) {
        if (scopesData.scopes) {
            setScopes(scopesData.scopes);
            setTotalScopes(scopesData.totalCount);
        }
        else {
            setScopesError(scopesData);
            setScopes([]);
            setTotalScopes(0);
        }
      }
    } catch (err) {
        setScopesError(err);
        console.error(err);
    }
  }, [isMountedRef, scopesApiUri]);

  useEffect(() => {
        if (scopesSearchData.doSearch) {
            getScopesData(scopesSearchData.searchData);
        }
  }, [scopesSearchData, getScopesData]);

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

                  {!scopes || scopes.length === 0 ? (
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
                              {t("LABELS.noScopesFound")}
                          </Typography>
                      </>
                  ) : (
                  <>
                      <TableContainer>
                          <Table>
                              <TableHead>
                                  <ResultsHeader headerCells={headCells} defaultSort={'ScopeName'} defaultSortDirection={'asc'} searchContext={scopesSearchData}/>
                              </TableHead>
                              <TableBody>
                                  {!scopes || scopes.length == 0 ? (
                                      <Loader />
                                  ) : (
                                    scopes.map((scope) => {
                                  return (
                                      <TableRow hover key={scope.id}>
                                          <TableCell>
                                              <Typography variant="h5">
                                              {scope.scopeName}
                                              </Typography>
                                          </TableCell>
                                          <TableCell>
                                              <Typography variant="h5">
                                                {scope.description}
                                              </Typography>
                                          </TableCell>
                                          <TableCell align="center">
                                              <Typography noWrap>
                                              <Tooltip title={t('LABELS.view')} arrow>
                                                  <Link href={scopeDetailsBaseUri + scope.id} isNextLink={true}>
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
                          <ResultsPagination gridDisplay={false} totalElements={totalScopes} searchContext={scopesSearchData} paginationLabels={{ of: t('LABELS.ofSmall')}} paginationRowsPerPageLabel={t('LABELS.paginationRowsPerPage')}/>
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
                      {scopes && scopes.length > 0 && (
                          <SearchBar/>
                      )}
                  </Card>
                  {!scopes || scopes.length === 0 ? (
                      <Typography
                          sx={{
                              py: 10
                          }}
                          variant="h3"
                          fontWeight="normal"
                          color="text.secondary"
                          align="center"
                      >
                          {t("LABELS.noScopesFound")}
                      </Typography>
                  ) : (
                  <>
                      <Grid container spacing={3}>
                      {scopes.map((scope) => {
                          return (
                              <Grid item xs={12} sm={6} md={4} key={scope.id}>
                              <CardWrapper>
                                  <Box
                                      sx={{
                                          position: 'relative',
                                          zIndex: '2'
                                      }}
                                      >
                                      <Box
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
                                      </Box>
                                      <Box p={2} display="flex" alignItems="flex-start">
                                          <Box>
                                              <Box>
                                                  <Link variant="h5" href={scopeDetailsBaseUri + scope.id} isNextLink={true}>
                                                      {scope.scopeName}
                                                  </Link>{' '}
                                              </Box>
                                              <Typography
                                                    sx={{
                                                    pt: 1
                                                    }}
                                                    variant="h6"
                                                >
                                                    {scope.description}
                                              </Typography>
                                          </Box>
                                      </Box>
                                      <Divider />
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
                          <ResultsPagination gridDisplay={true} pageElementsCount={scopes.length} totalElements={totalScopes} searchContext={scopesSearchData} paginationLabels={{ of: t('LABELS.ofSmall'), showing: t('LABELS.showing'), dataTitle: t('LIST.scopesTitle')}} paginationRowsPerPageLabel={t('LABELS.paginationRowsPerPage')}/>
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
  );
};

Results.propTypes = {
};
  
Results.defaultProps = {
};

export default Results;