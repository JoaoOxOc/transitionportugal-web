import { i18nextSettingsPage } from "@transitionpt/translations";

import {
  Grid,
  Typography
} from '@mui/material';

function PageHeader() {
  const { t } = i18nextSettingsPage;

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
