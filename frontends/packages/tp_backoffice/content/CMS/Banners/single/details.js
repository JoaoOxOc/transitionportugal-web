import { useState, useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import SingleActions from '../SingleActions';
import dynamic from "next/dynamic";
let DetailForm = dynamic(() => import('./DetailForm'), {
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
import { GetTermsRecord } from '../../../../services/terms';

import { i18nextBannerDetails } from "@transitionpt/translations";

function BannerDetails({isCreate}) {
    const router = useRouter();
    const isMountedRef = useRefMounted();
    const theme = useTheme();
    const [terms, setTerms] = useState(null);
    const [termsError, setTermsError] = useState(null);
    useErrorHandler(termsError);
    const [refreshTerms, setRefreshTerms] = useState(true);
    const { data: session, status } = useSession();
    const { t } = i18nextBannerDetails;
    const termsListUri = "/content/banner";
    let bannerUri = "/banner/get/" + router.query.bannerId;
    let termsPutUri = process.env.NEXT_PUBLIC_API_BASE_URL + (isCreate ? "/banner/create" : "/banner/update");

    const getTermsData = useCallback(async () => {
        try {
            let termsData = await GetTermsRecord(process.env.NEXT_PUBLIC_API_BASE_URL + bannerUri, session.accessToken);
            console.log(termsData)
            if (isMountedRef()) {
              if (termsData.status) {
                setTermsError(termsData);
                setTerms({});
              }
              else {
                setTerms(termsData.termsRecord);
              }
            }
          } catch (err) {
            setTermsError(err);
            console.error(err);
          }
    }, [isMountedRef, bannerUri]);

    useEffect(() => {
      if (!isCreate && refreshTerms) {
        getTermsData();
      }
      if (refreshTerms) {
        setRefreshTerms(false);
      }
    }, [isCreate,getTermsData, refreshTerms]);

    if (!isCreate && !terms) {
      return null;
    }

    const breadcrumbsData = [
      { url: "/", label: t('LIST.home'), isLink: true },
      { url: "", label: t('LIST.management'), isLink: false },
      { url: termsListUri, label: t('LIST.termsTitle'), isLink: true },
      { url: "", label: isCreate ? t('LABELS.termsCreateSmall') : t("LABELS.versionSmall",{versionNumber:terms.version}), ownPage: true },
    ];

    const receiveRefreshData = (eventValue) => {
      setRefreshTerms(eventValue);

    }

    return (
    <>
      {(isCreate || terms) ?
        (
        <PageTitleWrapper>
          <DetailsPageHeader breadcrumbsDataJson={breadcrumbsData} detailsTitle={isCreate ? t('LABELS.termsCreate') : t("LABELS.versionSmall",{versionNumber:terms.version})} goBackLabel={t('LABELS.goBack')} goBackUrl={termsListUri}/>
          { !isCreate && 
          <Box
            sx={{
              float: 'left',
              pt: '20px',
              pl: '10vw'
            }}
          >
            <SingleActions refreshData={receiveRefreshData} termsId={terms.id} termsBeenActive={terms.beenActive} termsIsActive={terms.isActive} termsVersion={terms.version}/>
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
          <Grid item xs={12}>
            <Card>
              <Grid container spacing={0}>
                <Grid item xs={12} md={12}>
                  <Box p={4} flex={1}>
                    {(isCreate || terms) &&
                      <DetailForm isCreate={isCreate} termsData={terms} termsPutUrl={termsPutUri}/>
                    }
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
    );
}

export default BannerDetails;
