import {
    Breadcrumbs,
    Box,
    Grid,
    Typography,
    Tooltip,
    Button,
    Container,
    IconButton
  } from '@mui/material';
  import { i18nextAbout } from "@transitionpt/translations";
  import Link from '../../../../components/Link';
  
  import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
  import PropTypes from 'prop-types';
  
  const PageHeader = ({ setting, settingType }) => {
    const { t } = i18nextAbout;
    const settingListTitle = "";
    const settingListUri = "";
    switch (settingType) {
        case "email": {
            settingListTitle = "Email Settings";
            settingListUri = "/settings/email";
        } break;
    }

    console.log(settingListTitle);
  
    return (
      <Container maxWidth="lg">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Tooltip arrow placement="top" title={t('Go back')}>
                <IconButton
                  href={"/management" + settingListUri}
                  color="primary"
                  sx={{
                    p: 2,
                    mr: 2
                  }}
                >
                  <ArrowBackTwoToneIcon />
                </IconButton>
              </Tooltip>
              <Box>
                <Typography variant="h3" component="h3" gutterBottom>
                  #{setting.key}
                </Typography>
                <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                  <Link color="inherit" href="#">
                    {t('Home')}
                  </Link>
                  <Link color="inherit" href="#">
                    {t('Management')}
                  </Link>
                  <Link color="inherit" href="#">
                    {t(settingListTitle)}
                  </Link>
                  <Typography color="text.primary">
                    {t('Setting')} #{setting.key}
                  </Typography>
                </Breadcrumbs>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <Button
              sx={{
                mt: { xs: 2, sm: 0 }
              }}
              href={"/management" + settingListUri}
              variant="contained"
            >
              {t('View all Settings')}
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  };
  
  PageHeader.propTypes = {
    setting: PropTypes.object.isRequired,
    settingType: PropTypes.string.isRequired
  };
  
  export default PageHeader;
  