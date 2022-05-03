import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  ListItem,
  List,
  ListItemText,
  Divider,
  Button,
  ListItemAvatar,
  Avatar,
  Switch,
  CardHeader,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  useTheme,
  Slide,
  styled
} from '@mui/material';
import { i18nextUserDetails } from "@transitionpt/translations";
import {genericFetch} from '../../../../services/genericFetch';
import { useSnackbar } from 'notistack';
import { useRefMounted } from '../../../../hooks/useRefMounted';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { format, subHours, subWeeks, subDays } from 'date-fns';

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.success.light};
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
`
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
`
);

function SecurityTab({userData}) {
  const { t } = i18nextUserDetails;
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useRefMounted();

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePasswordReset = async() => {
    const resetModel = {
      username: userData.userName
    }
    console.log(resetModel);
    try {
      const resetResult = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/recover", "POST", null,resetModel);
      console.log(resetResult);
      if (isMountedRef()) {
        if (resetResult.status === "Success") {
          enqueueSnackbar(t('MESSAGES.passwordResetSuccess'), {
            variant: 'success',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center'
            },
            autoHideDuration: 2000,
            TransitionComponent: Slide
          });
        }
        else {
            if (resetResult.statusText === "Unauthorized") {
                enqueueSnackbar(t('MESSAGES.tokenExpiredError'), {
                  variant: 'error',
                  anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                  },
                  autoHideDuration: 2000,
                  TransitionComponent: Slide
                });
            }
            else if (resetResult.status === 404) {
                enqueueSnackbar(t('MESSAGES.userNotFound'), {
                  variant: 'error',
                  anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                  },
                  autoHideDuration: 2000,
                  TransitionComponent: Slide
                });
            }
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  // const logs = [
  //   {
  //     id: 1,
  //     browser: ' Safari/537.36',
  //     ipaddress: '3.70.73.142',
  //     location: 'United States',
  //     date: subDays(new Date(), 2).getTime()
  //   },
  //   {
  //     id: 2,
  //     browser: 'Chrome/36.0.1985.67',
  //     ipaddress: '138.13.136.179',
  //     location: 'China',
  //     date: subDays(new Date(), 6).getTime()
  //   },
  //   {
  //     id: 3,
  //     browser: 'Googlebot/2.1',
  //     ipaddress: '119.229.170.253',
  //     location: 'China',
  //     date: subHours(new Date(), 15).getTime()
  //   },
  //   {
  //     id: 4,
  //     browser: 'AppleWebKit/535.1',
  //     ipaddress: '206.8.99.49',
  //     location: 'Philippines',
  //     date: subDays(new Date(), 4).getTime()
  //   },
  //   {
  //     id: 5,
  //     browser: 'Mozilla/5.0',
  //     ipaddress: '235.40.59.85',
  //     location: 'China',
  //     date: subWeeks(new Date(), 3).getTime()
  //   }
  // ];

  return (
    <Grid container spacing={3}>
    <Grid item xs={12}>
      <Box pb={2}>
        <Typography variant="h3">{t('FORM.security')}</Typography>
        <Typography variant="subtitle2">
          {t('FORM.securityMessage')}
        </Typography>
      </Box>
      <Card>
        <List>
          <ListItem
            sx={{
              p: 3
            }}
          >
            <ListItemText
              primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
              secondaryTypographyProps={{
                variant: 'subtitle2',
                lineHeight: 1
              }}
              primary={t('FORM.changePassword')}
              secondary={t('FORM.changePasswordMessage')}
            />
            <Button size="large" variant="outlined" onClick={handlePasswordReset}>
              {t('FORM.changePassword')}
            </Button>
          </ListItem>
          {/* <Divider component="li" /> */}
          {/* <ListItem
            sx={{
              p: 3
            }}
          >
            <ListItemText
              primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
              secondaryTypographyProps={{
                variant: 'subtitle2',
                lineHeight: 1
              }}
              primary={t('Two-Factor Authentication')}
              secondary={t(
                'Enable PIN verification for all sign in attempts'
              )}
            />
            <Switch color="primary" />
          </ListItem> */}
        </List>
      </Card>
    </Grid>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">{t('FORM.connectedAccounts')}</Typography>
          <Typography variant="subtitle2">
            {t('FORM.connectedAccountsMessage')}
          </Typography>
        </Box>
        <Card>
          <List>
            <ListItem
              sx={{
                p: 3
              }}
            >
              <ListItemAvatar
                sx={{
                  pr: 2
                }}
              >
                <AvatarWrapper src="/static/images/logo/discourse_icon.svg" />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary={t('CONNECTED_ACCOUNTS.discourse')}
                secondary={t(
                  'CONNECTED_ACCOUNTS.discourseDescription'
                )}
              />
              {userData && userData.discourseConnected ?
                (
                  <Button color="success" size="large" variant="contained">
                    {t('CONNECTED_ACCOUNTS.connected')}
                  </Button>
                ) : (
                  <Button color="secondary" size="large" variant="contained">
                    {t('CONNECTED_ACCOUNTS.disconnected')}
                  </Button>
                )
              }
            </ListItem>
          </List>
        </Card>
      </Grid>
      {/* <Grid item xs={12}>
        <Card>
          <List>
            <ListItem
              sx={{
                p: 3
              }}
            >
              <ListItemAvatar
                sx={{
                  pr: 2
                }}
              >
                <AvatarSuccess>
                  <DoneTwoToneIcon />
                </AvatarSuccess>
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary={t('Facebook')}
                secondary={t(
                  'Your Facebook account has been successfully connected'
                )}
              />
              <ButtonError size="large" variant="contained">
                {t('Revoke access')}
              </ButtonError>
            </ListItem>
            <Divider component="li" />
            <ListItem
              sx={{
                p: 3
              }}
            >
              <ListItemAvatar
                sx={{
                  pr: 2
                }}
              >
                <AvatarSuccess>
                  <DoneTwoToneIcon />
                </AvatarSuccess>
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary={t('Twitter')}
                secondary={t(
                  'Your Twitter account was last syncronized 6 days ago'
                )}
              />
              <ButtonError size="large" variant="contained">
                {t('Revoke access')}
              </ButtonError>
            </ListItem>
          </List>
        </Card>
      </Grid> */}
      {/* <Grid item xs={12}>
        <Card>
          <CardHeader
            subheaderTypographyProps={{}}
            titleTypographyProps={{}}
            title={t('Access Logs')}
            subheader={t('Recent sign in activity logs')}
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('Browser')}</TableCell>
                  <TableCell>{t('IP Address')}</TableCell>
                  <TableCell>{t('Location')}</TableCell>
                  <TableCell>{t('Date/Time')}</TableCell>
                  <TableCell align="right">{t('Actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id} hover>
                    <TableCell>{log.browser}</TableCell>
                    <TableCell>{log.ipaddress}</TableCell>
                    <TableCell>{log.location}</TableCell>
                    <TableCell>
                      {format(log.date, 'dd MMMM, yyyy - h:mm:ss a')}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip placement="top" title={t('Delete')} arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Grid> */}
    </Grid>
  );
}

export default SecurityTab;
