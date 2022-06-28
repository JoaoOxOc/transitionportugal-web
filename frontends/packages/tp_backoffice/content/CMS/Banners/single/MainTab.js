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
import { UpdateBannerData, CreateBanner } from '../../../../services/cms/banners';

import { i18nextBannerDetails } from "@transitionpt/translations";

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

function MainTab({isCreate, bannerData, parentBannerId, parentBannerPath, bannerPutUri}) {
    const { t } = i18nextBannerDetails;
    const router = useRouter();
    const selectedLanguage = useRef("pt-pt");
    const selectedBannerBlocks = bannerData && bannerData.bannerLanguages ? bannerData.bannerLanguages.filter((banner) => { return banner.langCode == selectedLanguage.current; }) : null;
    const [bannerBlocks, setBannerBlocks] = useState(selectedBannerBlocks && selectedBannerBlocks.length > 0 ? selectedBannerBlocks[0] : null);
    const [isActiveCheck, setIsActiveChecked] = useState(bannerData && bannerData.isDraft == false ? true : false);

    const savedBlocks = useRef([]);
    const isMountedRef = useRefMounted();
    const { enqueueSnackbar } = useSnackbar();
    const [bannerError, setBannerError] = useState(null);
    useErrorHandler(bannerError);
    const { data: session, status } = useSession();
    console.log(i18npt, bannerData);
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
        isDraft: bannerData && bannerData.isDraft ? bannerData.isDraft : true,
        pageKey: bannerData && bannerData.pageKey ? bannerData.pageKey : "",
        componentKey: bannerData && bannerData.componentKey ? bannerData.componentKey : "",
        orderPosition: bannerData && bannerData.orderPosition ? bannerData.orderPosition : 0,
        language: bannerData && bannerData.language ? bannerData.language : "pt-pt",
        blocksJson: bannerData && bannerData.blocksJson ? bannerData.blocksJson : [],
    };

    const formik = useFormik({
        initialValues: initValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            pageKey: Yup.string()
                .max(25, t('MESSAGES.pageKeyTooBig', {max: 25}))
                .required(t('MESSAGES.pageKeyRequired')),
            componentKey: Yup.string()
                .max(25, t('MESSAGES.componentKeyTooBig', {max: 25}))
                .required(t('MESSAGES.componentKeyRequired')),
            orderPosition: Yup.number()
                .positive(t('MESSAGES.orderPositionMustBePositive'))
                .max(25, t('MESSAGES.orderPositionTooBig', {max: 25}))
                .required(t('MESSAGES.orderPositionRequired'))
        }),
        onSubmit: async (values, helpers) => {
          try {
              const bannerModel = {
                bannerLanguages: savedBlocks.current
              }
              if (values && values.id) {
                bannerModel.id = values.id;
              }
              if (values && values.pageKey) {
                bannerModel.pageKey = values.pageKey;
              }
              if (values && values.componentKey) {
                bannerModel.componentKey = values.componentKey;
              }
              if (values && values.orderPosition) {
                bannerModel.orderPosition = values.orderPosition;
              }
              if (bannerData && bannerData.isDraft != null) {
                bannerModel.isDraft = bannerData.isDraft;
              }
              if (parentBannerId) {
                bannerModel.parentBannerId = parentBannerId;
              }
              if (parentBannerPath) {
                bannerModel.parentBannerPath = parentBannerPath;
              }
              if (bannerData && bannerData.bannerLanguages) {
                bannerModel.bannerLanguages = bannerData.bannerLanguages;

              }
              console.log(bannerModel,savedBlocks)
              let result = {};
              if (isCreate) {
                result = await CreateBanner(bannerPutUri, bannerModel, session.accessToken);
              }
              else {
                result = await UpdateBannerData(bannerPutUri, bannerModel, session.accessToken);
              }
              console.log(result);
              if (isMountedRef()) {
                  if (result.status) {
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: result.statusText });
                    helpers.setSubmitting(false);
                    if (result.status === 404) {
                        enqueueSnackbar(t('MESSAGES.bannerNotFound', {bannerIdentification: result.responseBody.bannerPageKey + "|" + result.responseBody.bannerComponentKey + "|" + t("LIST.bannersSortedPosition", {positionNumber: result.responseBody.bannerOrderPosition})}), {
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
                        setBannerError(result);
                    }
                  }
                  else {
                    if (isCreate) {
                        enqueueSnackbar(t('MESSAGES.bannerCreatedSuccessfully', {bannerIdentification: result.bannerPageKey + "|" + result.bannerComponentKey + "|" + t("LIST.bannersSortedPosition", {positionNumber: result.bannerOrderPosition})}), {
                            variant: 'success',
                            anchorOrigin: {
                              vertical: 'top',
                              horizontal: 'center'
                            },
                            autoHideDuration: 2000,
                            TransitionComponent: Slide
                        });
                        router.push({
                            pathname: '/content/banner/single/' + result.bannerId,
                        });
                    }
                    else {
                        enqueueSnackbar(t('MESSAGES.bannerUpdatedSuccessfully', {bannerIdentification: result.bannerPageKey + "|" + result.bannerComponentKey + "|" + t("LIST.bannersSortedPosition", {positionNumber: result.bannerOrderPosition})}), {
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
                enqueueSnackbar(t('MESSAGES.bannerGeneralError', {bannerIdentification: result.bannerPageKey + "|" + result.bannerComponentKey + "|" + t("LIST.bannersSortedPosition", {positionNumber: result.bannerOrderPosition})}), {
                    variant: 'error',
                    anchorOrigin: {
                      vertical: 'top',
                      horizontal: 'center'
                    },
                    autoHideDuration: 2000,
                    TransitionComponent: Slide
                });
                setBannerError(err);
              }
          }
        }
      });

    const receiveSelectedLanguage = (langCode) => {
        selectedLanguage.current = langCode;
        if (bannerData && bannerData.bannerLanguages) {
            const langBlocks = bannerData.bannerLanguages.filter((banner) => { return banner.langCode == langCode; });
            console.log(langBlocks);
            setBannerBlocks(langBlocks && langBlocks.length > 0 ? langBlocks[0] : null);
        }
    }

    const receiveEditedBlocks = (blocksData) => {
        const blockExists = savedBlocks.current.filter((block) => {return block.langCode == selectedLanguage.current; });
        const backendBlockExists = bannerData && bannerData.bannerLanguages ? bannerData.bannerLanguages.filter((block) => {return block.langCode == selectedLanguage.current; }) : null;
        if (blockExists && blockExists.length > 0) {
            savedBlocks.current.forEach((block) => {
                if (block.langCode == selectedLanguage.current) {
                    block.bannerData = blocksData;//JSON.stringify(blocksData);
                }
            });
        }
        else {
            savedBlocks.current.push({
                langCode: selectedLanguage.current,
                bannerData: blocksData//JSON.stringify(blocksData)
            });
        }
        if (backendBlockExists && backendBlockExists.length > 0) {
            bannerData.bannerLanguages.forEach((block) => {
                if (block.langCode == selectedLanguage.current) {
                    block.bannerData = blocksData;//JSON.stringify(blocksData);
                }
            });
        }
        else if (bannerData && bannerData.bannerLanguages) {
            bannerData.bannerLanguages.push({
                langCode: selectedLanguage.current,
                bannerData: blocksData//JSON.stringify(blocksData)
            });
        }
    }

    const handleSetActive = (event) => {
        bannerData.isDraft = !event.target.checked;
        setIsActiveChecked(!bannerData.isDraft);
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
                    (
                      <Alert severity="warning">
                          {t('LABELS.bannerWarning')}
                      </Alert>
                    )
                  }
            </Grid>
            {!isCreate &&
                <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                        <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }} checked={isActiveCheck}
                            onChange={handleSetActive} size="big" />}
                            label={t("FORM.isActive")}
                        />
                    </FormControl>
                </Grid>
            }
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                    <TextField
                        helperText={formik.touched.pageKey && formik.errors.pageKey}
                        error={Boolean(formik.touched.pageKey && formik.errors.pageKey)}
                        fullWidth
                        margin="normal"
                        label={t('FORM.pageKey')}
                        name="pageKey"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.pageKey}
                        variant="outlined"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                    <TextField
                        helperText={formik.touched.componentKey && formik.errors.componentKey}
                        error={Boolean(formik.touched.componentKey && formik.errors.componentKey)}
                        fullWidth
                        margin="normal"
                        label={t('FORM.componentKey')}
                        name="componentKey"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.componentKey}
                        variant="outlined"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                    <TextField
                        helperText={formik.touched.orderPosition && formik.errors.orderPosition}
                        error={Boolean(formik.touched.orderPosition && formik.errors.orderPosition)}
                        fullWidth
                        margin="normal"
                        label={t('FORM.orderPosition')}
                        name="orderPosition"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.orderPosition}
                        variant="outlined"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Alert severity="info">
                    {t('LABELS.registerBannerInfo')}
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
                        editorTranslations={i18npt} readOnly={false}
                        editorTools={EDITOR_JS_TOOLS} editorData={bannerBlocks ? bannerBlocks.bannerData : null}
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

export default MainTab;