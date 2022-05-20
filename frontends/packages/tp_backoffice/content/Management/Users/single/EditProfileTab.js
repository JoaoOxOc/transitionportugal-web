import { useState } from 'react';
import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button
} from '@mui/material';
import { i18nextUserDetails } from "@transitionpt/translations";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import Text from '../../../../components/Text';
import Label from '../../../../components/Label';

import UserDetailsForm from './detailsForm';

function EditProfileTab({userData, userPutUrl}) {
  const { t } = i18nextUserDetails;
  const [isEditting, setIsEditting] = useState(false);
  const [edittingCard, setEdittingCard] = useState();

  const handleToggleEditting = (event) => {
    setEdittingCard(event.currentTarget.dataset.edittingCard);
    if (event.currentTarget.dataset.edittingCard) {
      setIsEditting(!isEditting);
    }
  }

  const handleEditCancel = (value) => {
    if (value.name) {
      userData.name = value.name;
    }
    if (value.email) {
      userData.email = value.email;
    }
    if (value.phone) {
      userData.phone = value.phone;
    }
    setEdittingCard('');
    setIsEditting(false);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                {t('FORM.personalDetails')}
              </Typography>
              <Typography variant="subtitle2">
                {t('FORM.personalDetailsMessage')}
              </Typography>
            </Box>
            { !isEditting &&
              <Button variant="text" data-editting-card="personalDetails" onClick={handleToggleEditting} startIcon={<EditTwoToneIcon />}>
                {t('FORM.edit')}
              </Button>
            }
          </Box>
          <Divider />
          <CardContent
            sx={{
              p: 4
            }}
          >
            { isEditting == true && edittingCard == "personalDetails" ? 
              (
                <UserDetailsForm userData={userData}  userPutUrl={userPutUrl} edittingCard={edittingCard} cancelEditting={handleEditCancel}/>
              ) : (
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      {t('FORM.name')}:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b>{userData.name}</b>
                    </Text>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      {t('FORM.userName')}:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Box
                      sx={{
                        maxWidth: { xs: 'auto', sm: 300 }
                      }}
                    >
                      <Text color="black">
                        {userData.userName}
                      </Text>
                    </Box>
                  </Grid>
                </Grid>
              </Typography>
              )
            }
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                {t('FORM.accountContacts')}
              </Typography>
              <Typography variant="subtitle2">
                {t('FORM.accountContactsMessage')}
              </Typography>
            </Box>
            { !isEditting &&
              <Button variant="text" data-editting-card="contacts" onClick={handleToggleEditting} startIcon={<EditTwoToneIcon />}>
                {t('FORM.edit')}
              </Button>
            }
          </Box>
          <Divider />
          <CardContent
            sx={{
              p: 4
            }}
          >
            { isEditting == true && edittingCard == "contacts" ? 
              (
                <UserDetailsForm userData={userData} userPutUrl={userPutUrl} edittingCard={edittingCard} cancelEditting={handleEditCancel}/>
              ) : (
                <Typography variant="subtitle2">
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                      <Box pr={3} pb={2}>
                        {t('FORM.email')}:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b>{userData.email}</b>
                      </Text>
                      <Box pl={1} component="span">
                        <Label color="success">{t('FORM.primaryContactType')}</Label>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                      <Box pr={3} pb={2}>
                        {t('FORM.phone')}:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b>{userData.phoneNumber}</b>
                      </Text>
                    </Grid>
                  </Grid>
                </Typography>
              )
            }
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                {t('FORM.accountSettings')}
              </Typography>
              <Typography variant="subtitle2">
                {t('FORM.accountSettingsMessage')}
              </Typography>
            </Box>
            {/* <Button variant="text" onClick={handleToggleEditting} startIcon={<EditTwoToneIcon />}>
              {t('FORM.edit')}
            </Button> */}
          </Box>
          <Divider />
          <CardContent
            sx={{
              p: 4
            }}
          >
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                {/* <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    {t('Language')}:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>English (US)</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    {t('Timezone')}:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>GMT +2</b>
                  </Text>
                </Grid> */}
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    {t('LABELS.accountStatus')}:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Label color={userData && userData.isActive ? "success" : "error"}>
                    {userData && userData.isActive ? <DoneTwoToneIcon fontSize="small" /> : <CloseTwoToneIcon fontSize="small" />}
                    <b>{userData && userData.isActive ? t('LABELS.active') : t('LABELS.inactive')}</b>
                  </Label>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    {t('LABELS.accountEmailVerified')}:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Label color={userData && userData.isEmailVerified ? "success" : "error"}>
                    {userData && userData.isEmailVerified ? <DoneTwoToneIcon fontSize="small" /> : <CloseTwoToneIcon fontSize="small" />}
                    <b>{userData && userData.isEmailVerified ? t('LABELS.emailVerified') : t('LABELS.emailNotVerified')}</b>
                  </Label>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default EditProfileTab;
