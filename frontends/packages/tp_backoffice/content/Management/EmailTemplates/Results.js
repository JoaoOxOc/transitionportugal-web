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
import { EmailTemplatesSearchContext } from '../../../contexts/Search/EmailTemplatesSearchContext';
import { GetEmailTemplates } from '../../../services/emailTemplates';
import { useErrorHandler } from 'react-error-boundary';

import SecretTransform from '../../../utils/secretTransform';
import Link from '../../../components/Link';

import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';

import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';

import SearchBar from './SearchBar';
import ResultsHeader from '../../../components/Table/Header';
import ResultsPagination from '../../../components/Table/Pagination';

import { i18nextEmailTemplatesList } from "@transitionpt/translations";
  
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
    const { t } = i18nextEmailTemplatesList;
    const isMountedRef = useRefMounted();
    const EmailTemplatesSearchData = useContext(EmailTemplatesSearchContext);
    const [emailTemplatesError, setEmailTemplatesError] = useState(null);
    useErrorHandler(emailTemplatesError);
    const [emailTemplates, setEmailTemplates] = useState(null);
    const [totalEmailTemplates, setTotalEmailTemplates] = useState(0);

    let emailTemplatesUri = "/emailTemplates/get";
    let emailTemplateDetailsBaseUri = "/management/settings/emailTemplate/single/";
    let emailTemplatesTitle = t('LIST.templatesTitle');

    const headCells = [
      {
        id: 'Description',
        isSort: true,
        disablePadding: false,
        align: 'left',
        label: t('TEMPLATEOBJECT.description'),
      },
      {
        id: 'Key',
        isSort: true,
        disablePadding: false,
        align: 'left',
        label: t('TEMPLATEOBJECT.key'),
      },
      {
        id: 'Language',
        isSort: true,
        disablePadding: false,
        align: 'center',
        label: t('TEMPLATEOBJECT.language'),
      },
      {
        id: 'Subject',
        isSort: true,
        disablePadding: false,
        align: 'center',
        label: t('TEMPLATEOBJECT.subject'),
      },
      {
        id: 'actions',
        isSort: false,
        disablePadding: false,
        align: 'center',
        label: t('LABELS.actions'),
      },
    ];

    const getEmailTemplatesData = useCallback(async (searchDataJson) => {
      try {
        let emailTemplatesData = await GetEmailTemplates(process.env.NEXT_PUBLIC_API_BASE_URL + emailTemplatesUri, searchDataJson);
        
        if (isMountedRef()) {
          if (emailTemplatesData.templates) {
            setEmailTemplates(emailTemplatesData.templates);
            setTotalEmailTemplates(emailTemplatesData.totalCount);
          }
          else {
            setEmailTemplatesError(emailTemplatesData);
            setEmailTemplates([]);
            setTotalEmailTemplates(0);
          }
        }
      } catch (err) {
        setEmailTemplatesError(err);
        console.error(err);
      }
    }, [isMountedRef, emailTemplatesUri]);

    useEffect(() => {
        if (EmailTemplatesSearchData.doSearch) {
          getEmailTemplatesData(EmailTemplatesSearchData.searchData);
        }
    }, [EmailTemplatesSearchData, getEmailTemplatesData]);

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

              {!emailTemplates || emailTemplates.length === 0 ? (
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
                    {t("LABELS.noEmailTemplatesFound")}
                  </Typography>
                </>
              ) : (
                <>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <ResultsHeader headerCells={headCells} defaultSort={'Key'} defaultSortDirection={'asc'} searchContext={EmailTemplatesSearchData}/>
                      </TableHead>
                      <TableBody>
                      {!emailTemplates || emailTemplates.length == 0 ? (
                          <Loader />
                        ) : (
                          emailTemplates.map((template) => {
                        return (
                          <TableRow hover key={template.id}>
                            <TableCell>
                              <Typography variant="h5">
                                {template.description}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>{template.key}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>{template.language}</Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography fontWeight="bold">
                                {template.subject}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography noWrap>
                                <Tooltip title={t('LABELS.view')} arrow>
                                  <Link href={emailTemplateDetailsBaseUri + template.id} isNextLink={true}>
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
                    <ResultsPagination gridDisplay={false} totalElements={totalEmailTemplates} searchContext={EmailTemplatesSearchData} paginationLabels={{ of: t('LABELS.ofSmall')}} paginationRowsPerPageLabel={t('LABELS.paginationRowsPerPage')}/>
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
                {emailTemplates && emailTemplates.length > 0 && (
                  <SearchBar/>
                )}
              </Card>
              {!emailTemplates || emailTemplates.length === 0 ? (
                <Typography
                  sx={{
                    py: 10
                  }}
                  variant="h3"
                  fontWeight="normal"
                  color="text.secondary"
                  align="center"
                >
                  {t("LABELS.noEmailTemplatesFound")}
                </Typography>
              ) : (
                <>
                  <Grid container spacing={3}>
                    {emailTemplates.map((template) => {

                      return (
                        <Grid item xs={12} sm={6} md={4} key={template.id}>
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
                                    <Link variant="h5" href={emailTemplateDetailsBaseUri + template.id} isNextLink={true}>
                                      {template.key}
                                    </Link>{' '}
                                    <Typography
                                      component="span"
                                      variant="h6"
                                    >
                                      ({t('LABELS.actualValue') + ": " + template.subject})
                                    </Typography>
                                  </Box>
                                  <Typography
                                    sx={{
                                      pt: 1
                                    }}
                                    variant="h6"
                                  >
                                    {template.description}
                                  </Typography>
                                  <Typography
                                      sx={{
                                          pt: 1
                                      }}
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      <b>{t('TEMPLATEOBJECT.defaultValue') + ": "}</b>{template.subject}
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
                    <ResultsPagination gridDisplay={true} pageElementsCount={emailTemplates.length} totalElements={totalEmailTemplates} searchContext={EmailTemplatesSearchData} paginationLabels={{ of: t('LABELS.ofSmall'), showing: t('LABELS.showing'), dataTitle: emailTemplatesTitle}} paginationRowsPerPageLabel={t('LABELS.paginationRowsPerPage')}/>
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