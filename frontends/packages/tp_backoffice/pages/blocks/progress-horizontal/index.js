import PageHeader from '../../../content/Blocks/ProgressHorizontal/PageHeader';
import Footer from '../../../components/Footer';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import Head from 'next/head';

import { Authenticated } from '../../../components/Authenticated';
import AccentHeaderLayout from '../../../layouts/AccentHeaderLayout';

import Block1 from '../../../content/Blocks/ProgressHorizontal/Block1';
import Block2 from '../../../content/Blocks/ProgressHorizontal/Block2';
import Block3 from '../../../content/Blocks/ProgressHorizontal/Block3';
import Block4 from '../../../content/Blocks/ProgressHorizontal/Block4';
import Block5 from '../../../content/Blocks/ProgressHorizontal/Block5';
import Block6 from '../../../content/Blocks/ProgressHorizontal/Block6';
import Block7 from '../../../content/Blocks/ProgressHorizontal/Block7';
import Block8 from '../../../content/Blocks/ProgressHorizontal/Block8';
import Block9 from '../../../content/Blocks/ProgressHorizontal/Block9';
import Block10 from '../../../content/Blocks/ProgressHorizontal/Block10';
import { Grid } from '@mui/material';

function DataDisplayProgressHorizontal() {
  return (
    <>
      <Head>
        <title>Analytics Dashboard</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Grid
        sx={{
          px: 4
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <Block1 />
        </Grid>
        <Grid item xs={12}>
          <Block2 />
        </Grid>
        <Grid item xs={12}>
          <Block3 />
        </Grid>
        <Grid item xs={12}>
          <Block4 />
        </Grid>
        <Grid item md={6} xs={12}>
          <Block5 />
        </Grid>
        <Grid item md={6} xs={12}>
          <Block6 />
        </Grid>
        <Grid item xs={12}>
          <Block7 />
        </Grid>
        <Grid item xs={12}>
          <Block8 />
        </Grid>
        <Grid item xs={12}>
          <Block9 />
        </Grid>
        <Grid item xs={12}>
          <Block10 />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

DataDisplayProgressHorizontal.getLayout = (page) => (
  <Authenticated>
    <AccentHeaderLayout>{page}</AccentHeaderLayout>
  </Authenticated>
);

export default DataDisplayProgressHorizontal;
