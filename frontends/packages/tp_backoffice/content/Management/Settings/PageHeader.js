
import { i18nextSettingsList } from "@transitionpt/translations";

import {
  Grid,
  Typography
} from '@mui/material';

function PageHeader({settingsType}) {
  const { t } = i18nextSettingsList;

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {settingsType == "email" ? t('LABELS.emailSettings') : t('LABELS.userAuthSettings')}
          </Typography>
          <Typography variant="subtitle2">
            {settingsType == "email" ? t('MESSAGES.emailSettingsDescription') : t('MESSAGES.userAuthSettingsDescription')}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
