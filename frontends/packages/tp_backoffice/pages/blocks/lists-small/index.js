import PageHeader from '../../../content/Blocks/ListsSmall/PageHeader';
import Footer from '../../../components/Footer';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import Head from 'next/head';

import { Authenticated } from '../../../components/Authenticated';
import AccentHeaderLayout from '../../../layouts/AccentHeaderLayout';

import Block1 from '../../../content/Blocks/ListsSmall/Block1';
import Block2 from '../../../content/Blocks/ListsSmall/Block2';
import Block3 from '../../../content/Blocks/ListsSmall/Block3';
import Block4 from '../../../content/Blocks/ListsSmall/Block4';
import Block5 from '../../../content/Blocks/ListsSmall/Block5';
import Block6 from '../../../content/Blocks/ListsSmall/Block6';
import Block7 from '../../../content/Blocks/ListsSmall/Block7';
import Block8 from '../../../content/Blocks/ListsSmall/Block8';
import Block9 from '../../../content/Blocks/ListsSmall/Block9';
import Block10 from '../../../content/Blocks/ListsSmall/Block10';
import { Grid } from '@mui/material';

function DataDisplayListsSmall() {
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
        <Grid item md={6} xs={12}>
          <Block1 />
        </Grid>
        <Grid item md={6} xs={12}>
          <Block2 />
        </Grid>
        <Grid item md={6} xs={12}>
          <Block3 />
        </Grid>
        <Grid item md={6} xs={12}>
          <Block4 />
        </Grid>
        <Grid item md={6} xs={12}>
          <Block5 />
        </Grid>
        <Grid item md={6} xs={12}>
          <Block6 />
        </Grid>
        <Grid item md={6} xs={12}>
          <Block7 />
        </Grid>
        <Grid item md={6} xs={12}>
          <Block8 />
        </Grid>
        <Grid item md={6} xs={12}>
          <Block9 />
        </Grid>
        <Grid item md={6} xs={12}>
          <Block10 />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

DataDisplayListsSmall.getLayout = (page) => (
  <Authenticated>
    <AccentHeaderLayout>{page}</AccentHeaderLayout>
  </Authenticated>
);

export default DataDisplayListsSmall;
