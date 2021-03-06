import { i18nextTermsList } from "@transitionpt/translations";

import {
  Grid,
  Typography,
  Button
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Link from '../../../components/Link';

function PageHeader() {
    const { t } = i18nextTermsList;

  const handleCreateTermsOpen = () => {

  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('LABELS.termsManagement')}
          </Typography>
          <Typography variant="subtitle2">
            {t('MESSAGES.termsDescription')}
          </Typography>
        </Grid>
        <Grid item>
            <Link href={'/management/privacy/single/create'} isNextLink={true}>
                <Button
                        sx={{
                        mt: { xs: 2, sm: 0 }
                        }}
                        onClick={handleCreateTermsOpen}
                        variant="contained"
                        startIcon={<AddTwoToneIcon fontSize="small" />}
                    >
                    {t('LABELS.createTerms')}
                </Button>
            </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;