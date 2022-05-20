import { useState } from 'react';
import { 
    Grid, 
    Button, 
    FormControl, 
    FormControlLabel,
    FormHelperText,
    TextField, 
    Slide,
    Divider,
    Tooltip,
    IconButton,
    InputLabel,
    Typography,
    CircularProgress,
    styled
} from '@mui/material';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useErrorHandler } from 'react-error-boundary';
import { useSnackbar } from 'notistack';
import { useRefMounted } from '../../../../hooks/useRefMounted';
import Language from '../../../../components/Language';
import Link from '../../../../components/Link';

import { UpdateEmailTemplateData } from '../../../../services/emailTemplates';
import { useSession } from "next-auth/react";
import { i18nextEmailTemplateDetails } from "@transitionpt/translations";
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';

const CustomInputLabel = styled(InputLabel)(
    () =>`
    label {
        position: relative !important;
        margin-top: 10px !important;
    }
    `
)

const DetailForm = ({templateData, templatePutUrl}) => {
    const { t } = i18nextEmailTemplateDetails;
    const isMountedRef = useRefMounted();
    const { enqueueSnackbar } = useSnackbar();
    const [templateError, setTemplateError] = useState(null);
    useErrorHandler(templateError);
    const { data: session, status } = useSession();
    const linkToEditor = "/management/settings/emailTemplate/single/editor/" + templateData.id + "?lang=" + templateData.language;

    const formik = useFormik({
        initialValues: templateData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            description: Yup.string()
                .max(255, t('MESSAGES.descriptionTooBig', {max: 255}))
                .required(t('MESSAGES.descriptionRequired')),
            subject: Yup.string()
                .max(255, t('MESSAGES.subjectTooBig', {max: 100}))
                .required(t('MESSAGES.subjectRequired'))
        }),
        onSubmit: async (values, helpers) => {
          try {
              const templateModel = {
                  id: values.id,
                  key: values.key,
                  language: values.language,
                  description: values.description,
                  subject: values.subject
              }
              const result = await UpdateEmailTemplateData(templatePutUrl, templateModel, session.accessToken);
    
              if (isMountedRef()) {
                  if (result.status) {
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: result.statusText });
                    helpers.setSubmitting(false);
                    if (result.status === 404) {
                        enqueueSnackbar(t('MESSAGES.templateNotFound', {templateKey: values.key}), {
                          variant: 'error',
                          anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center'
                          },
                          autoHideDuration: 2000,
                          TransitionComponent: Slide
                        });
                    }
                    setTemplateError(result);
                  }
                  else {
                    enqueueSnackbar(t('MESSAGES.templateUpdatedSuccessfully', {templateKey: values.key}), {
                        variant: 'success',
                        anchorOrigin: {
                          vertical: 'top',
                          horizontal: 'center'
                        },
                        autoHideDuration: 2000,
                        TransitionComponent: Slide
                    });
                    helpers.setSubmitting(false);
                  }
              }
          } catch (err) {
              console.error(err);
    
              if (isMountedRef()) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
                enqueueSnackbar(t('MESSAGES.templateGeneralError', {templateKey: values.key}), {
                    variant: 'error',
                    anchorOrigin: {
                      vertical: 'top',
                      horizontal: 'center'
                    },
                    autoHideDuration: 2000,
                    TransitionComponent: Slide
                });
                setTemplateError(err);
              }
          }
        }
      });

    return (
        <form noValidate onSubmit={formik.handleSubmit}>
            <Grid direction="column" container justifyContent="center">
                <Grid
                    sx={{
                        maxWidth: '600px !important'
                    }}
                    item
                    xs={12}
                    sm={8}
                    md={6}
                    >
                    <FormControl fullWidth variant="outlined">
                    <TextField
                        fullWidth
                        margin="normal"
                        label={t('FORM.key')}
                        name="key"
                        value={formik.values.key}
                        variant="outlined"
                        inputProps={
					        { readOnly: true}
				        }
                    />
                    </FormControl>
                </Grid>
                <Grid
                    sx={{
                        maxWidth: '600px !important'
                    }}
                    item
                    xs={12}
                    sm={8}
                    md={6}
                    >

                    <FormControl fullWidth variant="outlined">
                        <CustomInputLabel variant="standard" htmlFor="editor-language-dropdown" style={{ marginTop: '10px' }} >
                            <Typography>
                                {t("FORM.templateLanguage")}
                            </Typography>
                        </CustomInputLabel>
                        <Language selectId={"editor-language-dropdown"} readonly={true} defaultValue={templateData.language} sendSelectedLanguage={() => {}} style={{ marginTop: '30px' }}/>
                    </FormControl>
                </Grid>
                <Grid
                    sx={{
                        maxWidth: '600px !important'
                    }}
                    item
                    xs={12}
                    sm={8}
                    md={6}
                    >
                    <FormControl fullWidth variant="outlined">
                    <TextField
                        helperText={formik.touched.description && formik.errors.description}
                        error={Boolean(formik.touched.description && formik.errors.description)}
                        fullWidth
                        margin="normal"
                        label={t('FORM.description')}
                        name="description"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        variant="outlined"
                    />
                    </FormControl>
                </Grid>
                <Grid
                    sx={{
                        maxWidth: '600px !important'
                    }}
                    item
                    xs={12}
                    sm={8}
                    md={6}
                    >
                    <FormControl fullWidth variant="outlined">
                    <TextField
                        helperText={formik.touched.subject && formik.errors.subject}
                        error={Boolean(formik.touched.subject && formik.errors.subject)}
                        fullWidth
                        margin="normal"
                        label={t('FORM.subject')}
                        name="subject"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.subject}
                        variant="outlined"
                    />
                    </FormControl>
                </Grid>
                <Grid
                    sx={{
                        maxWidth: '600px !important'
                    }}
                    item
                    xs={12}
                    sm={8}
                    md={6}
                    >
                    <FormControl fullWidth variant="outlined">
                        <Typography
                            sx={{
                                pt: '10px',
                                pb: '20px'
                            }}
                        >
                            <Typography noWrap>
                                <Tooltip title={t('LABELS.view')} arrow>
                                  <Link href={linkToEditor} target="_blank">
                                  <IconButton
                                    
                                    color="primary"
                                  >
                                    {t("FORM.bodyMessage")}&nbsp;&nbsp;&nbsp;<LaunchTwoToneIcon fontSize="small" />
                                  </IconButton>
                                  </Link>
                                </Tooltip>
                              </Typography>
                        </Typography>
                    </FormControl>
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

export default DetailForm;