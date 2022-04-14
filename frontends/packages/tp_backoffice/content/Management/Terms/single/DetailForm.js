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
    Typography
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

// other editor JS plugins: https://github.com/orgs/editor-js/repositories
const DetailForm = ({isCreate, termsData, termsPutUrl, data, imageArray, handleInstance}) => {
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
    return <ReactEditorJS 
                     tools={EDITOR_JS_TOOLS} data={data}
                     placeholder={`Write from here...`}/>
}

 // Return the CustomEditor to use by other components.                    
                     
export default DetailForm