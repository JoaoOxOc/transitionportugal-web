import { useState, useEffect, useCallback } from 'react';

import Head from 'next/head';

import AccentHeaderLayout from '../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../components/Authenticated';

import PageHeader from '../../../content/Management/Users/PageHeader';
import Footer from '../../../components/Footer';

import { Grid } from '@mui/material';
import { useRefMounted } from '../../../hooks/useRefMounted';

import { usersApi } from '../../../mocks/users';

import PageTitleWrapper from '../../../components/PageTitleWrapper';

import Results from '../../../content/Management/Users/Results';

function ManagementUsers() {
  const isMountedRef = useRefMounted();
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    try {
      const response = await usersApi.getUsers();

      if (isMountedRef()) {
        setUsers(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <Head>
        <title>Users - Management</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid
        sx={{ px: 4 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <Results users={users} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

ManagementUsers.getLayout = (page) => (
  <Authenticated>
    <AccentHeaderLayout>{page}</AccentHeaderLayout>
  </Authenticated>
);

export default ManagementUsers;
