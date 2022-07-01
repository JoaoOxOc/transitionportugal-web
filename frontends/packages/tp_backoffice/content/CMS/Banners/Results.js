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
    IconButton,
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

import { useRouter } from 'next/router';
import Link from '../../../components/Link';
import Loader from '../../../components/Loader';
import BreadcrumbsDetailsComponent from '../../../components/Breadcrumbs/BreadcrumbsDetailsComponent';
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
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import BackupTableTwoToneIcon from '@mui/icons-material/BackupTableTwoTone';

import SearchBar from './SearchBar';
import SingleActions from './SingleActions';
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

const IconButtonHierarchyTree = styled(IconButton)(
    ({ theme }) => `
        color: ${theme.colors.gradients.blue1};
        width: 50px;
        height: 40px;
        border-radius: 10px;
        padding: 6px;
        &:hover {
            color: ${theme.colors.gradients.blue3};
        }
      `
);

const Results = ({parentBannerId,isRelatedList}) => {
    const router = useRouter();
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
  const [refreshBannersList, setRefreshBannersList] = useState(false);

  let bannersApiUri = "/cms/banner/get";
  let bannerDetailsBaseUri = "/content/banner/single/";

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
    if (!isRelatedList && router.query.parentBannerId) {
        bannersSearchData.searchData.parentBannerId = router.query.parentBannerId;
    }
    else if (parentBannerId) {
        bannersSearchData.searchData.parentBannerId = parentBannerId;
    }
    else {
        bannersSearchData.searchData.parentBannerId = "";
    }
    if (bannersSearchData.doSearch) {
        getBannersData(bannersSearchData.searchData);
    }
  }, [bannersSearchData, getBannersData, parentBannerId, router.query.parentBannerId]);

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
            let parentPath = "";
            if (router.query.parentBannerId) {
                parentPath += "?parentBannerId=" + banner.parentBannerId + "&parentBannerPath=" + banner.parentBannerPath;
            }
            banner.bannerViewLink = bannerDetailsBaseUri + banner.id + parentPath;
        });
    }

    const getBannerLinkField = (banner) => {
        return banner.bannerViewLink;
    }

    const receiveRefreshedData = (eventValue) => {
        setRefreshBannersList(eventValue);
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

    const getBannerParentPathComponent = (banner, styleConfig) => {
        const bannerPathSplitted = banner.parentBannerPath ? banner.parentBannerPath.split("|").filter(function(i){return i}) : [];
        const parentBannerId = bannerPathSplitted.length > 1 ? bannerPathSplitted[bannerPathSplitted.length - 2] : bannerPathSplitted.length == 1 ? 0 : null;
        if (parentBannerId != null) {
            return (
                <Typography key={styleConfig.key}
                    pl={styleConfig && styleConfig.paddingLeft ? styleConfig.paddingLeft: 0}
                >
                    <Tooltip title={t('BANNEROBJECT.bannerParentPath')} arrow>
                        <Link href={parentBannerId > 0 ? "/content/banner?parentBannerId=" + parentBannerId : "/content/banner"} isNextLink={true}>
                            <IconButtonHierarchyTree
                                color="primary"
                                >
                                <BackupTableTwoToneIcon/>
                            </IconButtonHierarchyTree>
                        </Link>
                    </Tooltip>
                </Typography>
            )
        }
        else {
            return (<></>);
        }
    }

    const getBannerHierarchyTreeComponent = (banner, styleConfig) => {
        if (banner.childElements && banner.childElements > 0) {
            return (
                <Typography key={styleConfig.key}
                    pl={styleConfig && styleConfig.paddingLeft ? styleConfig.paddingLeft: 0}
                >
                    <Tooltip title={t('BANNEROBJECT.hierarchyTreeInfo')} arrow>
                        <Link href={"/content/banner?parentBannerId=" + banner.id} isNextLink={true}>
                            <IconButtonHierarchyTree
                                color="primary"
                                >
                                <AccountTreeTwoToneIcon/>
                            </IconButtonHierarchyTree>
                        </Link>
                    </Tooltip>
                </Typography>
            );
        }
        else {
            return (<></>);
        }
    }

    const getSingleActionsComponent = (banner, styleConfig) => {
        return (
            <SingleActions key={styleConfig.key} refreshData={receiveRefreshedData} bannerId={banner.id} bannerIsDraft={banner.isDraft} bannerPageKey={banner.pageKey} bannerComponentKey={banner.componentKey} bannerOrderPosition={banner.orderPosition}/>
        )
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
            id: 'IsDraft',
            isSort: true,
            disablePadding: false,
            align: 'center',
            label: t('BANNEROBJECT.isActive'),
        },
        
    ];

    if (router.query.parentBannerId) {
        headCells.push(
        {
            id: 'ParentBannerPath',
            isSort: true,
            disablePadding: false,
            align: 'center',
            label: t('BANNEROBJECT.parentBanner'),
        });
        headCells.push(
            {
                id: 'OrderPosition',
                isSort: true,
                disablePadding: false,
                align: 'center',
                label: t('BANNEROBJECT.orderPosition'),
            });
    }
    headCells.push(
        {
            id: 'HierarchyTree',
            isSort: false,
            disablePadding: false,
            align: 'center',
            label: t('BANNEROBJECT.hierarchyTree'),
        });

    headCells.push({
        id: 'actions',
        isSort: false,
        disablePadding: false,
        align: 'center',
        label: t('LABELS.actions'),
    });

    const orderedCells = [
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
            key: "bannerIsActive",
            type: "customComponent",
            customComponentStyleConfig: {
                key: "bannerIsActive"
            },
            alignment: "center",
            customComponentGetter: getBannerIsActiveComponent,
            fieldName: "isDraft"
        }
    ];

    if (router.query.parentBannerId) {
        orderedCells.push(
            {
                key: "ParentBannerPath",
                type: "customComponent",
                customComponentStyleConfig: {
                    key: "ParentBannerPath"
                },
                alignment: "center",
                customComponentGetter: getBannerParentPathComponent,
                fieldName: "parentBannerPath"
            });
        orderedCells.push(
            {
                key: "bannerOrderPosition",
                type: "typography",
                alignment: "center",
                typographyVariant: "secondary",
                fieldName: "orderPosition"
            });
    }
    orderedCells.push(
        {
            key: "HierarchyTree",
            type: "customComponent",
            customComponentStyleConfig: {
                key: "HierarchyTree"
            },
            alignment: "center",
            customComponentGetter: getBannerHierarchyTreeComponent,
            fieldName: "HierarchyTree"
        });

    orderedCells.push({
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
            },
            {
                actionKey: "SingleActions",
                actionType: "customComponent",
                customComponentStyleConfig: {
                    key: "singleActions"
                },
                alignment: "center",
                customComponentGetter: getSingleActionsComponent,
                fieldName: "singleActions"
            }
        ]
    });

    const tableViewData = {
        "orderedCells": orderedCells,
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
                key: "bannerActions",
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
                        key: "SingleActions",
                        type: "customComponent",
                        customComponentStyleConfig: {
                            paddingLeft: 1,
                            key: "singleActions"
                        },
                        alignment: "center",
                        customComponentGetter: getSingleActionsComponent,
                        fieldName: "singleActions"
                    }
                ]
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
                        key: "bannerDetailsOrderPosition",
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

    if (router.query.parentBannerId) {
        gridViewData.orderedGridItems.push(
            {
                key: "ParentBannerPath",
                type: "customComponent",
                customComponentStyleConfig: {
                    key: "ParentBannerPath"
                },
                alignment: "center",
                customComponentGetter: getBannerParentPathComponent,
                fieldName: "parentBannerPath"
            });
    }
    gridViewData.orderedGridItems.push(
        {
            key: "HierarchyTree",
            type: "customComponent",
            customComponentStyleConfig: {
                key: "HierarchyTree"
            },
            alignment: "center",
            customComponentGetter: getBannerHierarchyTreeComponent,
            fieldName: "HierarchyTree"
        });

    const breadcrumbsData = [
        { url: "/", label: t('LIST.home'), isLink: true },
        { url: "", label: t('LIST.cms'), isLink: false },
        { url: "/content/banner", label: t('LIST.bannersTitleRoot'), isLink: true },
    ];

    if (banners && banners[0]) {
        if (banners[0].parentBannerPath) {
            const bannerPathSplitted = banners[0].parentBannerPath.split("|").filter(function(i){return i});
            const bannerLevel = 0;
            bannerPathSplitted.forEach((element,index) => {
              bannerLevel = index+1;
              if (element == router.query.parentBannerId) {
                breadcrumbsData.push({ url: "", label: t("LABELS.bannersListIdentificationSmall",{bannerIdentification: banners[0].pageKey + "|" + banners[0].componentKey + "|" + t("LIST.bannersSubPathLevel", {levelNumber: bannerLevel})}), ownPage: true })
              }
              else {
                breadcrumbsData.push(
                  { url: "/content/banner" + "?parentBannerId=" + element, label: t('LIST.bannersTitleSubPath', {bannersLevel: t("LIST.bannersSubPathLevel", {levelNumber: bannerLevel})}), isLink: true }
                );
              }
            });
        }
    }

    return (
      <>
        {!isRelatedList &&
            <Box sx={{mt: '-25px', pb: '15px'}}>
                <BreadcrumbsDetailsComponent urlDataJson={breadcrumbsData}/>
            </Box>
        }
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