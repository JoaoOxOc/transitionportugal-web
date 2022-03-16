import { useState, useEffect, useCallback } from 'react';

import AccentHeaderLayout from '../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../components/Authenticated';

import Head from 'next/head';
import PageHeader from '../../../content/Management/Invoices/PageHeader';
import Footer from '../../../components/Footer';
import Statistics from '../../../content/Management/Invoices/Statistics';
import PageTitleWrapper from '../../../components/PageTitleWrapper';

import { Grid } from '@mui/material';
import { useRefMounted } from '../../../hooks/useRefMounted';

import { invoicesApi } from '../../../mocks/invoices';
import Results from '../../../content/Management/Invoices/Results';

function ManagementInvoices() {
  const isMountedRef = useRefMounted();
  const [invoices, setInvoices] = useState([]);

  const getInvoices = useCallback(async () => {
    try {
      const response = await invoicesApi.getInvoices();

      if (isMountedRef()) {
        setInvoices(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  return (
    <>
      <Head>
        <title>Invoices - Management</title>
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
          <Statistics />
        </Grid>
        <Grid item xs={12}>
          <Results invoices={invoices} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

ManagementInvoices.getLayout = (page) => (
  <Authenticated>
    <AccentHeaderLayout>{page}</AccentHeaderLayout>
  </Authenticated>
);

export default ManagementInvoices;
