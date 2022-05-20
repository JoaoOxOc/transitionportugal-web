import PageHeader from '../../../content/Blocks/ChartsSmall/PageHeader';
import Footer from '../../../components/Footer';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import Head from 'next/head';

import { Authenticated } from '../../../components/Authenticated';
import AccentHeaderLayout from '../../../layouts/AccentHeaderLayout';

import Block1 from '../../../content/Blocks/ChartsSmall/Block1';
import Block2 from '../../../content/Blocks/ChartsSmall/Block2';
import Block3 from '../../../content/Blocks/ChartsSmall/Block3';
import Block4 from '../../../content/Blocks/ChartsSmall/Block4';
import Block5 from '../../../content/Blocks/ChartsSmall/Block5';
import Block6 from '../../../content/Blocks/ChartsSmall/Block6';
import { Grid } from '@mui/material';

function DataDisplayChartsSmall() {
  return (
    <>
      <Head>
        <title>Charts Small Blocks</title>
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
        <Grid item xs={12}>
          <Block5 />
        </Grid>
        <Grid item xs={12}>
          <Block6 />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

DataDisplayChartsSmall.getLayout = (page) => (
  <Authenticated>
    <AccentHeaderLayout>{page}</AccentHeaderLayout>
  </Authenticated>
);

export default DataDisplayChartsSmall;
