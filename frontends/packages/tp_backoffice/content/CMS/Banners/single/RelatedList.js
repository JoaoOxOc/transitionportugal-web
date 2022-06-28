import { useState } from 'react';
import { 
    Grid, 
    Card,
    Box
} from '@mui/material';

import Results from '../../../../content/CMS/Banners/Results';

import { BannersSearchProvider } from '../../../../contexts/Search/CMS/BannersSearchContext';

function RelatedList({bannerData}) {

    return (
        <Card>
            <Box
                pt={3}
                pb={1}
                sx={{
                    px: { xs: 1, md: 3 }
                }}>
                <Grid
                    sx={{ px: 4 }}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <BannersSearchProvider>
                            <Results parentBannerId={bannerData.id} isRelatedList={true}/>
                        </BannersSearchProvider>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
}

export default RelatedList;