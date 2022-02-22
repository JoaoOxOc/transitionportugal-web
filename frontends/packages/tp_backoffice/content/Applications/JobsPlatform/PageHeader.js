import { Typography } from '@mui/material';
import { i18nextAbout } from "@transitionpt/translations";

function PageHeader() {
  const { t } = i18nextAbout;

  return (
    <>
      <Typography
        align="center"
        variant="h1"
        component="h3"
        sx={{
          mb: 1
        }}
      >
        {t('Jobs Platform')}
      </Typography>
      <Typography
        align="center"
        variant="h4"
        fontWeight="normal"
        color="text.secondary"
      >
        {t('Find your dream job, fast and easy!')}
      </Typography>
    </>
  );
}

export default PageHeader;
