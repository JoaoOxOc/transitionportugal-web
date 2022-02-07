import { Typography, Grid } from '@mui/material';
import { i18nextAbout } from "@transitionpt/translations";

function PageHeader() {
  const { t } = i18nextAbout;

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {t('File Manager')}
        </Typography>
        <Typography variant="subtitle2">
          {t(
            'This is an example file manager that can be used to manage your files and folders'
          )}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
