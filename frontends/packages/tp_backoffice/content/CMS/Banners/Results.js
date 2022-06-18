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
import { BannersSearchContext } from '../../../contexts/Search/CMS/BannersSearchContext';
import { BannersActionsContext } from '../../../contexts/Actions/BannersActionsContext';
import { useSession } from "next-auth/react";
import { GetBanners } from '../../../services/cms/banners';
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

import { i18nextBannersList } from "@transitionpt/translations";

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
  const { t } = i18nextBannersList;
  const isMountedRef = useRefMounted();
  const bannersSearchData = useContext(BannersSearchContext);
  const bannersActionsData = useContext(BannersActionsContext);
  const [bannersError, setBannersError] = useState(null);
  useErrorHandler(bannersError);
  const { data: session, status } = useSession();
  const [banners, setBanners] = useState(null);
  const [selectedItems, setSelectedBanners] = useState([]);
  const [totalBanners, setTotalBanners] = useState(0);

  let bannersApiUri = "/banner/get";
  let bannerDetailsBaseUri = "/cms/banner/single/";

  const getBannersData = useCallback(async (searchDataJson) => {
    try {
      let bannersData = await GetBanners(process.env.NEXT_PUBLIC_API_BASE_URL + bannersApiUri, searchDataJson, session.accessToken);
      
      if (isMountedRef()) {
        if (bannersData.banners) {
            setBanners(bannersData.banners);
            setTotalBanners(bannersData.totalCount);
        }
        else {
            setBannersError(bannersData);
            setBanners([]);
            setTotalBanners(0);
        }
      }
    } catch (err) {
        setBannersError(err);
        console.error(err);
    }
  }, [isMountedRef, bannersApiUri]);

  useEffect(() => {
        if (bannersSearchData.doSearch) {
            getBannersData(bannersSearchData.searchData);
        }
  }, [bannersSearchData, getBannersData]);

  const [toggleView, setToggleView] = useState('table_view');

    const handleViewOrientation = (_event, newValue) => {
      setToggleView(newValue);
    };

    const handleSelectAllBanners = (event) => {
        const selected = (event.target.checked == true) ? banners.map((banner) => banner.id) : [];
        setSelectedBanners(selected);
        bannersActionsData.selectedBanners = selected;
    };

    const handleSelectOneBanner = (_event, bannerId) => {
        const selected = [];
        if (!selectedItems.includes(bannerId)) {
            selected.push(bannerId);
        } else {
            selected = selectedItems.filter((id) => id !== bannerId);
        }
        setSelectedBanners(selected);
        bannersActionsData.selectedBanners = selected;
    };
    
    const selectedSomeBanners = banners && selectedItems.length > 0 && selectedItems.length < banners.length ? banners.length : 0;
    const selectedAllBanners = banners && selectedItems.length === banners.length ? banners.length : 0;
    const selectedBulkActions = selectedItems.length > 0;

    if (banners) {
        banners.map((banner) => {
            banner.bannerViewLink = bannerDetailsBaseUri + banner.id;
        });
    }

    const getBannerLinkField = (banner) => {
        return banner.bannerViewLink;
    }

    const getBannerIsActiveComponent = (banner, styleConfig) => {
        return (
            <Typography key={styleConfig.key}
                pl={styleConfig && styleConfig.paddingLeft ? styleConfig.paddingLeft: 0}
            >
                <Tooltip title={t('BANNEROBJECT.isActive')} arrow>
                    { banner.isDraft == false ?
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
            id: 'PageKey',
            isSort: true,
            disablePadding: false,
            align: 'left',
            label: t('BANNEROBJECT.pageKey'),
        },
        {
            id: 'ComponentKey',
            isSort: true,
            disablePadding: false,
            align: 'left',
            label: t('BANNEROBJECT.componentKey'),
        },
        {
            id: 'OrderPosition',
            isSort: true,
            disablePadding: false,
            align: 'center',
            label: t('BANNEROBJECT.orderPosition'),
        },
        {
            id: 'IsDraft',
            isSort: true,
            disablePadding: false,
            align: 'center',
            label: t('BANNEROBJECT.active'),
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
                key: "bannerPageKey",
                type: "typography",
                alignment: "left",
                typographyVariant: "h5",
                fieldName: "pageKey"
            },
            {
                key: "bannerComponentKey",
                type: "boxWithLink",
                alignment: "left",
                display: "flex",
                alignItems: "center",
                linkFieldName: "bannerViewLink",
                isNextLink: true,
                fieldName: "componentKey"
            },
            {
                key: "bannerOrderPosition",
                type: "typography",
                alignment: "left",
                typographyVariant: "secondary",
                fieldName: "orderPosition"
            },
            {
                key: "bannerIsActive",
                type: "customComponent",
                customComponentStyleConfig: {
                    key: "bannerIsActive"
                },
                alignment: "center",
                customComponentGetter: getBannerIsActiveComponent,
                fieldName: "isDraft"
            },
            {
                key: "bannerActions",
                type: "actions",
                alignment: "center",
                actions: [
                    {
                        actionKey: "viewBanner",
                        actionType: "linkIconButton",
                        title: t('LABELS.view'),
                        linkGetter: getBannerLinkField,
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
        "data": banners
    }

    const gridViewData = {
        "responsive": {
            xs: 12,
            sm: 6,
            md: 4
        },
        "orderedGridItems": [
            {
                key: "bannerSelected",
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
                key: "bannerSelectionDivider",
                type: "divider"
            },
            {
                key: "bannerDetails",
                type: "composableGridItem",
                subType: "twoBoxes",
                padding: 2,
                display: "flex",
                alignItems: "flex-start",
                subItems: [
                    {
                        key: "bannerDetailsLink",
                        type: "boxWithLinkAndTypography",
                        display: "",
                        alignItems: "",
                        variant: "h5",
                        isNextLink: true,
                        linkFieldName: "bannerViewLink",
                        fieldName: "pageKey",
                        typographyFieldName: "componentKey",
                        typographyTextWithParantesis: true,
                        typographyComponent: "span",
                        typographyVariant: "body2",
                        typographyColor: "text.secondary"
                    },
                    {
                        key: "bannerDEtailsOrderPosition",
                        type: "typography",
                        paddingTop: 1,
                        variant: "h6",
                        fieldName: "orderPosition"
                    }
                ]
            },
            {
                key: "bannerStatus",
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
                        key: "bannerIsActive",
                        type: "customComponent",
                        customComponentStyleConfig: {
                            paddingLeft: 1,
                            key: "bannerIsActive"
                        },
                        alignment: "center",
                        customComponentGetter: getBannerIsActiveComponent,
                        fieldName: "isDraft"
                    }
                ]
            }
        ],
        "dataFields": {
            selectedItemIdField: "id",
            idField: "id",
        },
        "data": banners
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

                  {!banners || banners.length === 0 ? (
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
                              {t("LABELS.noBannersFound")}
                          </Typography>
                      </>
                  ) : (
                  <>
                      <TableContainer>
                          <Table>
                              <TableHead>
                                  <ResultsHeader selectedAll={handleSelectAllBanners} selectAllCount={selectedAllBanners} selectSomeCount={selectedSomeBanners} headerCells={headCells} defaultSort={'PageKey'} defaultSortDirection={'asc'} searchContext={bannersSearchData}/>
                              </TableHead>
                              <TableBody>
                                  {!banners || banners.length == 0 ? (
                                    <TableRow>
                                      <Loader />
                                    </TableRow>
                                  ) : (
                                    <BodyTableView rowsConfig={tableViewData} selectableItems={true} selectedItems={selectedItems} selectedItemCellTitle={t('LABELS.selectItemLabel')} sendSelectedItem={handleSelectOneBanner} />
                                  )
                              }
                              </TableBody>
                          </Table>
                      </TableContainer>
                      <Box p={2}>
                          <ResultsPagination gridDisplay={false} totalElements={totalBanners} searchContext={bannersSearchData} paginationLabels={{ of: t('LABELS.ofSmall')}} paginationRowsPerPageLabel={t('LABELS.paginationRowsPerPage')}/>
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
                      {banners && banners.length > 0 && (
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
                                            checked={selectedAllBanners > 0}
                                            indeterminate={selectedSomeBanners > 0}
                                            onChange={handleSelectAllBanners}
                                        />}
                                        label={t('LABELS.selectAll')} />
                                </Box>
                            </Box>
                          </>
                      )}
                  </Card>
                  {!banners || banners.length === 0 ? (
                      <Typography
                          sx={{
                              py: 10
                          }}
                          variant="h3"
                          fontWeight="normal"
                          color="text.secondary"
                          align="center"
                      >
                          {t("LABELS.noBannersFound")}
                      </Typography>
                  ) : (
                  <>
                      <Grid container spacing={3}>
                            <BodyGridView rowsConfig={gridViewData} selectableItems={true} selectedItems={selectedItems} sendSelectedItem={handleSelectOneBanner} />
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
                          <ResultsPagination gridDisplay={true} pageElementsCount={banners.length} totalElements={totalBanners} searchContext={bannersSearchData} paginationLabels={{ of: t('LABELS.ofSmall'), showing: t('LABELS.showing'), dataTitle: t('LIST.bannersTitle')}} paginationRowsPerPageLabel={t('LABELS.paginationRowsPerPage')}/>
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