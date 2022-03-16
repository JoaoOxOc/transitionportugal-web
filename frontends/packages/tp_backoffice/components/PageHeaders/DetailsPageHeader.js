import {
    Box,
    Grid,
    Typography,
    Tooltip,
    Container,
    IconButton
  } from '@mui/material';
  import BreadcrumbsDetailsComponent from '../../components/Breadcrumbs/BreadcrumbsDetailsComponent';
  import Link from '../Link';
  
  import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
  import PropTypes from 'prop-types';
  
  const DetailsPageHeader = ({ detailsTitle, breadcrumbsDataJson, goBackLabel, goBackUrl }) => {
  
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
  