import { useState, useCallback, useEffect } from 'react';

import Head from 'next/head';
import {getSession} from "next-auth/react";

import AccentHeaderLayout from '../../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../../components/Authenticated';
import { Authorized } from '../../../../components/Authorized';

import Footer from '../../../../components/Footer';

import { Box, Tabs, Tab, Grid, styled } from '@mui/material';

import { usersApi } from '../../../../mocks/users';

import { useRefMounted } from '../../../../hooks/useRefMounted';
import { i18nextUserDetails } from "@transitionpt/translations";

import ProfileCover from '../../../../content/Management/Users/single/ProfileCover';
import RecentActivity from '../../../../content/Management/Users/single/RecentActivity';
import Feed from '../../../../content/Management/Users/single/Feed';
import PopularTags from '../../../../content/Management/Users/single/PopularTags';
import MyCards from '../../../../content/Management/Users/single/MyCards';
import Addresses from '../../../../content/Management/Users/single/Addresses';
import ActivityTab from '../../../../content/Management/Users/single/ActivityTab';
import EditProfileTab from '../../../../content/Management/Users/single/EditProfileTab';
import NotificationsTab from '../../../../content/Management/Users/single/NotificationsTab';
import SecurityTab from '../../../../content/Management/Users/single/SecurityTab';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

function ManagementUsersView() {
    const isMountedRef = useRefMounted();
    const [user, setUser] = useState(null);
    const { t } = i18nextUserDetails;
    const [currentLang, setLang] = useState("pt");
    i18nextUserDetails.changeLanguage(currentLang);

    useEffect(() => {
        const handleNewMessage = (event) => {
            setLang(event.detail);
        };
                
        window.addEventListener('newLang', handleNewMessage);
    }, []);

    const [currentTab, setCurrentTab] = useState('activity');

    const tabs = [
      { value: 'activity', label: t('Activity') },
      { value: 'edit_profile', label: t('Edit Profile') },
      { value: 'notifications', label: t('Notifications') },
      { value: 'security', label: t('Passwords/Security') }
    ];

    const handleTabsChange = (_event, value) => {
      setCurrentTab(value);
    };

    const getUser = useCallback(async () => {
      try {
        const response = await usersApi.getUser();

        if (isMountedRef()) {
          setUser(response);
        }
      } catch (err) {
        console.error(err);
      }
    }, [isMountedRef]);

    useEffect(() => {
      getUser();
    }, [getUser]);

    if (!user) {
      return null;
    }

    return (
    <>
      <Head>
        <title>{user.name} - Profile Details</title>
      </Head>
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
            <ProfileCover user={user} />
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentActivity />
          </Grid>
          <Grid item xs={12} md={8}>
            <Feed />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularTags />
          </Grid>
          <Grid item xs={12} md={7}>
            <MyCards />
          </Grid>
          <Grid item xs={12} md={5}>
            <Addresses />
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
            {currentTab === 'activity' && <ActivityTab />}
            {currentTab === 'edit_profile' && <EditProfileTab />}
            {currentTab === 'notifications' && <NotificationsTab />}
            {currentTab === 'security' && <SecurityTab />}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
}


ManagementUsersView.getLayout = (page) => {
  const { props } = page;
  return (
    <Authenticated session={props.children.props.session}>
      <Authorized session={props.children.props.session} scopes={["users.write", "user.write"]}>
        <AccentHeaderLayout>{page}</AccentHeaderLayout>
      </Authorized>
    </Authenticated>
  );
}

export const getServerSideProps = async (context) => {
  // get the session
  const session = await getSession(context);

  // passing the session object to the page  
  return { props: {session: session} };
};

export default ManagementUsersView;
