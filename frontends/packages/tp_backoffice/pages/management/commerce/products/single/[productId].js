import { useState, useCallback, useEffect } from 'react';
import AccentHeaderLayout from '../../../../../layouts/AccentHeaderLayout';
import { Authenticated } from '../../../../../components/Authenticated';

import Head from 'next/head';
import PageTitleWrapper from '../../../../../components/PageTitleWrapper';

import { Grid } from '@mui/material';
import { useRefMounted } from '../../../../../hooks/useRefMounted';

import ProductBody from '../../../../../content/Management/Commerce/single/ProductBody';
import Footer from '../../../../../components/Footer';
import PageHeader from '../../../../../content/Management/Commerce/single/PageHeader';
import { productsApi } from '../../../../../mocks/products';

function ManagementProductSingle() {
  const isMountedRef = useRefMounted();
  const [product, setProduct] = useState(null);

  const getProduct = useCallback(async () => {
    try {
      const response = await productsApi.getProduct();

      if (isMountedRef()) {
        setProduct(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  if (!product) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{product.name + ' - Products Management'}</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader product={product} />
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
          <ProductBody product={product} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

ManagementProductSingle.getLayout = (page) => (
  <Authenticated>
    <AccentHeaderLayout>{page}</AccentHeaderLayout>
  </Authenticated>
);

export default ManagementProductSingle;
