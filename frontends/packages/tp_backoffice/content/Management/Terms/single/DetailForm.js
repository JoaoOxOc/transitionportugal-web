import { useState, useRef, useCallback, useEffect } from 'react';
import { 
    Grid, 
    InputLabel,
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
    styled,
    Alert
} from '@mui/material';

import EditorComponent from '../../../../components/EditorComponent';
import i18npt from '../../../../components/EditorComponent/i18npt';
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

import { UpdateTermsRecord, CreateTermsRecord } from '../../../../services/terms';

import { i18nextTermsDetails } from "@transitionpt/translations";

import Language from '../../../../components/Language';

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

const CustomInputLabel = styled(InputLabel)(
    () =>`
    label {
        position: relative !important;
        margin-top: 10px !important;
    }
    `
)

// other editor JS plugins: https://github.com/orgs/editor-js/repositories
const DetailForm = ({isCreate, termsData, termsPutUrl, imageArray, handleInstance}) => {
    const { t } = i18nextTermsDetails;
    const router = useRouter();
    const [terms, setTermsData] = useState(termsData);
    const selectedLanguage = useRef("pt-pt");
    const selectedTermsBlocks = termsData && termsData.termsLanguages ? termsData.termsLanguages.filter((term) => { return term.langCode == selectedLanguage.current; }) : null;
    const [termsBlocks, setTermsBlocks] = useState(selectedTermsBlocks && selectedTermsBlocks.length > 0 ? selectedTermsBlocks[0] : null);
    const savedBlocks = useRef([]);
    const isMountedRef = useRefMounted();
    const { enqueueSnackbar } = useSnackbar();
    const [termsError, setTermsError] = useState(null);
    useErrorHandler(termsError);
    console.log(i18npt, termsData);
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

    let initValues = {
        isActive: termsData && termsData.isActive ? termsData.isActive : false,
        version: termsData && termsData.version ? termsData.version : 0,
        language: termsData && termsData.language ? termsData.language : "pt-pt",
        blocksJson: termsData && termsData.blocksJson ? termsData.blocksJson : [],
    };

    const formik = useFormik({
        initialValues: initValues,
        enableReinitialize: true,
        validationSchema: Yup.object({}),
        onSubmit: async (values, helpers) => {
          try {
              const termsModel = {
                termsLanguages: savedBlocks.current
              }
              if (termsData && termsData.id) {
                termsModel.id = termsData.id;
              }
              if (termsData && termsData.version) {
                termsModel.version = termsData.version;
              }
              console.log(termsModel,savedBlocks)
              let result = {};
              if (isCreate) {
                  console.log(termsPutUrl)
                result = await CreateTermsRecord(termsPutUrl, termsModel);
              }
              else {
                result = await UpdateTermsRecord(termsPutUrl, termsModel);
              }
    
              if (isMountedRef()) {
                  if (result.status) {
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: result.statusText });
                    helpers.setSubmitting(false);
                    if (result.status === 404) {
                        enqueueSnackbar(t('MESSAGES.termsNotFound', {termsName: values.termsVersion}), {
                          variant: 'error',
                          anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center'
                          },
                          autoHideDuration: 2000,
                          TransitionComponent: Slide
                        });
                    }
                    else {
                        setTermsError(result);
                    }
                  }
                  else {
                    if (isCreate) {
                        enqueueSnackbar(t('MESSAGES.termsCreatedSuccessfully', {termsName: values.termsVersion}), {
                            variant: 'success',
                            anchorOrigin: {
                              vertical: 'top',
                              horizontal: 'center'
                            },
                            autoHideDuration: 2000,
                            TransitionComponent: Slide
                        });
                        //TODO redirect to edit page
                        console.log(result);
                        router.push({
                            pathname: '/management/privacy/single/' + result.termsId,
                        });
                    }
                    else {
                        enqueueSnackbar(t('MESSAGES.termsUpdatedSuccessfully', {termsName: values.termsVersion}), {
                            variant: 'success',
                            anchorOrigin: {
                              vertical: 'top',
                              horizontal: 'center'
                            },
                            autoHideDuration: 2000,
                            TransitionComponent: Slide
                        });
                    }
                    helpers.setSubmitting(false);
                  }
              }
          } catch (err) {
              console.error(err);
    
              if (isMountedRef()) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
                enqueueSnackbar(t('MESSAGES.termsGeneralError', {termsName: values.termsVersion}), {
                    variant: 'error',
                    anchorOrigin: {
                      vertical: 'top',
                      horizontal: 'center'
                    },
                    autoHideDuration: 2000,
                    TransitionComponent: Slide
                });
                setTermsError(err);
              }
          }
        }
      });

    const receiveSelectedLanguage = (langCode) => {
        selectedLanguage.current = langCode;
        if (termsData && termsData.termsLanguages) {
            const langBlocks = termsData.termsLanguages.filter((term) => { return term.langCode == langCode; });
            console.log(langBlocks);
            setTermsBlocks(langBlocks && langBlocks.length > 0 ? langBlocks[0] : null);
        }
    }

    const receiveEditedBlocks = (blocksData) => {
        console.log(termsData.termsLanguages)
        const blockExists = isCreate ? savedBlocks.current.filter((block) => {return block.langCode == selectedLanguage.current; }) : termsData.termsLanguages.filter((block) => {return block.langCode == selectedLanguage.current; });
        if (blockExists && blockExists.length > 0) {
            if (isCreate) {
                savedBlocks.current.forEach((block) => {
                    if (block.langCode == selectedLanguage.current) {
                        block.termsData = blocksData;//JSON.stringify(blocksData);
                    }
                });
            }
            else {
                termsData.termsLanguages.forEach((block) => {
                    if (block.langCode == selectedLanguage.current) {
                        block.termsData = blocksData;//JSON.stringify(blocksData);
                    }
                });
            }
        }
        else {
            if (isCreate) {
                savedBlocks.current.push({
                    langCode: selectedLanguage.current,
                    termsData: blocksData//JSON.stringify(blocksData)
                });
            }
            else {
                termsData.termsLanguages.push({
                    langCode: selectedLanguage.current,
                    termsData: blocksData//JSON.stringify(blocksData)
                });
            }
        }
    }

    // Editor.js This will show block editor in component
    // pass EDITOR_JS_TOOLS in tools props to configure tools with editor.js
    return (
    <form noValidate onSubmit={formik.handleSubmit}>
        <Grid direction="row" container justifyContent="center">
            <Grid
                item
                xs={12}
                >
                <Alert severity="warning">
                    {t('LABELS.termsWarning')}
                </Alert>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                    {/* <TextField
                        helperText={formik.touched.isActive && formik.errors.isActive}
                        error={Boolean(formik.touched.isActive && formik.errors.isActive)}
                        fullWidth
                        margin="normal"
                        label={t('FORM.isActive')}
                        name="isActive"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.isActive}
                        variant="outlined"
                    /> */}
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Alert severity="info">
                    {t('LABELS.registerTermsInfo')}
                </Alert>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                    <CustomInputLabel variant="standard" htmlFor="editor-language-dropdown" style={{ marginTop: '10px' }} >
                        <Typography>
                            {t("FORM.selectLanguage")}
                        </Typography>
                    </CustomInputLabel>
                    <Language selectId={"editor-language-dropdown"} defaultValue={selectedLanguage.current} sendSelectedLanguage={receiveSelectedLanguage} style={{ marginTop: '30px' }}/>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <EditorWrapper>
                    <EditorComponent 
                        editorTranslations={i18npt}
                        editorTools={EDITOR_JS_TOOLS} editorData={termsBlocks ? termsBlocks.termsData : null}
                        editorPlaceholder={`Write from here...`}
                        sendEditBlocks={receiveEditedBlocks}/>
                </EditorWrapper>
            </Grid>
            <Grid
                sx={{
                    maxWidth: '300px !important'
                }}
                item
                xs={12}
                sm={6}
                md={3}
            >
                <Divider />
                <Button
                sx={{
                    mt: 3
                }}
                color="primary"
                startIcon={
                    formik.isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={formik.isSubmitting}
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                >
                {t('FORM.saveButton')}
                </Button>
            </Grid>
        </Grid>
    </form>
    );
}
   
export default DetailForm