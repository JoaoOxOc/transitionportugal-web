import { useState, useEffect } from "react";
import { i18nextSettingsPage } from "@transitionpt/translations";

import {
  Grid,
  Typography
} from '@mui/material';

function PageHeader() {
  const { t } = i18nextSettingsPage;
  const [currentLang, setLang] = useState("pt");
  i18nextSettingsPage.changeLanguage(currentLang);

  useEffect(() => {
      const handleNewMessage = (event) => {
        setLang(event.detail);
      };
            
      window.addEventListener('newLang', handleNewMessage);
  }, []);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('LABELS.emailSettings')}
          </Typography>
          <Typography variant="subtitle2">
            {t('MESSAGES.emailSettingsDescription')}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
