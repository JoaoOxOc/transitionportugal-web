import { useState, useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';

import PageTitleWrapper from '../../../../components/PageTitleWrapper';
import DetailsPageHeader from '../../../../components/PageHeaders/DetailsPageHeader';
import DetailForm from './DetailForm';

import { Box, 
  Grid, 
  Card, 
  useTheme,
  Alert
} from '@mui/material';

import { useRefMounted } from '../../../../hooks/useRefMounted';

import { GetTermsRecord } from '../../../../services/terms';

import { i18nextTermsDetails } from "@transitionpt/translations";

function TermsDetails({isCreate}) {
    const router = useRouter();
    const isMountedRef = useRefMounted();
    const theme = useTheme();
    const [terms, setTerms] = useState(null);
    const [termsError, setTermsError] = useState(null);
    useErrorHandler(termsError);
    const { t } = i18nextTermsDetails;
    const termsListUri = "/management/privacy";
    let termsUri = "/terms/get/" + router.query.termsId;
    let termsPutUri = process.env.NEXT_PUBLIC_API_BASE_URL + (isCreate ? "/terms/create" : "/terms/update");

    const getTermsData = useCallback(async () => {
        try {
            let termsData = await GetTermsRecord(process.env.NEXT_PUBLIC_API_BASE_URL + termsUri);
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
    }, [isMountedRef, termsUri]);

    useEffect(() => {
      if (!isCreate) {
        getTermsData();
      }
    }, [isCreate,getTermsData]);

    if (!isCreate && !terms) {
      return null;
    }

    const breadcrumbsData = [
      { url: "/", label: t('LIST.home'), isLink: true },
      { url: "", label: t('LIST.management'), isLink: false },
      { url: termsListUri, label: t('LIST.termsTitle'), isLink: true },
      { url: "", label: isCreate ? t('LABELS.termCreateSmall') : terms.version, ownPage: true },
    ];

    return (
    <>
      {(isCreate || terms) ?
        (
        <PageTitleWrapper>
          <DetailsPageHeader breadcrumbsDataJson={breadcrumbsData} detailsTitle={isCreate ? t('LABELS.termsCreate') : terms.version} goBackLabel={t('LABELS.goBack')} goBackUrl={termsListUri}/>
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
                    { !isCreate ?
                      <Alert severity="warning">
                          {t('LABELS.termsWarning')}
                      </Alert>
                    : 
                      <Alert severity="info">
                          {t('LABELS.registerTermsInfo')}
                      </Alert>
                    } 
                    <Box
                      pt={3}
                      pb={1}
                      sx={{
                        px: { xs: 0, md: 3 }
                      }}
                    >
                    {/* {(isCreate || terms) &&
                        // <DetailForm isCreate={isCreate} roleData={role} rolePutUrl={rolePutUri}/>
                    } */}
                    </Box>
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

export default TermsDetails;
