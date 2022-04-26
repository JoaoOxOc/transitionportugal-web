import { useState } from 'react';
import { 
    Grid, 
    Card,
    Box,
    Button, 
    FormControl, 
    TextField, 
    Slide,
    Divider,
    Tabs,
    Tab,
    FormControlLabel,
    FormHelperText,
    CircularProgress,
    styled
} from '@mui/material';

import Results from '../../../../content/Management/Users/Results';

import { UsersSearchProvider } from '../../../../contexts/Search/UsersSearchContext';

function UsersTab({associationId}) {

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
                        <UsersSearchProvider>
                            <Results associationId={associationId}/>
                        </UsersSearchProvider>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
}

export default UsersTab;