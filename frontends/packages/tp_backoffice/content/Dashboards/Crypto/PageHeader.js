import { Typography, Avatar, Grid, useTheme } from '@mui/material';
import { i18nextAbout } from "@transitionpt/translations";

function PageHeader() {
  const { t } = i18nextAbout;
  const theme = useTheme();

  const user = {
    avatar: '/static/images/avatars/1.jpg',
    name: 'Rachael Simons'
  };

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {t('Welcome')}, {user.name}!
        </Typography>
        <Typography variant="subtitle2">
          {t('Today is a good day to start trading crypto assets!')}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
