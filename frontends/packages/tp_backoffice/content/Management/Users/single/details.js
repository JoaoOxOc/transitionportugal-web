import { useState, useCallback, useEffect } from 'react';

import { useErrorHandler } from 'react-error-boundary';

import {
    Box, 
    Grid,
    Card, 
    Tabs,
    Tab,
    useTheme,
    Alert,
    styled
  } from '@mui/material';

import { useRefMounted } from '../../../../hooks/useRefMounted';

import { i18nextUserDetails } from "@transitionpt/translations";

import ProfileCover from './ProfileCover';
import ActivityTab from './ActivityTab';
import EditProfileTab from './EditProfileTab';
import NotificationsTab from './NotificationsTab';
import SecurityTab from './SecurityTab';

import { usersApi } from '../../../../mocks/users';
import { GetUserData } from '../../../../services/users';

const TabsWrapper = styled(Tabs)(
    () => `
      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }
  `
  );

function UserDetails({isProfile, userId}) {
    const isMountedRef = useRefMounted();
    const theme = useTheme();
    const [user, setUser] = useState(null);
    const [userError, setUserError] = useState(null);
    useErrorHandler(userError);
    const { t } = i18nextUserDetails;
    const usersListUri = "/management/users";
    let userUri = "/users/get/" + userId;
    let userPutUri = process.env.NEXT_PUBLIC_API_BASE_URL + (isProfile ? "/user/profile" : "/users/update");

    const [currentTab, setCurrentTab] = useState('edit_profile');

    const tabs = [
    //   { value: 'activity', label: t('Activity') },
      { value: 'edit_profile', label: t('TABS.main') },
    //   { value: 'notifications', label: t('Notifications') },
      { value: 'security', label: t('TABS.security') }
    ];

    const handleTabsChange = (_event, value) => {
      setCurrentTab(value);
    };

    const getUser = useCallback(async () => {
      try {
        const response = await GetUserData(process.env.NEXT_PUBLIC_API_BASE_URL + userUri);

        if (isMountedRef()) {
            if (response.status) {
              setUserError(response);
              setUser({});
            }
            else {
                setUser(response.user);
            }
        }
      } catch (err) {
        setUserError(err);
        console.error(err);
      }
    }, [isMountedRef,userUri]);

    useEffect(() => {
      getUser();
    }, [getUser]);

    if (!user) {
      return null;
    }

    const breadcrumbsData = isProfile ? [] : [
        { url: "/", label: t('LIST.home'), isLink: true },
        { url: "", label: t('LIST.management'), isLink: false },
        { url: usersListUri, label: t('LIST.usersTitle'), isLink: true },
        { url: "", label: user.name, ownPage: true },
    ];

    return (
        <Box sx={{ mt: 3 }}>
          <Grid
            sx={{ px: 4 }}
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} md={8}>
              <ProfileCover user={user} isProfile={isProfile} breadcrumbsDataJson={breadcrumbsData}/>
            </Grid>
            <Grid item xs={12}>
              <TabsWrapper
                onChange={handleTabsChange}
                value={currentTab}
                variant="scrollable"
                scrollButtons="auto"
                textColor="primary"
                indicatorColor="primary"
              >
                {tabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </TabsWrapper>
            </Grid>
            <Grid item xs={12}>
              {/* {currentTab === 'activity' && <ActivityTab />} */}
              {currentTab === 'edit_profile' && <EditProfileTab userData={user} userPutUrl={userPutUri}/>}
              {/* {currentTab === 'notifications' && <NotificationsTab />} */}
              {currentTab === 'security' && <SecurityTab userData={user}/>}
            </Grid>
          </Grid>
        </Box>
    );
}

export default UserDetails;