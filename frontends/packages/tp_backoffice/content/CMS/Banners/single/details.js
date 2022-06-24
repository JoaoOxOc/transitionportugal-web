import { useState, useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import SingleActions from '../SingleActions';
import dynamic from "next/dynamic";
let DetailForm = dynamic(() => import('./DetailForm'), {
  ssr: false
});
let CreateForm = dynamic(() => import('./CreateForm'), {
  ssr: false
});

import PageTitleWrapper from '../../../../components/PageTitleWrapper';
import DetailsPageHeader from '../../../../components/PageHeaders/DetailsPageHeader';

import { Box, 
  Grid, 
  Card, 
  useTheme
} from '@mui/material';

import { useRefMounted } from '../../../../hooks/useRefMounted';
import { useSession } from "next-auth/react";
import { GetBannerData } from '../../../../services/cms/banners';

import { i18nextBannerDetails } from "@transitionpt/translations";

function BannerDetails({isCreate}) {
    const router = useRouter();
    const isMountedRef = useRefMounted();
    const theme = useTheme();
    const [banner, setBanner] = useState(null);
    const [bannerError, setBannerError] = useState(null);
    useErrorHandler(bannerError);
    const [refreshBanner, setRefreshBanner] = useState(true);
    const { data: session, status } = useSession();
    const { t } = i18nextBannerDetails;
    const bannersListUri = "/content/banner";
    let bannerUri = "/cms/banner/get/" + router.query.bannerId;
    let bannerPutUri = process.env.NEXT_PUBLIC_API_BASE_URL + (isCreate ? "/cms/banner/create" : "/cms/banner/update");

    const getBannerRecord = useCallback(async () => {
        try {
            let bannerData = await GetBannerData(process.env.NEXT_PUBLIC_API_BASE_URL + bannerUri, session.accessToken);
            console.log(bannerData)
            if (isMountedRef()) {
              if (bannerData.status) {
                setBannerError(bannerData);
                setBanner({});
              }
              else {
                setBanner(bannerData.banner);
              }
            }
          } catch (err) {
            setBannerError(err);
            console.error(err);
          }
    }, [isMountedRef, bannerUri]);

    useEffect(() => {
      if (!isCreate && refreshBanner) {
        getBannerRecord();
      }
      if (refreshBanner) {
        setRefreshBanner(false);
      }
    }, [isCreate,getBannerRecord, refreshBanner]);

    if (!isCreate && !banner) {
      return null;
    }

    const breadcrumbsData = [
      { url: "/", label: t('LIST.home'), isLink: true },
      { url: "", label: t('LIST.cms'), isLink: false },
      { url: bannersListUri, label: t('LIST.bannersTitleRoot'), isLink: true },
    ];

    const bannerPathSplitted = router.query.parentBannerPath ? router.query.parentBannerPath.split("|") : [];
    const bannerLevel = 0;
    bannerPathSplitted.forEach((element,index) => {
      console.log(element);
      bannerLevel = index+1;
      breadcrumbsData.push(
        { url: bannersListUri + "?parentBannerId=" + element, label: t('LIST.bannersTitleSubPath', {bannersLevel: t("LIST.bannersSubPathLevel", {levelNumber: bannerLevel})}), isLink: true }
      );
    });

    breadcrumbsData.push({ url: "", label: isCreate ? t('LABELS.bannerCreateSmall') : t("LABELS.bannerIdentificationSmall",{bannerIdentification: banner.pageKey + "|" + banner.componentKey + "|" + t("LIST.bannersSubPathLevel", {levelNumber: bannerLevel}) + "|" + t("LIST.bannersSortedPosition", {positionNumber: banner.orderPosition})}), ownPage: true })

    const receiveRefreshData = (eventValue) => {
      setRefreshBanner(eventValue);

    }

    return (
    <>
      {(isCreate || banner) ?
        (
        <PageTitleWrapper>
          <DetailsPageHeader breadcrumbsDataJson={breadcrumbsData} detailsTitle={isCreate ? t('LABELS.bannerCreate') : t("LABELS.bannerIdentificationSmall",{bannerIdentification:banner.pageKey})} goBackLabel={t('LABELS.goBack')} goBackUrl={bannersListUri}/>
          { !isCreate && 
          <Box
            sx={{
              float: 'left',
              pt: '20px',
              pl: '10vw'
            }}
          >
            {/* <SingleActions refreshData={receiveRefreshData} bannerId={banner.id} termsBeenActive={banner.beenActive} termsIsActive={terms.isActive} termsVersion={terms.version}/> */}
          </Box>
          }
        </PageTitleWrapper>
        ) : (<></>)
      }

      <Box sx={{ mt: 3 }}>
        <Grid
          sx={{ px: 4 }}
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          { isCreate &&
              <Grid item xs={12}>
                <Card>
                  <Grid container spacing={0}>
                    <Grid item xs={12} md={12}>
                      <Box p={4} flex={1}>
                        <Alert severity="info">
                            {t('LABELS.registerBannerInfo')}
                        </Alert>
                        <Box
                          pt={3}
                          pb={1}
                          sx={{
                            px: { xs: 0, md: 3 }
                          }}
                        >
                            <CreateForm parentBannerId={router.query.parentBannerId} parentBannerPath={router.query.parentBannerPath} bannerPutUri={bannerPutUri}/>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
          }
          { !isCreate && banner &&
              <DetailForm isCreate={isCreate} bannerData={banner} parentBannerId={router.query.parentBannerId} parentBannerPath={router.query.parentBannerPath} bannerPutUri={bannerPutUri}/>
          }
        </Grid>
      </Box>
    </>
    );
}

export default BannerDetails;
