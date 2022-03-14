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

import { GetSettingData } from '../../../../services/settings';

import { i18nextSettingDetails } from "@transitionpt/translations";

function SettingDetails() {
    const router = useRouter();
    const isMountedRef = useRefMounted();
    const theme = useTheme();
    const [setting, setSetting] = useState(null);
    const [settingsError, setSettingsError] = useState(null);
    useErrorHandler(settingsError);
    const { t } = i18nextSettingDetails;
    let settingsListTitle = "";
    const settingListUri = "";
    let settingsUri = "";
    switch (router.query.settingType) {
        case "email": {
          settingsUri = "/emailsettings/" + router.query.settingId;
          settingListUri = "/management/settings/email";
          settingsListTitle = t('LIST.emailSettingsTitle');
        } break;
        case "user": {
          settingsUri = "/usersettings/" + router.query.settingId;
            settingListUri = "/management/settings/auth";
            settingsListTitle = t('LIST.userSettingsTitle');
        } break;
    }

    const getSettingData = useCallback(async () => {
        try {
            let settingsData = await GetSettingData(process.env.NEXT_PUBLIC_API_BASE_URL + settingsUri);
            if (isMountedRef()) {
              if (settingsData.status) {
                setSettingsError(settingsData);
                setSetting({});
              }
              else {
                setSetting(settingsData);
              }
            }
          } catch (err) {
            setSettingsError(err);
            console.error(err);
          }
    }, [isMountedRef, settingsUri]);

    useEffect(() => {
        getSettingData();
    }, [getSettingData]);

    if (!setting) {
      return null;
    }

    const breadcrumbsData = [
      { url: "/", label: t('LIST.home'), isLink: true },
      { url: "", label: t('LIST.settings'), isLink: false },
      { url: settingListUri, label: settingsListTitle, isLink: true },
      { url: "", label: setting.key, ownPage: true },
    ];

    return (
    <>
      {setting ?
        (
        <PageTitleWrapper>
          <DetailsPageHeader breadcrumbsDataJson={breadcrumbsData} detailsTitle={setting.key} goBackLabel={t('LABELS.goBack')} goBackUrl={settingListUri}/>
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
                      <Alert severity="warning">
                        {t('LABELS.settingWarning')}
                      </Alert>
                    <Box
                      pt={3}
                      pb={1}
                      sx={{
                        px: { xs: 0, md: 3 }
                      }}
                    >
                      {setting &&
                        <DetailForm settingData={setting}/>
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

export default SettingDetails;
