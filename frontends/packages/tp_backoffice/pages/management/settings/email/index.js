import { useContext, useState, useEffect, useCallback } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import Head from 'next/head';

import AccentHeaderLayout from '../../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../../components/Authenticated';
import { Authorized } from '../../../../components/Authorized';

import PageHeader from '../../../../content/Management/Settings/PageHeader';
import Footer from '../../../../components/Footer';

import { i18nextSettingsPage } from "@transitionpt/translations";

import { Grid } from '@mui/material';
import { useRefMounted } from '../../../../hooks/useRefMounted';

import { buildRouteQuery } from '../../../../services/genericFetch';
import { GetSettings } from '../../../../services/settings';

import PageTitleWrapper from '../../../../components/PageTitleWrapper';
import Loader from '../../../../components/Loader';

import { SettingsSearchProvider } from '../../../../contexts/Search/SettingsSearchContext';
import { SettingsSearchContext } from '../../../../contexts/Search/SettingsSearchContext';

import Results from '../../../../content/Management/Settings/Results';

function SettingsPage() {
  const { t } = i18nextSettingsPage;
  const isMountedRef = useRefMounted();
  const settingsSearchData = useContext(SettingsSearchContext);
  const [settingsError, setSettingsError] = useState(null);
  useErrorHandler(settingsError);
  const [settings, setSettings] = useState(null);
  const [currentLang, setLang] = useState("pt");
  i18nextSettingsPage.changeLanguage(currentLang);

  const getEmailSettings = useCallback(async (searchDataJson) => {
    try {
      const settingsUri = "/emailsettings/get" + buildRouteQuery(searchDataJson);
      console.log(settingsUri);
      let emailSettings = await GetSettings(process.env.NEXT_PUBLIC_API_BASE_URL + settingsUri);
      
      if (isMountedRef()) {
        if (emailSettings.settings) {
          setSettings(emailSettings.settings);
        }
        else {
          setSettingsError(emailSettings);
          setSettings([]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    const handleNewMessage = (event) => {
      setLang(event.detail);
    };
          
    window.addEventListener('newLang', handleNewMessage);

    if (settingsSearchData.doSearch) {
      getEmailSettings(settingsSearchData.searchData);
    }
  }, [settingsSearchData, getEmailSettings]);

  return (
    <>
      <Head>
        <title>{t('LABELS.emailSettings')}</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid
        sx={{ px: 4 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <SettingsSearchProvider>
            {!settings ? (
                  <Loader />
                ) : (
                  <Results settings={settings} settingsType={"email"} />
                )
            }
          </SettingsSearchProvider>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

SettingsPage.getLayout = (page) => (
  <Authenticated>
    <Authorized scopes={["settings.admin"]}>
      <AccentHeaderLayout>{page}</AccentHeaderLayout>
    </Authorized>
  </Authenticated>
);

export default SettingsPage;
