
import { i18nextClientsList } from "@transitionpt/translations";

import {
  Grid,
  Typography,
  Button
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Link from '../../../../components/Link';

function PageHeader() {
  const { t } = i18nextClientsList;

  const handleCreateClientAppOpen = () => {

  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('LABELS.clientSettings')}
          </Typography>
          <Typography variant="subtitle2">
            {t('MESSAGES.clientsDescription')}
          </Typography>
        </Grid>
        <Grid item>
            <Link href={'/management/app/clients/single/create'} isNextLink={true}>
                <Button
                        sx={{
                        mt: { xs: 2, sm: 0 }
                        }}
                        onClick={handleCreateClientAppOpen}
                        variant="contained"
                        startIcon={<AddTwoToneIcon fontSize="small" />}
                    >
                    {t('LABELS.createClientApp')}
                </Button>
            </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
