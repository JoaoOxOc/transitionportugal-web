import { SyntheticEvent, useState, ReactElement, Ref, forwardRef } from 'react';

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
    styled
  } from '@mui/material';

import Loader from '../../../components/Loader';
import { useRefMounted } from '../../../hooks/useRefMounted';
import { UsersSearchContext } from '../../../contexts/Search/UsersSearchContext';
import { GetUsers } from '../../../services/users';
import { useErrorHandler } from 'react-error-boundary';

import SecretTransform from '../../../utils/secretTransform';
import Link from '../../../components/Link';
import clsx from 'clsx';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
import Label from '../../../components/Label';
// import BulkActions from './BulkActions';
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useSnackbar } from 'notistack';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

import SearchBar from './SearchBar';
import ResultsHeader from '../../../components/Table/Header';
import ResultsPagination from '../../../components/Table/Pagination';

import { i18nextUsersList } from "@transitionpt/translations";

const Results = () => {
    const { t } = i18nextUsersList;
    const isMountedRef = useRefMounted();
    const usersSearchData = useContext(UsersSearchContext);
    const [usersError, setUsersError] = useState(null);
    useErrorHandler(usersError);
    const [users, setUsers] = useState(null);
    const [totalUsers, setTotalUsers] = useState(0);

    let usersApiUri = "/users/get";
    let userDetailsBaseUri = "/management/users/single/";

    const headCells = [
        {
            id: 'UserName',
            isSort: true,
            disablePadding: false,
            align: 'left',
            label: t('CLIENTOBJECT.name'),
        },
        {
            id: 'Email',
            isSort: true,
            disablePadding: false,
            align: 'left',
            label: t('CLIENTOBJECT.description'),
        },
        {
            id: 'IsActive',
            isSort: true,
            disablePadding: false,
            align: 'center',
            label: t('CLIENTOBJECT.clientId'),
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
              getUsersData(usersSearchData.searchData);
          }
    }, [usersSearchData, getUsersData]);

    const [toggleView, setToggleView] = useState('table_view');

    const handleViewOrientation = (_event, newValue) => {
      setToggleView(newValue);
    };

    return (
        <>
        </>
    );
};

Results.propTypes = {
};
  
Results.defaultProps = {
};

export default Results;