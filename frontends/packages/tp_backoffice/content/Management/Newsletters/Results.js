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
import { NewslettersSearchContext } from '../../../contexts/Search/NewslettersSearchContext';
import { GetNewsletterSubscriptions } from '../../../services/newsletters';
import { useSession } from "next-auth/react";
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

import { i18nextNewsletterSubscriptionsList } from "@transitionpt/translations";

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
  const { t } = i18nextNewsletterSubscriptionsList;
  const isMountedRef = useRefMounted();
  const newslettersSearchData = useContext(NewslettersSearchContext);
  const [newsletterSubscriptionsError, setNewsletterSubscriptionsError] = useState(null);
  useErrorHandler(newsletterSubscriptionsError);
  const [newsletterSubscriptions, setNewsletterSubscriptions] = useState(null);
  console.log(newslettersSearchData.searchData.mailingListId)
  const [loading, setIsLoading] = useState(newslettersSearchData.searchData.mailingListId == "");
  const [totalNewsletterSubscriptions, setTotalNewsletterSubscriptions] = useState(0);
  const { data: session, status } = useSession();

  let newsletterSubscriptionsApiUri = "/newsletter/get";
  let newsletterSubscriptionDetailsBaseUri = "/management/newsletter/single/";

  const headCells = [
      {
          id: 'EmailAddress',
          isSort: true,
          disablePadding: false,
          align: 'left',
          label: t('NEWSLETTEROBJECT.email'),
      },
      {
          id: 'Tags',
          isSort: true,
          disablePadding: false,
          align: 'left',
          label: t('NEWSLETTEROBJECT.tags'),
      },
    //   {
    //       id: 'actions',
    //       isSort: false,
    //       disablePadding: false,
    //       align: 'center',
    //       label: t('LABELS.actions'),
    //   },
  ];

  const getNewsletterSubscriptionsData = useCallback(async (searchDataJson) => {
    try {
      let newsletterSubscriptionsData = await GetNewsletterSubscriptions(process.env.NEXT_PUBLIC_API_BASE_URL + newsletterSubscriptionsApiUri, searchDataJson, session.accessToken);
      console.log(newsletterSubscriptionsData);
      if (isMountedRef()) {
        if (newsletterSubscriptionsData.listMembers) {
            setNewsletterSubscriptions(newsletterSubscriptionsData.listMembers);
            setTotalNewsletterSubscriptions(newsletterSubscriptionsData.totalCount);
            setIsLoading(false);
        }
        else {
            setNewsletterSubscriptionsError(newsletterSubscriptionsData);
            setNewsletterSubscriptions([]);
            setTotalNewsletterSubscriptions(0);
            setIsLoading(false);
        }
      }
    } catch (err) {
        setNewsletterSubscriptionsError(err);
        console.error(err);
        setIsLoading(false);
    }
  }, [isMountedRef, newsletterSubscriptionsApiUri, session.accessToken]);

  useEffect(() => {
      console.log(newslettersSearchData);
        if (newslettersSearchData.doSearch && newslettersSearchData.searchData.mailingListId) {
            setIsLoading(true);
            getNewsletterSubscriptionsData(newslettersSearchData.searchData);
        }
  }, [newslettersSearchData, getNewsletterSubscriptionsData]);

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

                  {!newsletterSubscriptions || newsletterSubscriptions.length === 0 ? (
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
                              {t("LABELS.noNewsletterSubscriptionsFound")}
                          </Typography>
                      </>
                  ) : (
                  <>
                      <TableContainer>
                        {!newsletterSubscriptions || newsletterSubscriptions.length == 0 || loading ? (
                            <Loader />
                        ) : (
                          <Table>
                              <TableHead>
                                  <ResultsHeader headerCells={headCells} defaultSort={'EmailAddress'} defaultSortDirection={'asc'} searchContext={newslettersSearchData}/>
                              </TableHead>
                              <TableBody>
                                  {newsletterSubscriptions.map((member) => {
                                  return (
                                      <TableRow hover key={member.id}>
                                          <TableCell>
                                              <Typography variant="h5">
                                              {member.emailAddress}
                                              </Typography>
                                          </TableCell>
                                          <TableCell>
                                              <Typography variant="h5">
                                                {member.tags.map((tag) => {
                                                    return (
                                                        <p key={tag.id}>{tag.name}</p>
                                                    )
                                                })}
                                              </Typography>
                                          </TableCell>
                                          {/* <TableCell align="center">
                                              <Typography noWrap>
                                              <Tooltip title={t('LABELS.view')} arrow>
                                                  <Link href={scopeDetailsBaseUri + member.id} isNextLink={true}>
                                                      <IconButton
                                                      color="primary"
                                                      >
                                                      <LaunchTwoToneIcon fontSize="small" />
                                                      </IconButton>
                                                  </Link>
                                              </Tooltip>
                                              </Typography>
                                          </TableCell> */}
                                      </TableRow>
                                  );
                                  })}
                              </TableBody>
                          </Table>
                        )
                    }
                      </TableContainer>
                      <Box p={2}>
                          <ResultsPagination gridDisplay={false} totalElements={totalNewsletterSubscriptions} searchContext={newslettersSearchData} paginationLabels={{ of: t('LABELS.ofSmall')}} paginationRowsPerPageLabel={t('LABELS.paginationRowsPerPage')}/>
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
                      {newsletterSubscriptions && newsletterSubscriptions.length > 0 && (
                          <SearchBar/>
                      )}
                  </Card>
                  {!newsletterSubscriptions || newsletterSubscriptions.length === 0 ? (
                      <Typography
                          sx={{
                              py: 10
                          }}
                          variant="h3"
                          fontWeight="normal"
                          color="text.secondary"
                          align="center"
                      >
                          {t("LABELS.noNewsletterSubscriptionsFound")}
                      </Typography>
                  ) : (
                  <>
                      <Grid container spacing={3}>
                      {newsletterSubscriptions.map((member) => {
                          return (
                              <Grid item xs={12} sm={6} md={4} key={member.id}>
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
                                                  <Link variant="h5" href={newsletterSubscriptionDetailsBaseUri + member.id} isNextLink={true}>
                                                      {member.emailAddress}
                                                  </Link>{' '}
                                              </Box>
                                              <Typography
                                                    sx={{
                                                    pt: 1
                                                    }}
                                                    variant="h6"
                                                >
                                                    {member.tags.map((tag) => {
                                                        return (
                                                            <p key={tag.id}>{tag.name}</p>
                                                        )
                                                    })}
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
                          <ResultsPagination gridDisplay={true} pageElementsCount={newsletterSubscriptions.length} totalElements={totalNewsletterSubscriptions} searchContext={newslettersSearchData} paginationLabels={{ of: t('LABELS.ofSmall'), showing: t('LABELS.showing'), dataTitle: t('LIST.newsletterSubscriptionsTitle')}} paginationRowsPerPageLabel={t('LABELS.paginationRowsPerPage')}/>
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