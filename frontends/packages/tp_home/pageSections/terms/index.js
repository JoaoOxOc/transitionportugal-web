/** @jsxImportSource theme-ui */
import { Container } from 'theme-ui';
import {
    Box,
    Grid,
    Typography,
    Divider
  } from '@material-ui/core';
import EditorViewerFragmentsWrapper from "../../components/EditorComponent/ViewerFragments";

import { TermsPageSectionStyles as styles } from './terms.style';

export default function TermsPageSection({termsContent}) {

    return (
        <Container sx={{pt: "50px", pb: "50px"}}>
            <Grid container sx={styles.termsSectionContainer}>
                <Grid item>
                    <div sx={styles.sectionCard}>
                        <EditorViewerFragmentsWrapper termsLanguages={termsContent}/>
                    </div>
                </Grid>
            </Grid>
            <Divider/>
        </Container>
    );
}