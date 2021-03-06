import { useState, useEffect, useCallback } from 'react';

import Head from 'next/head';

import AccentHeaderLayout from '../../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../../components/Authenticated';

import PageHeader from '../../../../content/Management/Commerce/PageHeader';
import Footer from '../../../../components/Footer';
import PageTitleWrapper from '../../../../components/PageTitleWrapper';

import { Grid } from '@mui/material';
import { useRefMounted } from '../../../../hooks/useRefMounted';

import { productsApi } from '../../../../mocks/products';

import Results from '../../../../content/Management/Commerce/Results';

function ManagementProducts() {
  const isMountedRef = useRefMounted();
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async () => {
    try {
      const response = await productsApi.getProducts();

      if (isMountedRef()) {
        setProducts(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <>
      <Head>
        <title>Products - Management</title>
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
          <Results products={products} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

ManagementProducts.getLayout = (page) => (
  <Authenticated>
    <AccentHeaderLayout>{page}</AccentHeaderLayout>
  </Authenticated>
);

export default ManagementProducts;
