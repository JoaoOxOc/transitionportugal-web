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
    Switch,
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
import NestedList from '@editorjs/nested-list';
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import Header from "@editorjs/header"

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useErrorHandler } from 'react-error-boundary';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useRefMounted } from '../../../../hooks/useRefMounted';
import { useSession } from "next-auth/react";
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

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

// other editor JS plugins: https://github.com/orgs/editor-js/repositories
const DetailForm = ({isCreate, termsData, termsPutUrl, imageArray, handleInstance}) => {
    const { t } = i18nextTermsDetails;
    const router = useRouter();
    const selectedLanguage = useRef("pt-pt");
    const selectedTermsBlocks = termsData && termsData.termsLanguages ? termsData.termsLanguages.filter((term) => { return term.langCode == selectedLanguage.current; }) : null;
    const [termsBlocks, setTermsBlocks] = useState(selectedTermsBlocks && selectedTermsBlocks.length > 0 ? selectedTermsBlocks[0] : null);
    const [isActiveCheck, setIsActiveChecked] = useState(termsData && termsData.isActive ? termsData.isActive : false);
    const savedBlocks = useRef([]);
    const isMountedRef = useRefMounted();
    const { enqueueSnackbar } = useSnackbar();
    const [termsError, setTermsError] = useState(null);
    useErrorHandler(termsError);
    const { data: session, status } = useSession();
    console.log(i18npt, termsData);
    const EDITOR_JS_TOOLS = {
        embed: Embed,
        header: Header,
        list: {
          class: NestedList,
          inlineToolbar: true,
        },
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
              if (termsData && termsData.isActive != null) {
                termsModel.isActive = termsData.isActive;
              }
              console.log(termsModel,savedBlocks)
              let result = {};
              if (isCreate) {
                result = await CreateTermsRecord(termsPutUrl, termsModel, session.accessToken);
              }
              else {
                result = await UpdateTermsRecord(termsPutUrl, termsModel, session.accessToken);
              }
              console.log(result);
              if (isMountedRef()) {
                  if (result.status) {
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: result.statusText });
                    helpers.setSubmitting(false);
                    if (result.status === 404) {
                        enqueueSnackbar(t('MESSAGES.termsNotFound', {termsName: result.termsVersion}), {
                          variant: 'error',
                          anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center'
                          },
                          autoHideDuration: 2000,
                          TransitionComponent: Slide
                        });
                    }
                    else if (result.status == 403 && result.responseBody && result.responseBody.message == "been_active") {
                      enqueueSnackbar(t('MESSAGES.termsLockedForEdition', {termsName: result.responseBody.termsVersion}), {
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
                        enqueueSnackbar(t('MESSAGES.termsCreatedSuccessfully', {termsName: result.termsVersion}), {
                            variant: 'success',
                            anchorOrigin: {
                              vertical: 'top',
                              horizontal: 'center'
                            },
                            autoHideDuration: 2000,
                            TransitionComponent: Slide
                        });
                        router.push({
                            pathname: '/management/privacy/single/' + result.termsId,
                        });
                    }
                    else {
                        enqueueSnackbar(t('MESSAGES.termsUpdatedSuccessfully', {termsName: result.termsVersion}), {
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
                enqueueSnackbar(t('MESSAGES.termsGeneralError', {termsName: result.termsVersion}), {
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
        const blockExists = savedBlocks.current.filter((block) => {return block.langCode == selectedLanguage.current; });
        const backendBlockExists = termsData && termsData.termsLanguages ? termsData.termsLanguages.filter((block) => {return block.langCode == selectedLanguage.current; }) : null;
        if (blockExists && blockExists.length > 0) {
            savedBlocks.current.forEach((block) => {
                if (block.langCode == selectedLanguage.current) {
                    block.termsData = blocksData;//JSON.stringify(blocksData);
                }
            });
        }
        else {
            savedBlocks.current.push({
                langCode: selectedLanguage.current,
                termsData: blocksData//JSON.stringify(blocksData)
            });
        }
        if (backendBlockExists && backendBlockExists.length > 0) {
            termsData.termsLanguages.forEach((block) => {
                if (block.langCode == selectedLanguage.current) {
                    block.termsData = blocksData;//JSON.stringify(blocksData);
                }
            });
        }
        else if (termsData && termsData.termsLanguages) {
            termsData.termsLanguages.push({
                langCode: selectedLanguage.current,
                termsData: blocksData//JSON.stringify(blocksData)
            });
        }
    }

    const handleSetActive = (event) => {
        termsData.isActive = event.target.checked;
        setIsActiveChecked(termsData.isActive);
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
                  {!isCreate &&
                    (termsData && termsData.beenActive ?
                      (
                        <Alert severity="warning">
                            {t('LABELS.termsBeenActiveWarning')}
                        </Alert>
                      )
                      : (
                        <Alert severity="warning">
                            {t('LABELS.termsWarning')}
                        </Alert>
                      )
                    )
                  }
            </Grid>
            {!isCreate &&
              <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                      <FormControlLabel
                          control={<IOSSwitch sx={{ m: 1 }} checked={isActiveCheck} disabled={termsData && termsData.beenActive == true ? true : false}
                          onChange={handleSetActive} size="big" />}
                          label={t("FORM.isActive")}
                      />
                  </FormControl>
              </Grid>
            }
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
                        editorTranslations={i18npt} readOnly={termsData && termsData.beenActive == true ? true : false}
                        editorTools={EDITOR_JS_TOOLS} editorData={termsBlocks ? termsBlocks.termsData : null}
                        editorPlaceholder={t("FORM.editorPlaceholder")}
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