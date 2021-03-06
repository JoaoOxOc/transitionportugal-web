import { i18nextRolesList } from "@transitionpt/translations";

import {
  Grid,
  Typography,
  Button
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Link from '../../../components/Link';

function PageHeader() {
    const { t } = i18nextRolesList;

  const handleCreateRoleOpen = () => {

  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('LABELS.rolesManagement')}
          </Typography>
          <Typography variant="subtitle2">
            {t('MESSAGES.rolesDescription')}
          </Typography>
        </Grid>
        <Grid item>
            <Link href={'/management/profiles/single/create'} isNextLink={true}>
                <Button
                        sx={{
                        mt: { xs: 2, sm: 0 }
                        }}
                        onClick={handleCreateRoleOpen}
                        variant="contained"
                        startIcon={<AddTwoToneIcon fontSize="small" />}
                    >
                    {t('LABELS.createRole')}
                </Button>
            </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;