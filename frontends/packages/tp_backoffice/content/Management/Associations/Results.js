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
    Icon,
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
    FormControlLabel,
    styled
  } from '@mui/material';

import Loader from '../../../components/Loader';
import { useRefMounted } from '../../../hooks/useRefMounted';
import { AssociationsSearchContext } from '../../../contexts/Search/AssociationsSearchContext';
import { AssociationsActionsContext } from '../../../contexts/Actions/AssociationsActionsContext';
import { GetAssociations } from '../../../services/associations';
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
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import MarkEmailReadTwoToneIcon from '@mui/icons-material/MarkEmailReadTwoTone';
import UnsubscribeTwoToneIcon from '@mui/icons-material/UnsubscribeTwoTone';

import SearchBar from './SearchBar';
import ResultsHeader from '../../../components/Table/Header';
import ResultsPagination from '../../../components/Table/Pagination';

import { i18nextAssociationsList } from "@transitionpt/translations";

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

const IconActive = styled(Icon)(
    ({ theme }) => `
       background: ${theme.colors.success.dark};
       color: ${theme.palette.success.contrastText};
       width: 50px;
       height: 40px;
       border-radius: 10px;
       padding: 6px;
      `
);

const IconInactive = styled(Icon)(
    ({ theme }) => `
       background: ${theme.colors.error.dark};
       color: ${theme.palette.error.contrastText};
       width: 50px;
       height: 40px;
       border-radius: 10px;
       padding: 6px;
      `
);

const Results = () => {
  const { t } = i18nextAssociationsList;
  const isMountedRef = useRefMounted();
  const associationsSearchData = useContext(AssociationsSearchContext);
  const associationsActionsData = useContext(AssociationsActionsContext);
  const [associationsError, setAssociationsError] = useState(null);
  useErrorHandler(associationsError);
  const [associations, setAssociations] = useState(null);
  const [selectedItems, setSelectedAssociations] = useState([]);
  const [totalAssociations, setTotalAssociations] = useState(0);

  let associationsApiUri = "/associations/get";
  let associationDetailsBaseUri = "/management/associations/single/";

  const headCells = [
      {
          id: 'selectAll',
          isCheckbox: true,
      },
      {
          id: 'Name',
          isSort: true,
          disablePadding: false,
          align: 'left',
          label: t('ASSOCIATIONOBJECT.name'),
      },
      {
          id: 'Email',
          isSort: true,
          disablePadding: false,
          align: 'left',
          label: t('ASSOCIATIONOBJECT.email'),
      },
      {
          id: 'IsActive',
          isSort: true,
          disablePadding: false,
          align: 'center',
          label: t('ASSOCIATIONOBJECT.active'),
      },
      {
          id: 'IsEmailVerified',
          isSort: true,
          disablePadding: false,
          align: 'center',
          label: t('ASSOCIATIONOBJECT.verified'),
      },
      {
          id: 'actions',
          isSort: false,
          disablePadding: false,
          align: 'center',
          label: t('LABELS.actions'),
      },
  ];

  const getAssociationsData = useCallback(async (searchDataJson) => {
    try {
      let associationsData = await GetAssociations(process.env.NEXT_PUBLIC_API_BASE_URL + associationsApiUri, searchDataJson);
      
      if (isMountedRef()) {
        if (associationsData.associations) {
            setAssociations(associationsData.associations);
            setTotalAssociations(associationsData.totalCount);
        }
        else {
            setAssociationsError(associationsData);
            setAssociations([]);
            setTotalAssociations(0);
        }
      }
    } catch (err) {
        setAssociationsError(err);
        console.error(err);
    }
  }, [isMountedRef, associationsApiUri]);

  useEffect(() => {
        if (associationsSearchData.doSearch) {
          getAssociationsData(associationsSearchData.searchData);
        }
  }, [associationsSearchData, getAssociationsData]);

  const [toggleView, setToggleView] = useState('table_view');

    const handleViewOrientation = (_event, newValue) => {
      setToggleView(newValue);
    };

    const handleSelectAllAssociations = (event) => {
        const selected = (event.target.checked == true) ? associations.map((association) => association.id) : [];
        setSelectedAssociations(selected);
        associationsActionsData.selectedAssociations = selected;
    };

    const handleSelectOneAssociation = (_event, associationId) => {
        const selected = [];
        if (!selectedItems.includes(associationId)) {
            selected.push(associationId);
        } else {
            selected = selectedItems.filter((id) => id !== associationId);
        }
        setSelectedAssociations(selected);
        associationsActionsData.selectedAssociations = selected;
    };
    
    const selectedSomeAssociations = associations && selectedItems.length > 0 && selectedItems.length < associations.length ? associations.length : 0;
    const selectedAllAssociations = associations && selectedItems.length === associations.length ? associations.length : 0;
    const selectedBulkActions = selectedItems.length > 0;

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
                  <SearchBar itemsSelected={selectedBulkActions}/>

                  <Divider />

                  {!associations || associations.length === 0 ? (
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
                              {t("LABELS.noAssociationsFound")}
                          </Typography>
                      </>
                  ) : (
                  <>
                      <TableContainer>
                          <Table>
                              <TableHead>
                                  <ResultsHeader selectedAll={handleSelectAllAssociations} selectAllCount={selectedAllAssociations} selectSomeCount={selectedSomeAssociations} headerCells={headCells} defaultSort={'Name'} defaultSortDirection={'asc'} searchContext={associationsSearchData}/>
                              </TableHead>
                              <TableBody>
                                  {!associations || associations.length == 0 ? (
                                      <Loader />
                                  ) : (
                                    associations.map((association) => {
                                    const isAssociationSelected = selectedItems.includes(association.id);
                                    return (
                                      <TableRow hover key={association.id} selected={isAssociationSelected}>
                                          <TableCell padding="checkbox">
                                            <Checkbox
                                            checked={isAssociationSelected}
                                            onChange={(event) =>
                                                handleSelectOneAssociation(event, association.id)
                                            }
                                            value={isAssociationSelected}
                                            />
                                        </TableCell>
                                          <TableCell>
                                              <Typography variant="h5">
                                              {association.name}
                                              </Typography>
                                          </TableCell>
                                          <TableCell>
                                              <Box display="flex" alignItems="center">
                                                  {/* <Avatar
                                                      sx={{
                                                      mr: 1
                                                      }}
                                                      src={association.avatar}
                                                  /> */}
                                                  <Box>
                                                      <Link href={associationDetailsBaseUri + association.id} isNextLink={true}>
                                                          {association.email}
                                                      </Link>
                                                  </Box>
                                              </Box>
                                          </TableCell>
                                          <TableCell align="center">
                                              <Typography>
                                                  { association.isActive == true ?
                                                    (
                                                        <IconActive
                                                            color="primary"
                                                            >
                                                            <CheckTwoToneIcon/>
                                                        </IconActive>
                                                    ) : (
                                                        <IconInactive
                                                            color="primary"
                                                            >
                                                            <CloseTwoToneIcon/>
                                                        </IconInactive>
                                                    )
                                                  }
                                              </Typography>
                                          </TableCell>
                                          <TableCell align="center">
                                                <Typography>
                                                    { association.isEmailVerified == true ?
                                                        (
                                                            <IconActive
                                                                color="primary"
                                                                >
                                                                <MarkEmailReadTwoToneIcon/>
                                                            </IconActive>
                                                        ) : (
                                                            <IconInactive
                                                                color="primary"
                                                                >
                                                                <UnsubscribeTwoToneIcon/>
                                                            </IconInactive>
                                                        )
                                                    }
                                                </Typography>
                                          </TableCell>
                                          {/* <TableCell align="center">
                                              <Typography fontWeight="bold">
                                              {association.posts}
                                              </Typography>
                                          </TableCell>
                                          <TableCell>
                                              <Typography>{association.location}</Typography>
                                          </TableCell>
                                          <TableCell>{getAssociationRoleLabel(association.role)}</TableCell> */}
                                          <TableCell align="center">
                                              <Typography noWrap>
                                              <Tooltip title={t('LABELS.view')} arrow>
                                                  <Link href={associationDetailsBaseUri + association.id} isNextLink={true}>
                                                      <IconButton
                                                      color="primary"
                                                      >
                                                      <LaunchTwoToneIcon fontSize="small" />
                                                      </IconButton>
                                                  </Link>
                                              </Tooltip>
                                              {/* <Tooltip title={t('Delete')} arrow>
                                                  <IconButton
                                                  onClick={handleConfirmDelete}
                                                  color="primary"
                                                  >
                                                  <DeleteTwoToneIcon fontSize="small" />
                                                  </IconButton>
                                              </Tooltip> */}
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
                          <ResultsPagination gridDisplay={false} totalElements={totalAssociations} searchContext={associationsSearchData} paginationLabels={{ of: t('LABELS.ofSmall')}} paginationRowsPerPageLabel={t('LABELS.paginationRowsPerPage')}/>
                      </Box>
                  </>
                  )}
              </Card>
          )}
          {toggleView === 'grid_view' && (
              <>
                  <Card
                      sx={{
                          mb: 3
                      }}
                  >
                      {associations && associations.length > 0 && (
                          <>
                            <SearchBar itemsSelected={selectedBulkActions}/>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Box display="flex" alignItems="center">
                                    <FormControlLabel
                                        sx={{
                                            paddingLeft: '20px'
                                        }}
                                        control={<Checkbox
                                            checked={selectedAllAssociations > 0}
                                            indeterminate={selectedSomeAssociations > 0}
                                            onChange={handleSelectAllAssociations}
                                        />}
                                        label={t('LABELS.selectAll')} />
                                </Box>
                            </Box>
                          </>
                      )}
                  </Card>
                  {!associations || associations.length === 0 ? (
                      <Typography
                          sx={{
                              py: 10
                          }}
                          variant="h3"
                          fontWeight="normal"
                          color="text.secondary"
                          align="center"
                      >
                          {t("LABELS.noAssociationsFound")}
                      </Typography>
                  ) : (
                  <>
                      <Grid container spacing={3}>
                      {associations.map((association) => {
                          const isAssociationSelected = selectedItems.includes(association.id);

                          return (
                              <Grid item xs={12} sm={6} md={4} key={association.id}>
                              <CardWrapper
                                  className={clsx({
                                  'Mui-selected': isAssociationSelected
                                  })}
                              >
                                  <Box
                                      sx={{
                                          position: 'relative',
                                          zIndex: '2'
                                      }}
                                      >
                                      <Box
                                          pl={2}
                                          py={1}
                                          pr={1}
                                          display="flex"
                                          alignItems="center"
                                          justifyContent="space-between"
                                      >
                                          {/* <Typography>
                                          <b>{association.posts}</b> {t('posts')}
                                          </Typography> */}
                                          <Checkbox
                                            checked={isAssociationSelected}
                                            onChange={(event) =>
                                                handleSelectOneAssociation(event, association.id)
                                            }
                                            value={isAssociationSelected}
                                          />
                                      </Box>
                                      <Divider />
                                      <Box p={2} display="flex" alignItems="flex-start">
                                          {/* <Avatar
                                              sx={{
                                                  width: 50,
                                                  height: 50,
                                                  mr: 2
                                              }}
                                              src={association.avatar}
                                              /> */}
                                          <Box>
                                              <Box>
                                                  <Link variant="h5" href={associationDetailsBaseUri + association.id} isNextLink={true}>
                                                      {association.name}
                                                  </Link>{' '}
                                                  <Typography
                                                      component="span"
                                                      variant="body2"
                                                      color="text.secondary"
                                                      >
                                                      ({association.address})
                                                  </Typography>
                                              </Box>
                                              <Typography
                                                  sx={{
                                                  pt: 1
                                                  }}
                                                  variant="h6"
                                              >
                                                  {association.email}
                                              </Typography>
                                          </Box>
                                      </Box>
                                      <Box
                                          pl={2}
                                          py={1}
                                          pr={1}
                                          display="flex"
                                          alignItems="center"
                                          justifyContent="space-between"
                                      >
                                        <Typography>
                                            <Tooltip title={t('ASSOCIATIONOBJECT.active')} arrow>
                                                { association.isActive == true ?
                                                    (
                                                        <IconActive
                                                            color="primary"
                                                            >
                                                            <CheckTwoToneIcon/>
                                                        </IconActive>
                                                    ) : (
                                                        <IconInactive
                                                            color="primary"
                                                            >
                                                            <CloseTwoToneIcon/>
                                                        </IconInactive>
                                                    )
                                                }
                                            </Tooltip>
                                            <Tooltip title={t('ASSOCIATIONOBJECT.verified')} arrow>
                                                { association.isEmailVerified == true ?
                                                    (
                                                        <IconActive
                                                            color="primary"
                                                            sx={{
                                                                ml: '5px'
                                                            }}
                                                            >
                                                            <MarkEmailReadTwoToneIcon/>
                                                        </IconActive>
                                                    ) : (
                                                        <IconInactive
                                                            color="primary"
                                                            sx={{
                                                                ml: '5px'
                                                            }}
                                                            >
                                                            <UnsubscribeTwoToneIcon/>
                                                        </IconInactive>
                                                    )
                                                }
                                            </Tooltip>
                                        </Typography>
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
                          <ResultsPagination gridDisplay={true} pageElementsCount={associations.length} totalElements={totalAssociations} searchContext={associationsSearchData} paginationLabels={{ of: t('LABELS.ofSmall'), showing: t('LABELS.showing'), dataTitle: t('LIST.associationsTitle')}} paginationRowsPerPageLabel={t('LABELS.paginationRowsPerPage')}/>
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