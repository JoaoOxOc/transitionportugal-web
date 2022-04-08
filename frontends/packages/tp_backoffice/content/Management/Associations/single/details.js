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

import { GetClientAppData } from '../../../../services/clientApps';

import { i18nextAssociationDetails } from "@transitionpt/translations";

function AssociationDetails({isCreate}) {
    const router = useRouter();
    const isMountedRef = useRefMounted();
    const theme = useTheme();
    const [clientApp, setClientApp] = useState(null);
    const [clientAppError, setClientAppError] = useState(null);
    useErrorHandler(clientAppError);
    const { t } = i18nextClientDetails;
    const clientAppsListUri = "/management/app/clients";
    let clientAppUri = "/app/client/" + router.query.clientId;
    let clientAppPutUri = process.env.NEXT_PUBLIC_API_BASE_URL + (isCreate ? "/app/clientregister" : "/app/clientupdate");

    const getClientData = useCallback(async () => {
        try {
            let clientAppData = await GetClientAppData(process.env.NEXT_PUBLIC_API_BASE_URL + clientAppUri);
            if (isMountedRef()) {
              if (clientAppData.status) {
                setClientAppError(clientAppData);
                setClientApp({});
              }
              else {
                setClientApp(clientAppData.clientapp);
              }
            }
          } catch (err) {
            setClientAppError(err);
            console.error(err);
          }
    }, [isMountedRef, clientAppUri]);

    useEffect(() => {
      if (!isCreate) {
        getClientData();
      }
    }, [isCreate,getClientData]);

    if (!isCreate && !clientApp) {
      return null;
    }

    const breadcrumbsData = [
      { url: "/", label: t('LIST.home'), isLink: true },
      { url: "", label: t('LIST.settings'), isLink: false },
      { url: clientAppsListUri, label: t('LIST.clientsTitle'), isLink: true },
      { url: "", label: isCreate ? t('LABELS.clientAppCreateSmall') : clientApp.name, ownPage: true },
    ];

    return (
    <>
      {(isCreate || clientApp) ?
        (
        <PageTitleWrapper>
          <DetailsPageHeader breadcrumbsDataJson={breadcrumbsData} detailsTitle={isCreate ? t('LABELS.clientAppCreate') : clientApp.name} goBackLabel={t('LABELS.goBack')} goBackUrl={clientAppsListUri}/>
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
                          {t('LABELS.clientAppWarning')}
                      </Alert>
                    : 
                      <Alert severity="info">
                          {t('LABELS.registerClientAppInfo')}
                      </Alert>
                    } 
                    <Box
                      pt={3}
                      pb={1}
                      sx={{
                        px: { xs: 0, md: 3 }
                      }}
                    >
                    {(isCreate || clientApp) &&
                        <DetailForm isCreate={isCreate} clientAppData={clientApp} clientAppPutUrl={clientAppPutUri}/>
                    }
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

export default AssociationDetails;
