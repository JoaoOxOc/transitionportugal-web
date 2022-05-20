import { useRouter } from 'next/router'
import {
    Box,
    Card,
    Button,
    Typography,
    Container,
    Divider,
    IconButton,
    Tooltip,
    styled
  } from '@mui/material';
  
  import BaseLayout from '../layouts/BaseLayout';
  
  import Head from 'next/head';
  import Logo from '../components/LogoSign';
  
  import { i18nextPage403 } from "@transitionpt/translations";
  import FacebookIcon from '@mui/icons-material/Facebook';
  import TwitterIcon from '@mui/icons-material/Twitter';
  import InstagramIcon from '@mui/icons-material/Instagram';
  
  const MainContent = styled(Box)(
    () => `
      height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
  `
  );
  
  const TopWrapper = styled(Box)(
    ({ theme }) => `
    display: flex;
    width: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing(6)};
  `
  );
  
  function StatusForbidden() {
    const { t } = i18nextPage403;
    const router = useRouter();
  
    return (
      <>
        <Head>
          <title>{t("LABELS.pageTitle")}</title>
        </Head>
        <MainContent>
          <TopWrapper>
            <Container maxWidth="md">
              <Logo />
              <Box textAlign="center">
                <Container maxWidth="xs">
                  <Typography variant="h2" sx={{ mt: 4, mb: 2 }}>
                    {t('LABELS.mainMessage', { forbiddenurl: router.query.access })}
                  </Typography>
                  <Typography
                    variant="h3"
                    color="text.secondary"
                    fontWeight="normal"
                    sx={{ mb: 4 }}
                  >
                    {t('LABELS.description')}
                  </Typography>
                </Container>
                <Container maxWidth="sm">
                <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
                    <Button href="/admin" variant="outlined">
                    {t('LABELS.homepage')}
                    </Button>
                </Card>
                </Container>
                <img
                  alt={t('LABELS.forbiddenImage')}
                  height={250}
                  src="/admin/static/images/status/maintenance.svg"
                />
              </Box>
              <Divider sx={{ my: 4 }} />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography component="span" variant="subtitle1">
                    {t('Phone')}:{' '}
                  </Typography>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="text.primary"
                  >
                    + 00 1 888 555 444
                  </Typography>
                </Box>
                {/* <Box>
                  <Tooltip arrow placement="top" title="Facebook">
                    <IconButton color="primary">
                      <FacebookIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow placement="top" title="Twitter">
                    <IconButton color="primary">
                      <TwitterIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow placement="top" title="Instagram">
                    <IconButton color="primary">
                      <InstagramIcon />
                    </IconButton>
                  </Tooltip>
                </Box> */}
              </Box>
            </Container>
          </TopWrapper>
        </MainContent>
      </>
    );
  }
  
  export default StatusForbidden;
  
  StatusForbidden.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
  };
  