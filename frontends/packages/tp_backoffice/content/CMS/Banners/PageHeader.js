import { i18nextBannersList } from "@transitionpt/translations";

import {
  Grid,
  Typography,
  Button
} from '@mui/material';
import { useRouter } from 'next/router';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Link from '../../../components/Link';

function PageHeader() {
  const router = useRouter();
    const { t } = i18nextBannersList;

  let extraUriQueries = "";
  if (router.query.parentBannerId) {
    extraUriQueries = "?parentBannerId=" + router.query.parentBannerId;
  }

  const handleCreateBannerOpen = () => {

  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('LABELS.bannersManagement')}
          </Typography>
          <Typography variant="subtitle2">
            {t('MESSAGES.bannersManagementDescription')}
          </Typography>
        </Grid>
        <Grid item>
            <Link href={'/content/banner/single/create' + extraUriQueries} isNextLink={true}>
                <Button
                        sx={{
                        mt: { xs: 2, sm: 0 }
                        }}
                        onClick={handleCreateBannerOpen}
                        variant="contained"
                        startIcon={<AddTwoToneIcon fontSize="small" />}
                    >
                    {t('LABELS.createBanner')}
                </Button>
            </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;