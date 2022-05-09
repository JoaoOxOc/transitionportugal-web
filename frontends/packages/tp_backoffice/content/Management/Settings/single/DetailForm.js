import { useState } from 'react';
import { 
    Grid, 
    Button, 
    FormControl, 
    TextField, 
    Slide,
    Divider,
    FormControlLabel,
    FormHelperText,
    CircularProgress 
} from '@mui/material';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useErrorHandler } from 'react-error-boundary';
import { useSnackbar } from 'notistack';
import { useRefMounted } from '../../../../hooks/useRefMounted';

import { UpdateSettingData } from '../../../../services/settings';
import { useSession } from "next-auth/react";
import { i18nextSettingDetails } from "@transitionpt/translations";

const DetailForm = ({settingData, settingPutUrl}) => {
    const { t } = i18nextSettingDetails;
    const isMountedRef = useRefMounted();
    const { enqueueSnackbar } = useSnackbar();
    const [settingsError, setSettingsError] = useState(null);
    useErrorHandler(settingsError);
    const { data: session, status } = useSession();

    const formik = useFormik({
        initialValues: settingData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            description: Yup.string()
                .max(255, t('MESSAGES.descriptionTooBig', {max: 255}))
                .required(t('MESSAGES.descriptionRequired')),
            value: Yup.string()
                .max(255, t('MESSAGES.valueTooBig', {max: 255}))
                .required(t('MESSAGES.valueRequired'))
        }),
        onSubmit: async (values, helpers) => {
          try {
              const settingModel = {
                  key: values.key,
                  description: values.description,
                  value: values.value
              }
              console.log(settingModel)
              const result = await UpdateSettingData(settingPutUrl, settingModel, session.accessToken);
    
              if (isMountedRef()) {
                  if (result.status) {
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: result.statusText });
                    helpers.setSubmitting(false);
                    if (result.status === 404) {
                        enqueueSnackbar(t('MESSAGES.settingNotFound', {settingKey: values.key}), {
                          variant: 'error',
                          anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center'
                          },
                          autoHideDuration: 2000,
                          TransitionComponent: Slide
                        });
                    }
                    setSettingsError(result);
                  }
                  else {
                    enqueueSnackbar(t('MESSAGES.settingUpdatedSuccessfully', {settingKey: values.key}), {
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
                enqueueSnackbar(t('MESSAGES.settingGeneralError', {settingKey: values.key}), {
                    variant: 'error',
                    anchorOrigin: {
                      vertical: 'top',
                      horizontal: 'center'
                    },
                    autoHideDuration: 2000,
                    TransitionComponent: Slide
                });
                setSettingsError(err);
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
                        fullWidth
                        margin="normal"
                        label={t('FORM.defaultValue')}
                        name="defaultValue"
                        value={formik.values.defaultValue}
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
                    <TextField
                        helperText={formik.touched.value && formik.errors.value}
                        error={Boolean(formik.touched.value && formik.errors.value)}
                        fullWidth
                        margin="normal"
                        label={t('FORM.value')}
                        name="value"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.value}
                        variant="outlined"
                    />
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