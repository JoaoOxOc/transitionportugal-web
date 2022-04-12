import { i18nextUsersList } from "@transitionpt/translations";

import {
  Grid,
  Typography,
  Button
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Link from '../../../components/Link';

function PageHeader() {
  const { t } = i18nextUsersList;

  const handleCreateUserOpen = () => {

  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('LABELS.UsersManagement')}
          </Typography>
          <Typography variant="subtitle2">
            {t('MESSAGES.usersManagementDescription')}
          </Typography>
        </Grid>
        <Grid item>
            <Link href={'/management/users/single/create'} isNextLink={true}>
                <Button
                        sx={{
                        mt: { xs: 2, sm: 0 }
                        }}
                        onClick={handleCreateUserOpen}
                        variant="contained"
                        startIcon={<AddTwoToneIcon fontSize="small" />}
                    >
                    {t('LABELS.createUser')}
                </Button>
            </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;