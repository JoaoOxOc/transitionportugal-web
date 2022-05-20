import { i18nextNewsletterSubscriptionsList } from "@transitionpt/translations";

import {
  Grid,
  Typography,
  Button
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Link from '../../../components/Link';

function PageHeader() {
    const { t } = i18nextNewsletterSubscriptionsList;

  const handleCreateNewsletterOpen = () => {

  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('LABELS.newsletterSubscriptionsManagement')}
          </Typography>
          <Typography variant="subtitle2">
            {t('MESSAGES.newsletterSubscriptionsDescription')}
          </Typography>
        </Grid>
        {/* <Grid item>
            <Link href={'/management/newsletters/single/create'} isNextLink={true}>
                <Button
                        sx={{
                        mt: { xs: 2, sm: 0 }
                        }}
                        onClick={handleCreateNewsletterOpen}
                        variant="contained"
                        startIcon={<AddTwoToneIcon fontSize="small" />}
                    >
                    {t('LABELS.createNewsletterSubscription')}
                </Button>
            </Link>
        </Grid> */}
      </Grid>
    </>
  );
}

export default PageHeader;