
import { i18nextEmailTemplatesList } from "@transitionpt/translations";

import {
  Grid,
  Typography
} from '@mui/material';

function PageHeader() {
  const { t } = i18nextEmailTemplatesList;

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('LABELS.emailTemplatesManagement')}
          </Typography>
          <Typography variant="subtitle2">
            {t('MESSAGES.templatesManagementDescription')}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
