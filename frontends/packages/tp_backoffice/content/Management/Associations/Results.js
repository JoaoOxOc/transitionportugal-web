import { SyntheticEvent, useState, useContext, useCallback, useEffect, ReactElement, Ref, forwardRef } from 'react';

import PropTypes from 'prop-types';
import {
    Box,
    Card,
    Checkbox,
    Grid,
    Divider,
    Tooltip,
    Icon,
    Table,
    TableBody,
    TableHead,
    TableContainer,
    TableRow,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    FormControlLabel,
    styled
  } from '@mui/material';

import Loader from '../../../components/Loader';
import { useRefMounted } from '../../../hooks/useRefMounted';
import { AssociationsSearchContext } from '../../../contexts/Search/AssociationsSearchContext';
import { AssociationsActionsContext } from '../../../contexts/Actions/AssociationsActionsContext';
import { useSession } from "next-auth/react";
import { GetAssociations } from '../../../services/associations';
import { useErrorHandler } from 'react-error-boundary';

import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
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
import { ResultsHeader, ResultsPagination, BodyTableView, BodyGridView} from "@transitionpt/components";

import { i18nextAssociationsList } from "@transitionpt/translations";

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
  const { data: session, status } = useSession();
  const [associations, setAssociations] = useState(null);
  const [selectedItems, setSelectedAssociations] = useState([]);
  const [totalAssociations, setTotalAssociations] = useState(0);

  let associationsApiUri = "/associations/get";
  let associationDetailsBaseUri = "/management/associations/single/";

  const getAssociationsData = useCallback(async (searchDataJson) => {
    try {
      let associationsData = await GetAssociations(process.env.NEXT_PUBLIC_API_BASE_URL + associationsApiUri, searchDataJson, session.accessToken);
      
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

    if (associations) {
        associations.map((association) => {
            association.associationViewLink = associationDetailsBaseUri + association.id;
        });
    }

    const getAssociationLinkField = (association) => {
        return association.associationViewLink;
    }

    const getAssociationIsActiveComponent = (association, styleConfig) => {
        return (
            <Typography key={styleConfig.key}
                pl={styleConfig && styleConfig.paddingLeft ? styleConfig.paddingLeft: 0}
            >
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
            </Typography>
        );
    }

    const getAssociationIsEmailVerifiedComponent = (association, styleConfig) => {
        return (
            <Typography key={styleConfig.key}
                pl={styleConfig && styleConfig.paddingLeft ? styleConfig.paddingLeft: 0}
            >
                <Tooltip title={t('ASSOCIATIONOBJECT.verified')} arrow>
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
                </Tooltip>
            </Typography>
        );
    }

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

    const tableViewData = {
        "orderedCells": [
            {
                key: "associationName",
                type: "typography",
                alignment: "left",
                typographyVariant: "h5",
                fieldName: "name"
            },
            {
                key: "associationEmail",
                type: "boxWithLink",
                alignment: "left",
                display: "flex",
                alignItems: "center",
                linkFieldName: "associationViewLink",
                isNextLink: true,
                fieldName: "email"
            },
            {
                key: "associationIsActive",
                type: "customComponent",
                customComponentStyleConfig: {
                    key: "associationIsActive"
                },
                alignment: "center",
                customComponentGetter: getAssociationIsActiveComponent,
                fieldName: "isActive"
            },
            {
                key: "associationIsVerified",
                type: "customComponent",
                customComponentStyleConfig: {
                    key: "associationIsVerified"
                },
                alignment: "center",
                customComponentGetter: getAssociationIsEmailVerifiedComponent,
                fieldName: "isEmailVerified"
            },
            {
                key: "associationActions",
                type: "actions",
                alignment: "center",
                actions: [
                    {
                        actionKey: "viewAssociation",
                        actionType: "linkIconButton",
                        title: t('LABELS.view'),
                        linkGetter: getAssociationLinkField,
                        isNextLink: true,
                        iconButtonColor: "primary",
                        buttonIconComponent: <LaunchTwoToneIcon fontSize="small" />
                    }
                ]
            },
        ],
        "dataFields": {
            selectedItemIdField: "id",
            idField: "id",
        },
        "data": associations
    }

    const gridViewData = {
        "responsive": {
            xs: 12,
            sm: 6,
            md: 4
        },
        "orderedGridItems": [
            {
                key: "associationSelected",
                type: "selectableCheckbox",
                checkboxTitle: t('LABELS.selectItemLabel'),
                paddingLeft: 2,
                paddingY: 1,
                paddingRight: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            },
            {
                key: "associationSelectionDivider",
                type: "divider"
            },
            {
                key: "associationDetails",
                type: "composableGridItem",
                subType: "twoBoxes",
                padding: 2,
                display: "flex",
                alignItems: "flex-start",
                subItems: [
                    {
                        key: "associationDetailsLink",
                        type: "boxWithLinkAndTypography",
                        display: "",
                        alignItems: "",
                        variant: "h5",
                        isNextLink: true,
                        linkFieldName: "associationViewLink",
                        fieldName: "name",
                        typographyFieldName: "address",
                        typographyTextWithParantesis: true,
                        typographyComponent: "span",
                        typographyVariant: "body2",
                        typographyColor: "text.secondary"
                    },
                    {
                        key: "associationDetailsEmail",
                        type: "typography",
                        paddingTop: 1,
                        variant: "h6",
                        fieldName: "email"
                    }
                ]
            },
            {
                key: "associationStatus",
                type: "composableGridItem",
                subType: "boxWithTypography",
                paddingLeft: 2,
                paddingRight: 1,
                paddingY: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                typographyDisplay: "flex",
                subItems: [
                    {
                        key: "associationIsActive",
                        type: "customComponent",
                        customComponentStyleConfig: {
                            paddingLeft: 1,
                            key: "associationIsActive"
                        },
                        alignment: "center",
                        customComponentGetter: getAssociationIsActiveComponent,
                        fieldName: "isActive"
                    },
                    {
                        key: "associationIsVerified",
                        type: "customComponent",
                        customComponentStyleConfig: {
                            paddingLeft: 1,
                            key: "associationIsVerified"
                        },
                        alignment: "center",
                        customComponentGetter: getAssociationIsEmailVerifiedComponent,
                        fieldName: "isEmailVerified"
                    }
                ]
            }
        ],
        "dataFields": {
            selectedItemIdField: "id",
            idField: "id",
        },
        "data": associations
    }

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
                                    <TableRow>
                                      <Loader />
                                    </TableRow>
                                  ) : (
                                    <BodyTableView rowsConfig={tableViewData} selectableItems={true} selectedItems={selectedItems} selectedItemCellTitle={t('LABELS.selectItemLabel')} sendSelectedItem={handleSelectOneAssociation} />
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
                            <BodyGridView rowsConfig={gridViewData} selectableItems={true} selectedItems={selectedItems} sendSelectedItem={handleSelectOneAssociation} />
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