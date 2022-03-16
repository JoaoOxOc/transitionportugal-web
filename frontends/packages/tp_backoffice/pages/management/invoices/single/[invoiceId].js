import Head from 'next/head';

import { useState, useCallback, useEffect } from 'react';

import ExtendedSidebarLayout from '../../../../layouts/ExtendedSidebarLayout';
import { Authenticated } from '../../../../components/Authenticated';

import Footer from '../../../../components/Footer';
import PageTitleWrapper from '../../../../components/PageTitleWrapper';

import { Grid } from '@mui/material';
import { useRefMounted } from '../../../../hooks/useRefMounted';

import { invoicesApi } from '../../../../mocks/invoices';

import InvoiceBody from '../../../../content/Management/Invoices/single/InvoiceBody';
import PageHeader from '../../../../content/Management/Invoices/single/PageHeader';

function ManagementInvoicesView() {
  const isMountedRef = useRefMounted();
  const [invoice, setInvoice] = useState(null);

  const getInvoice = useCallback(async () => {
    try {
      const response = await invoicesApi.getInvoice();

      if (isMountedRef()) {
        setInvoice(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getInvoice();
  }, [getInvoice]);

  if (!invoice) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Invoice Details - Management</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader invoice={invoice} />
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
          <InvoiceBody invoice={invoice} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

ManagementInvoicesView.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);

export default ManagementInvoicesView;
