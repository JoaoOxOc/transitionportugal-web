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
import { TermsSearchContext } from '../../../contexts/Search/TermsSearchContext';
import { GetAllTermsRecords } from '../../../services/terms';
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

import { i18nextTermsList } from "@transitionpt/translations";

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
  const { t } = i18nextTermsList;
  const isMountedRef = useRefMounted();
  const termsSearchData = useContext(TermsSearchContext);
  const [termsError, setTermsError] = useState(null);
  useErrorHandler(termsError);
  const [terms, setTerms] = useState(null);
  const [totalTerms, setTotalTerms] = useState(0);

  let termsApiUri = "/terms/get";
  let termsDetailsBaseUri = "/management/privacy/single/";

  const headCells = [
      {
          id: 'Version',
          isSort: true,
          disablePadding: false,
          align: 'left',
          label: t('TERMSOBJECT.version'),
      },
      {
          id: 'actions',
          isSort: false,
          disablePadding: false,
          align: 'center',
          label: t('LABELS.actions'),
      },
  ];

  const getTermsData = useCallback(async (searchDataJson) => {
    try {
      let termsData = await GetAllTermsRecords(process.env.NEXT_PUBLIC_API_BASE_URL + termsApiUri, searchDataJson);
      
      if (isMountedRef()) {
        if (termsData.termsRecords) {
            setTerms(termsData.termsRecords);
            setTotalTerms(termsData.totalCount);
        }
        else {
            setTermsError(termsData);
            setTerms([]);
            setTotalTerms(0);
        }
      }
    } catch (err) {
        setTermsError(err);
        console.error(err);
    }
  }, [isMountedRef, termsApiUri]);

  useEffect(() => {
        if (termsSearchData.doSearch) {
            getTermsData(termsSearchData.searchData);
        }
  }, [termsSearchData, getTermsData]);

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

                  {!terms || terms.length === 0 ? (
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
                              {t("LABELS.noTermsFound")}
                          </Typography>
                      </>
                  ) : (
                  <>
                      <TableContainer>
                          <Table>
                              <TableHead>
                                  <ResultsHeader headerCells={headCells} defaultSort={'Name'} defaultSortDirection={'asc'} searchContext={termsSearchData}/>
                              </TableHead>
                              <TableBody>
                                  {!terms || terms.length == 0 ? (
                                      <Loader />
                                  ) : (
                                    terms.map((term) => {
                                  return (
                                      <TableRow hover key={term.id}>
                                          <TableCell>
                                              <Typography variant="h5">
                                              {term.Version}
                                              </Typography>
                                          </TableCell>
                                          <TableCell align="center">
                                              <Typography noWrap>
                                              <Tooltip title={t('LABELS.view')} arrow>
                                                  <Link href={termsDetailsBaseUri + term.id} isNextLink={true}>
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
                          <ResultsPagination gridDisplay={false} totalElements={totalTerms} searchContext={termsSearchData} paginationLabels={{ of: t('LABELS.ofSmall')}} paginationRowsPerPageLabel={t('LABELS.paginationRowsPerPage')}/>
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
                      {terms && terms.length > 0 && (
                          <SearchBar/>
                      )}
                  </Card>
                  {!terms || terms.length === 0 ? (
                      <Typography
                          sx={{
                              py: 10
                          }}
                          variant="h3"
                          fontWeight="normal"
                          color="text.secondary"
                          align="center"
                      >
                          {t("LABELS.noTermsFound")}
                      </Typography>
                  ) : (
                  <>
                      <Grid container spacing={3}>
                      {terms.map((term) => {
                          return (
                              <Grid item xs={12} sm={6} md={4} key={term.id}>
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
                                                  <Link variant="h5" href={termsDetailsBaseUri + term.id} isNextLink={true}>
                                                      {term.version}
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
                          <ResultsPagination gridDisplay={true} pageElementsCount={terms.length} totalElements={totalTerms} searchContext={termsSearchData} paginationLabels={{ of: t('LABELS.ofSmall'), showing: t('LABELS.showing'), dataTitle: t('LIST.termsTitle')}} paginationRowsPerPageLabel={t('LABELS.paginationRowsPerPage')}/>
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