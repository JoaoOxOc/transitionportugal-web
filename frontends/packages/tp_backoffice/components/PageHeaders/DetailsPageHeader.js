import {
    Box,
    Card,
    Grid,
    Typography,
    Tooltip,
    Avatar,
    Container,
    IconButton,
    styled
  } from '@mui/material';
  import BreadcrumbsDetailsComponent from '../../components/Breadcrumbs/BreadcrumbsDetailsComponent';
  import Link from '../Link';
  
  import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
  import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
  import PropTypes from 'prop-types';

  const Input = styled('input')({
    display: 'none'
  });

  const AvatarWrapper = styled(Card)(
    ({ theme }) => `
  
      position: relative;
      overflow: visible;
      display: inline-block;
  
      .MuiAvatar-root {
        width: ${theme.spacing(16)};
        height: ${theme.spacing(16)};
      }
  `
  );

  const ButtonUploadWrapper = styled(Box)(
    ({ theme }) => `
      position: absolute;
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      bottom: -${theme.spacing(1)};
      right: -${theme.spacing(1)};
  
      .MuiIconButton-root {
        border-radius: 100%;
        background: ${theme.colors.primary.main};
        color: ${theme.palette.primary.contrastText};
        box-shadow: ${theme.colors.shadows.primary};
        width: ${theme.spacing(4)};
        height: ${theme.spacing(4)};
        padding: 0;
    
        &:hover {
          background: ${theme.colors.primary.dark};
        }
      }
  `
  );
  
  const DetailsPageHeader = ({ displayAvatar, avatarUrl, detailsTitle, breadcrumbsDataJson, goBackLabel, goBackUrl }) => {
  
    return (
      <Container maxWidth="lg">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
                {goBackUrl &&
                    <Tooltip arrow placement="top" title={goBackLabel}>
                      <Link href={goBackUrl} isNextLink={true}>
                        <IconButton
                        color="primary"
                        sx={{
                            p: 2,
                            mr: 2
                        }}
                        >
                        <ArrowBackTwoToneIcon />
                        </IconButton>
                      </Link>
                    </Tooltip>
                }
              <Box>
            { displayAvatar == true &&
              <AvatarWrapper>
                <Avatar variant="rounded" alt={detailsTitle} src={avatarUrl} />
                <ButtonUploadWrapper>
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    name="icon-button-file"
                    type="file"
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton component="span" color="primary">
                      <UploadTwoToneIcon />
                    </IconButton>
                  </label>
                </ButtonUploadWrapper>
              </AvatarWrapper>
            }
                <Typography variant="h3" component="h3" gutterBottom>
                  {detailsTitle}
                </Typography>
                {breadcrumbsDataJson &&
                    <BreadcrumbsDetailsComponent urlDataJson={breadcrumbsDataJson}/>
                }
              </Box>
            </Box>
          </Grid>
          <Grid item>
            {/* <Button
              sx={{
                mt: { xs: 2, sm: 0 }
              }}
              href={goBackUrl}
              variant="contained"
            >
              {t('View all Settings')}
            </Button> */}
          </Grid>
        </Grid>
      </Container>
    );
  };
  
  DetailsPageHeader.propTypes = {
    detailsTitle: PropTypes.string.isRequired
  };
  
  export default DetailsPageHeader;
  