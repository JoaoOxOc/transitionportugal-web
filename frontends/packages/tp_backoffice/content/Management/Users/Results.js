import { SyntheticEvent, useState, useContext, useCallback, useEffect, ReactElement, Ref, forwardRef } from 'react';

import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Card,
    Checkbox,
    Grid,
    Slide,
    Divider,
    Tooltip,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
    TableRow,
    ToggleButton,
    ToggleButtonGroup,
    Tab,
    Tabs,
    TextField,
    Button,
    Typography,
    Dialog,
    Zoom,
    Icon,
    FormControlLabel,
    styled
  } from '@mui/material';

import Loader from '../../../components/Loader';
import { useRefMounted } from '../../../hooks/useRefMounted';
import { UsersSearchContext } from '../../../contexts/Search/UsersSearchContext';
import { UsersActionsContext } from '../../../contexts/Actions/UsersActionsContext';
import { GetUsers } from '../../../services/users';
import { useErrorHandler } from 'react-error-boundary';

import SecretTransform from '../../../utils/secretTransform';
import Link from '../../../components/Link';
import clsx from 'clsx';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
import Label from '../../../components/Label';
import BulkActions from './BulkActions';
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useSnackbar } from 'notistack';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import MarkEmailReadTwoToneIcon from '@mui/icons-material/MarkEmailReadTwoTone';
import UnsubscribeTwoToneIcon from '@mui/icons-material/UnsubscribeTwoTone';

import SearchBar from './SearchBar';
import ResultsHeader from '../../../components/Table/Header';
import ResultsPagination from '../../../components/Table/Pagination';

import { i18nextUsersList } from "@transitionpt/translations";

const TabsWrapper = styled(Tabs)(
    ({ theme }) => `
      @media (max-width: ${theme.breakpoints.values.md}px) {
        .MuiTabs-scrollableX {
          overflow-x: auto !important;
        }
  
        .MuiTabs-indicator {
            box-shadow: none;
        }
      }
      `
);

const AvatarError = styled(Avatar)(
    ({ theme }) => `
        background-color: ${theme.colors.error.lighter};
        color: ${theme.colors.error.main};
        width: ${theme.spacing(12)};
        height: ${theme.spacing(12)};
  
        .MuiSvgIcon-root {
          font-size: ${theme.typography.pxToRem(45)};
        }
  `
  );
  
  const CardWrapper = styled(Card)(
    ({ theme }) => `
  
    position: relative;
    overflow: visible;
  
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: inherit;
      z-index: 1;
      transition: ${theme.transitions.create(['box-shadow'])};
    }
        
      &.Mui-selected::after {
        box-shadow: 0 0 0 3px ${theme.colors.primary.main};
      }
    `
  );

  const IconActive = styled(Icon)(
    ({ theme }) => `
       background: ${theme.colors.success.dark};
       color: ${theme.palette.success.contrastText};
       width: 50px;
       height: 40px;
       border-radius: 10px;
       padding: 6px;
      `
);

const IconInactive = styled(Icon)(
    ({ theme }) => `
       background: ${theme.colors.error.dark};
       color: ${theme.palette.error.contrastText};
       width: 50px;
       height: 40px;
       border-radius: 10px;
       padding: 6px;
      `
);

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

const Results = ({associationId}) => {
    const { t } = i18nextUsersList;
    const isMountedRef = useRefMounted();
    const usersSearchData = useContext(UsersSearchContext);
    const usersActionsData = useContext(UsersActionsContext);
    const [usersError, setUsersError] = useState(null);
    useErrorHandler(usersError);
    const [users, setUsers] = useState(null);
    const [selectedItems, setSelectedUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [tabSelected, setTabSelected] = useState('all');

    let usersApiUri = "/users/get";
    let userDetailsBaseUri = "/management/users/single/";

    const headCells = [
        {
            id: 'selectAll',
            isCheckbox: true,
        },
        {
            id: 'UserName',
            isSort: true,
            disablePadding: false,
            align: 'left',
            label: t('USEROBJECT.userName'),
        },
        {
            id: 'Name',
            isSort: true,
            disablePadding: false,
            align: 'left',
            label: t('USEROBJECT.name'),
        },
        {
            id: 'Email',
            isSort: true,
            disablePadding: false,
            align: 'left',
            label: t('USEROBJECT.email'),
        },
        {
            id: 'IsActive',
            isSort: true,
            disablePadding: false,
            align: 'center',
            label: t('USEROBJECT.active'),
        },
        {
            id: 'IsEmailVerified',
            isSort: true,
            disablePadding: false,
            align: 'center',
            label: t('USEROBJECT.verified'),
        },
        {
            id: 'actions',
            isSort: false,
            disablePadding: false,
            align: 'center',
            label: t('LABELS.actions'),
        },
    ];

    const getUsersData = useCallback(async (searchDataJson) => {
        try {
          let usersData = await GetUsers(process.env.NEXT_PUBLIC_API_BASE_URL + usersApiUri, searchDataJson);
          
          if (isMountedRef()) {
            if (usersData.users) {
                setUsers(usersData.users);
                setTotalUsers(usersData.totalCount);
            }
            else {
                setUsersError(usersData);
                setUsers([]);
                setTotalUsers(0);
            }
          }
        } catch (err) {
            setUsersError(err);
            console.error(err);
        }
    }, [isMountedRef, usersApiUri]);
  
    useEffect(() => {
          if (usersSearchData.doSearch) {
              if (associationId) {
                usersSearchData.searchData.associationId = associationId;
              }
              getUsersData(usersSearchData.searchData);
          }
          // Specify how to clean up after this effect:
        //   return function cleanup() {
        //       if (usersSearchData.doSearch) {
        //         console.log("clean up")
        //         usersSearchData.cleanup();
        //       }
        //   };
    }, [usersSearchData, getUsersData, associationId]);

    const tabs = [
        {
          value: 'System',
          label: t('TABS.system')
        },
        {
          value: 'Customer',
          label: t('TABS.association')
        },
        {
          value: 'all',
          label: t('TABS.all')
        },
    ];

    const handleTabsChange = (_event, tabsValue) => {

        usersSearchData.searchData.userRole = tabsValue;
        usersSearchData.search(usersSearchData.searchData);
    
        setUsers([]);
        setSelectedUsers([]);
        setTabSelected(tabsValue);
    };

    const handleSelectAllUsers = (event) => {
        const selected = (event.target.checked == true) ? users.map((user) => user.id) : [];
        setSelectedUsers(selected);
        usersActionsData.selectedUsers = selected;
    };
    
    const handleSelectOneUser = (_event, userId) => {
        const selected = [];
        if (!selectedItems.includes(userId)) {
            selected.push(userId);
        } else {
            selected = selectedItems.filter((id) => id !== userId);
        }
        setSelectedUsers(selected);
        usersActionsData.selectedUsers = selected;
    };

    const selectedSomeUsers = users && selectedItems.length > 0 && selectedItems.length < users.length ? users.length : 0;
    const selectedAllUsers = users && selectedItems.length === users.length ? users.length : 0;
    const selectedBulkActions = selectedItems.length > 0;

    const [toggleView, setToggleView] = useState('table_view');

    const handleViewOrientation = (_event, newValue) => {
      setToggleView(newValue);
    };

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                flexDirection={{ xs: 'column', sm: 'row' }}
                justifyContent={{ xs: 'center', sm: 'space-between' }}
                pb={3}
            >
                {!associationId &&
                    <TabsWrapper
                        onChange={handleTabsChange}
                        scrollButtons="auto"
                        textColor="secondary"
                        value={usersSearchData.searchData.userRole || 'all'}
                        variant="scrollable"
                        >
                    {tabs.map((tab) => (
                        <Tab key={tab.value} value={tab.value} label={tab.label} />
                    ))}
                    </TabsWrapper>
                }
                <ToggleButtonGroup
                    sx={{
                        mt: { xs: 2, sm: 0 }
                    }}
                    value={toggleView}
                    exclusive
                    onChange={handleViewOrientation}
                >
                    <ToggleButton disableRipple value="table_view">
                        <TableRowsTwoToneIcon />
                    </ToggleButton>
                    <ToggleButton disableRipple value="grid_view">
                        <GridViewTwoToneIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            {toggleView === 'table_view' && (
                <Card>
                    <SearchBar isAllUsersTab={!associationId && tabSelected == 'all' ? true : false} itemsSelected={selectedBulkActions}/>

                    <Divider />

                    {!users || users.length === 0 ? (
                        <>
                            <Typography
                                sx={{
                                py: 10
                                }}
                                variant="h3"
                                fontWeight="normal"
                                color="text.secondary"
                                align="center"
                            >
                                {t("LABELS.noUsersFound")}
                            </Typography>
                        </>
                    ) : (
                    <>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <ResultsHeader selectedAll={handleSelectAllUsers} selectAllCount={selectedAllUsers} selectSomeCount={selectedSomeUsers}  headerCells={headCells} defaultSort={'UserName'} defaultSortDirection={'asc'} searchContext={usersSearchData}/>
                                </TableHead>
                                <TableBody>
                                    {!users || users.length == 0 ? (
                                        <Loader />
                                    ) : (
                                    users.map((user) => {
                                    const isUserSelected = selectedItems.includes(user.id);
                                    return (
                                        <TableRow hover key={user.id}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isUserSelected}
                                                    onChange={(event) =>
                                                        handleSelectOneUser(event, user.id)
                                                    }
                                                    value={isUserSelected}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h5">
                                                {user.userName}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Box display="flex" alignItems="center">
                                                    {/* <Avatar
                                                        sx={{
                                                        mr: 1
                                                        }}
                                                        src={user.avatar}
                                                    /> */}
                                                    <Box>
                                                        <Link href={userDetailsBaseUri + user.id} isNextLink={true}>
                                                            {user.name}
                                                        </Link>
                                                        {user.associationName && (
                                                            <Typography noWrap variant="subtitle2">
                                                                {t('USEROBJECT.association') + ':'}&nbsp;{user.associationName}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{user.email}</Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                              <Typography>
                                                  { user.isActive == true ?
                                                    (
                                                        <IconActive
                                                            color="primary"
                                                            >
                                                            <CheckTwoToneIcon/>
                                                        </IconActive>
                                                    ) : (
                                                        <IconInactive
                                                            color="primary"
                                                            >
                                                            <CloseTwoToneIcon/>
                                                        </IconInactive>
                                                    )
                                                  }
                                              </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                    <Typography>
                                                        { user.isEmailVerified == true ?
                                                            (
                                                                <IconActive
                                                                    color="primary"
                                                                    >
                                                                    <MarkEmailReadTwoToneIcon/>
                                                                </IconActive>
                                                            ) : (
                                                                <IconInactive
                                                                    color="primary"
                                                                    >
                                                                    <UnsubscribeTwoToneIcon/>
                                                                </IconInactive>
                                                            )
                                                        }
                                                    </Typography>
                                            </TableCell>
                                            {/* <TableCell align="center">
                                                <Typography fontWeight="bold">
                                                {user.posts}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{user.location}</Typography>
                                            </TableCell>
                                            <TableCell>{getUserRoleLabel(user.role)}</TableCell> */}
                                            <TableCell align="center">
                                                <Typography noWrap>
                                                <Tooltip title={t('LABELS.view')} arrow>
                                                    <Link href={userDetailsBaseUri + user.id} isNextLink={true}>
                                                        <IconButton
                                                        color="primary"
                                                        >
                                                        <LaunchTwoToneIcon fontSize="small" />
                                                        </IconButton>
                                                    </Link>
                                                </Tooltip>
                                                {/* <Tooltip title={t('Delete')} arrow>
                                                    <IconButton
                                                    onClick={handleConfirmDelete}
                                                    color="primary"
                                                    >
                                                    <DeleteTwoToneIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip> */}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    );
                                    })
                                    )
                                }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box p={2}>
                            <ResultsPagination gridDisplay={false} totalElements={totalUsers} searchContext={usersSearchData} paginationLabels={{ of: t('LABELS.ofSmall')}} paginationRowsPerPageLabel={t('LABELS.paginationRowsPerPage')}/>
                        </Box>
                    </>
                    )}
                </Card>
            )}
            {toggleView === 'grid_view' && (
                <>
                    <Card
                        sx={{
                            p: 2,
                            mb: 3
                        }}
                    >
                        {users && users.length > 0 && (
                            <>
                                <SearchBar isAllUsersTab={!associationId && tabSelected == 'all' ? true : false} itemsSelected={selectedBulkActions}/>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Box display="flex" alignItems="center">
                                        <FormControlLabel
                                            sx={{
                                                paddingLeft: '20px'
                                            }}
                                            control={<Checkbox
                                                checked={selectedAllUsers > 0}
                                                indeterminate={selectedSomeUsers > 0}
                                                onChange={handleSelectAllUsers}
                                            />}
                                            label={t('LABELS.selectAll')} />
                                    </Box>
                                </Box>
                            </>
                        )}
                    </Card>
                    {!users || users.length === 0 ? (
                        <Typography
                            sx={{
                                py: 10
                            }}
                            variant="h3"
                            fontWeight="normal"
                            color="text.secondary"
                            align="center"
                        >
                            {t("LABELS.noUsersFound")}
                        </Typography>
                    ) : (
                    <>
                        <Grid container spacing={3}>
                        {users.map((user) => {
                            const isUserSelected = selectedItems.includes(user.id);

                            return (
                                <Grid item xs={12} sm={6} md={4} key={user.id}>
                                <CardWrapper
                                    className={clsx({
                                    'Mui-selected': isUserSelected
                                    })}
                                >
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            zIndex: '2'
                                        }}
                                        >
                                        <Box
                                            pl={2}
                                            py={1}
                                            pr={1}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Checkbox
                                                checked={isUserSelected}
                                                onChange={(event) =>
                                                    handleSelectOneUser(event, user.id)
                                                }
                                                value={isUserSelected}
                                            />
                                        </Box>
                                        <Divider />
                                        <Box
                                            px={2}
                                            pt={2}
                                            display="flex"
                                            alignItems="flex-start"
                                            justifyContent="space-between"
                                        >
                                            {/* {getUserRoleLabel(user.role)} */}
                                            <IconButton
                                                color="primary"
                                                sx={{
                                                    p: 0.5
                                                }}
                                                >
                                                <MoreVertTwoToneIcon />
                                            </IconButton>
                                        </Box>
                                        <Box p={2} display="flex" alignItems="flex-start">
                                            {/* <Avatar
                                                sx={{
                                                    width: 50,
                                                    height: 50,
                                                    mr: 2
                                                }}
                                                src={user.avatar}
                                                /> */}
                                            <Box>
                                                <Box>
                                                    <Link variant="h5" href={userDetailsBaseUri + user.id} isNextLink={true}>
                                                        {user.name}
                                                    </Link>{' '}
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="text.secondary"
                                                        >
                                                        ({user.userName})
                                                    </Typography>
                                                </Box>
                                                <Typography
                                                    sx={{
                                                    pt: 0.3
                                                    }}
                                                    variant="subtitle2"
                                                >
                                                    {user.associationName && (
                                                        <>
                                                            {t('USEROBJECT.association') + ':'}&nbsp;{user.associationName}
                                                        </>
                                                    )}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                    pt: 1
                                                    }}
                                                    variant="h6"
                                                >
                                                    {user.email}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Divider />
                                        <Box
                                          pl={2}
                                          py={1}
                                          pr={1}
                                          display="flex"
                                          alignItems="center"
                                          justifyContent="space-between"
                                      >
                                        <Typography>
                                            <Tooltip title={t('USEROBJECT.active')} arrow>
                                                { user.isActive == true ?
                                                    (
                                                        <IconActive
                                                            color="primary"
                                                            >
                                                            <CheckTwoToneIcon/>
                                                        </IconActive>
                                                    ) : (
                                                        <IconInactive
                                                            color="primary"
                                                            >
                                                            <CloseTwoToneIcon/>
                                                        </IconInactive>
                                                    )
                                                }
                                            </Tooltip>
                                            <Tooltip title={t('USEROBJECT.verified')} arrow>
                                                { user.isEmailVerified == true ?
                                                    (
                                                        <IconActive
                                                            color="primary"
                                                            sx={{
                                                                ml: '5px'
                                                            }}
                                                            >
                                                            <MarkEmailReadTwoToneIcon/>
                                                        </IconActive>
                                                    ) : (
                                                        <IconInactive
                                                            color="primary"
                                                            sx={{
                                                                ml: '5px'
                                                            }}
                                                            >
                                                            <UnsubscribeTwoToneIcon/>
                                                        </IconInactive>
                                                    )
                                                }
                                            </Tooltip>
                                        </Typography>
                                      </Box>
                                    </Box>
                                </CardWrapper>
                                </Grid>
                            );
                            })}
                        </Grid>
                        <Card
                            sx={{
                            p: 2,
                            mt: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                            }}
                        >
                            <ResultsPagination gridDisplay={true} pageElementsCount={users.length} totalElements={totalUsers} searchContext={usersSearchData} paginationLabels={{ of: t('LABELS.ofSmall'), showing: t('LABELS.showing'), dataTitle: t('LIST.usersTitle')}} paginationRowsPerPageLabel={t('LABELS.paginationRowsPerPage')}/>
                        </Card>
                    </>
                )}
                </>
            )}
            {!toggleView && (
            <Card
              sx={{
                textAlign: 'center',
                p: 3
              }}
            >
              <Typography
                align="center"
                variant="h4"
                fontWeight="normal"
                color="text.secondary"
                sx={{
                  my: 5
                }}
                gutterBottom
              >
                {t(
                  'LABELS.chooseGrid'
                )}
              </Typography>
            </Card>
          )}
        </>
    );
};

Results.propTypes = {
};
  
Results.defaultProps = {
};

export default Results;