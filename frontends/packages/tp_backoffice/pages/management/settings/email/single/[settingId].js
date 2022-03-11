import { useState, useCallback, useEffect } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';

import AccentHeaderLayout from '../../../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../../../components/Authenticated';
import { Authorized } from '../../../../../components/Authorized';

import Footer from '../../../../../components/Footer';

import { Box, Tabs, Tab, Grid, styled } from '@mui/material';

import { useRefMounted } from '../../../../../hooks/useRefMounted';

import { GetSettingData } from '../../../../../services/settings';

import { i18nextSettingDetails } from "@transitionpt/translations";

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

function ManagementSettingsView() {
    const router = useRouter();
    const isMountedRef = useRefMounted();
    const [setting, setSetting] = useState({});
    const [settingsError, setSettingsError] = useState(null);
    useErrorHandler(settingsError);
    const { t } = i18nextSettingDetails;
    const [currentLang, setLang] = useState("pt");
    i18nextSettingDetails.changeLanguage(currentLang);

    const getSettingData = useCallback(async () => {
        let settingsUri = "";
        switch (router.query.settingType) {
            case "email": settingsUri = "/emailsettings/" + router.query.settingId; break;
        }
        try {
            let settingsData = await GetSettingData(process.env.NEXT_PUBLIC_API_BASE_URL + settingsUri);
            console.log(settingsData);
            if (isMountedRef()) {
              if (settingsData.status) {
                setSettingsError(settingsData);
                setSetting({});
              }
              else {
                setSetting(settingsData.settings);
              }
            }
          } catch (err) {
            setSettingsError(err);
            console.error(err);
          }
    }, [isMountedRef, router.query]);

    useEffect(() => {
        const handleNewMessage = (event) => {
            setLang(event.detail);
        };
                
        window.addEventListener('newLang', handleNewMessage);
        
        getSettingData();
    }, [getSettingData]);

//   if (!user) {
//     return null;
//   }

  return (
    <>
      <Head>
        {/* <title>{user.name} - Profile Details</title> */}
        <title>Setting Details</title>
      </Head>
      <Box sx={{ mt: 3 }}>
        <Grid
          sx={{ px: 4 }}
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          
        </Grid>
      </Box>
      <Footer />
    </>
  );
}

ManagementSettingsView.getLayout = (page) => (
  <Authenticated>
    <Authorized scopes={["settings.admin"]}>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authorized>
  </Authenticated>
);

export default ManagementSettingsView;
