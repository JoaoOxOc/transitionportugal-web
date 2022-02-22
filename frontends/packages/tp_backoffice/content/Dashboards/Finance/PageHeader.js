import { Typography } from '@mui/material';
import { useAuth } from 'src/hooks/useAuth';
import { i18nextAbout } from "@transitionpt/translations";

function PageHeader() {
  const { t } = i18nextAbout;
  const { user } = useAuth();

  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        {t('Finance Dashboard')}
      </Typography>
      <Typography variant="subtitle2">
        {user.name},{' '}
        {t('This could be your beautiful finance administration panel.')}
      </Typography>
    </>
  );
}

export default PageHeader;
