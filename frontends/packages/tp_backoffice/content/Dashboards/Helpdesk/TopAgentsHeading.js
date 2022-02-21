import { Button, Box, Typography } from '@mui/material';
import { i18nextAbout } from "@transitionpt/translations";

function TopAgentsHeading() {
  const { t } = i18nextAbout;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        pb: 3
      }}
    >
      <Typography variant="h3">{t('Top Agents')}</Typography>
      <Button color="primary" variant="outlined" size="small">
        {t('View all')}
      </Button>
    </Box>
  );
}

export default TopAgentsHeading;
