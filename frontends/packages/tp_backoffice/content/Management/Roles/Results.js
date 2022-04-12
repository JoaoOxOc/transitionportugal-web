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
import { RolesSearchContext } from '../../../contexts/Search/RolesSearchContext';
import { GetRoles } from '../../../services/roles';
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

import { i18nextRolesList } from "@transitionpt/translations";

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
  const { t } = i18nextRolesList;
  const isMountedRef = useRefMounted();
  const rolesSearchData = useContext(RolesSearchContext);
  const [rolesError, setRolesError] = useState(null);
  useErrorHandler(rolesError);
  const [roles, setRoles] = useState(null);
  const [totalRoles, setTotalRoles] = useState(0);

  let rolesApiUri = "/roles/get";
  let roleDetailsBaseUri = "/management/profiles/single/";

  const headCells = [
      {
          id: 'Name',
          isSort: true,
          disablePadding: false,
          align: 'left',
          label: t('ROLEOBJECT.name'),
      },
      {
          id: 'actions',
          isSort: false,
          disablePadding: false,
          align: 'center',
          label: t('LABELS.actions'),
      },
  ];

  const getRolesData = useCallback(async (searchDataJson) => {
    try {
      let rolesData = await GetRoles(process.env.NEXT_PUBLIC_API_BASE_URL + rolesApiUri, searchDataJson);
      
      if (isMountedRef()) {
        if (rolesData.roles) {
            setRoles(rolesData.roles);
            setTotalRoles(rolesData.totalCount);
        }
        else {
            setRolesError(rolesData);
            setRoles([]);
            setTotalRoles(0);
        }
      }
    } catch (err) {
        setRolesError(err);
        console.error(err);
    }
  }, [isMountedRef, rolesApiUri]);

  useEffect(() => {
        if (rolesSearchData.doSearch) {
            getRolesData(rolesSearchData.searchData);
        }
  }, [rolesSearchData, getRolesData]);

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

                  {!roles || roles.length === 0 ? (
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
                              {t("LABELS.noRolesFound")}
                          </Typography>
                      </>
                  ) : (
                  <>
                      <TableContainer>
                          <Table>
                              <TableHead>
                                  <ResultsHeader headerCells={headCells} defaultSort={'Name'} defaultSortDirection={'asc'} searchContext={rolesSearchData}/>
                              </TableHead>
                              <TableBody>
                                  {!roles || roles.length == 0 ? (
                                      <Loader />
                                  ) : (
                                    roles.map((role) => {
                                  return (
                                      <TableRow hover key={role.roleId}>
                                          <TableCell>
                                              <Typography variant="h5">
                                              {role.roleName}
                                              </Typography>
                                          </TableCell>
                                          <TableCell align="center">
                                              <Typography noWrap>
                                              <Tooltip title={t('LABELS.view')} arrow>
                                                  <Link href={roleDetailsBaseUri + role.roleId} isNextLink={true}>
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
                          <ResultsPagination gridDisplay={false} totalElements={totalRoles} searchContext={rolesSearchData} paginationLabels={{ of: t('LABELS.ofSmall')}} paginationRowsPerPageLabel={t('LABELS.paginationRowsPerPage')}/>
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
                      {roles && roles.length > 0 && (
                          <SearchBar/>
                      )}
                  </Card>
                  {!roles || roles.length === 0 ? (
                      <Typography
                          sx={{
                              py: 10
                          }}
                          variant="h3"
                          fontWeight="normal"
                          color="text.secondary"
                          align="center"
                      >
                          {t("LABELS.noRolesFound")}
                      </Typography>
                  ) : (
                  <>
                      <Grid container spacing={3}>
                      {roles.map((role) => {
                          return (
                              <Grid item xs={12} sm={6} md={4} key={role.roleId}>
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
                                                  <Link variant="h5" href={roleDetailsBaseUri + role.roleId} isNextLink={true}>
                                                      {role.roleName}
                                                  </Link>{' '}
                                              </Box>
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
                          <ResultsPagination gridDisplay={true} pageElementsCount={roles.length} totalElements={totalRoles} searchContext={rolesSearchData} paginationLabels={{ of: t('LABELS.ofSmall'), showing: t('LABELS.showing'), dataTitle: t('LIST.rolesTitle')}} paginationRowsPerPageLabel={t('LABELS.paginationRowsPerPage')}/>
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