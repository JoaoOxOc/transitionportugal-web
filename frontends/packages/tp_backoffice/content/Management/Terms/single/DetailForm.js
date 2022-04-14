import { useState, useCallback, useEffect } from 'react';
import { 
    Grid, 
    Button, 
    FormControl, 
    TextField, 
    Slide,
    Divider,
    FormControlLabel,
    FormHelperText,
    CircularProgress,
    Typography,
    Card,
    styled
} from '@mui/material';

import { createReactEditorJS } from 'react-editor-js';
import i18npt from '../../../../components/Editor/i18npt';
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import Header from "@editorjs/header"

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useErrorHandler } from 'react-error-boundary';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useRefMounted } from '../../../../hooks/useRefMounted';

import { UpdateRoleData, CreateRole } from '../../../../services/roles';

import { i18nextTermsDetails } from "@transitionpt/translations";

const EditorWrapper = styled(Card)(
    ({ theme }) => `
  
    position: relative;
    .ce-toolbar__content {
        max-width: 60vw !important;
    }
    .ce-block__content {
        max-width: 60vw !important;
    }

    .ce-toolbar__actions-buttons {
        right: calc(-61vw - 15px);
        position: absolute;
    }

    .ce-settings {
        right: calc(-61vw - 15px);
    }
    
    `
  );

// other editor JS plugins: https://github.com/orgs/editor-js/repositories
const DetailForm = ({isCreate, termsData, termsPutUrl, data, imageArray, handleInstance}) => {
    const { t } = i18nextTermsDetails;
    console.log(i18npt);
    const EDITOR_JS_TOOLS = {
        embed: Embed,
        header: Header,
        list: List,
        linkTool: LinkTool,
        quote: Quote,
        checklist: CheckList,
        delimiter: Delimiter,
        inlineCode: InlineCode,
        simpleImage: SimpleImage
    };
    
    const ReactEditorJS = createReactEditorJS();

    // Editor.js This will show block editor in component
    // pass EDITOR_JS_TOOLS in tools props to configure tools with editor.js
    return (
    <>
        <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
                <TextField
                    // helperText={formik.touched.description && formik.errors.description}
                    // error={Boolean(formik.touched.description && formik.errors.description)}
                    fullWidth
                    margin="normal"
                    label={t('FORM.description')}
                    name="description"
                    // onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                    // value={formik.values.description}
                    variant="outlined"
                />
            </FormControl>
        </Grid>
        <Grid item xs={12}>
            <EditorWrapper>
                <ReactEditorJS 
                    tools={EDITOR_JS_TOOLS} data={data}
                    placeholder={`Write from here...`}/>
            </EditorWrapper>
        </Grid>
    </>
    );
}

 // Return the CustomEditor to use by other components.                    
                     
export default DetailForm