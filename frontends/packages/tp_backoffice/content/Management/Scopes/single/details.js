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
import { useSession } from "next-auth/react";
import { GetScopeData } from '../../../../services/scopes';

import { i18nextScopeDetails } from "@transitionpt/translations";

function ScopeDetails({isCreate}) {
    const router = useRouter();
    const isMountedRef = useRefMounted();
    const theme = useTheme();
    const [scope, setScope] = useState(null);
    const [scopeRoles, setScopeRoles] = useState([]);
    const [scopeError, setScopeError] = useState(null);
    useErrorHandler(scopeError);
    const { data: session, status } = useSession();
    const { t } = i18nextScopeDetails;
    const scopesListUri = "/management/scopes";
    let scopeAppUri = "/scopes/get/" + router.query.scopeId;
    let scopePutUri = process.env.NEXT_PUBLIC_API_BASE_URL + (isCreate ? "/scopes/create" : "/scopes/update");

    const getScopeData = useCallback(async () => {
        try {
            let scopeData = await GetScopeData(process.env.NEXT_PUBLIC_API_BASE_URL + scopeAppUri, session.accessToken);
            if (isMountedRef()) {
              if (scopeData.status) {
                setScopeError(scopeData);
                setScope({});
              }
              else {
                setScope(scopeData.scope);
                setScopeRoles(scopeData.scopeRoles);
              }
            }
          } catch (err) {
            setScopeError(err);
            console.error(err);
          }
    }, [isMountedRef, scopeAppUri]);

    useEffect(() => {
      if (!isCreate) {
        getScopeData();
      }
    }, [isCreate,getScopeData]);

    if (!isCreate && !scope) {
      return null;
    }

    const breadcrumbsData = [
      { url: "/", label: t('LIST.home'), isLink: true },
      { url: "", label: t('LIST.management'), isLink: false },
      { url: scopesListUri, label: t('LIST.scopesTitle'), isLink: true },
      { url: "", label: isCreate ? t('LABELS.scopeCreateSmall') : scope.scopeName, ownPage: true },
    ];

    return (
    <>
      {(isCreate || scope) ?
        (
        <PageTitleWrapper>
          <DetailsPageHeader breadcrumbsDataJson={breadcrumbsData} detailsTitle={isCreate ? t('LABELS.scopeCreate') : scope.scopeName} goBackLabel={t('LABELS.goBack')} goBackUrl={scopesListUri}/>
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
                          {t('LABELS.scopeWarning')}
                      </Alert>
                    : 
                      <Alert severity="info">
                          {t('LABELS.registerScopeInfo')}
                      </Alert>
                    } 
                    <Box
                      pt={3}
                      pb={1}
                      sx={{
                        px: { xs: 0, md: 3 }
                      }}
                    >
                    {(isCreate || scope) &&
                        <DetailForm isCreate={isCreate} scopeData={scope} scopeRoles={scopeRoles} scopePutUrl={scopePutUri}/>
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

export default ScopeDetails;
