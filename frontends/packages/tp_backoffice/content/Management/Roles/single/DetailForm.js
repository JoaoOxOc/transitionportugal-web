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
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useRefMounted } from '../../../../hooks/useRefMounted';

import { UpdateClientAppData, CreateClientAppData } from '../../../../services/clientApps';

import { i18nextRoleDetails } from "@transitionpt/translations";

const DetailForm = ({clientAppData, clientAppPutUrl, isCreate}) => {
    const { t } = i18nextRoleDetails;
    const router = useRouter();
    const isMountedRef = useRefMounted();
    const { enqueueSnackbar } = useSnackbar();
    const [clientAppsError, setClientAppsError] = useState(null);
    useErrorHandler(clientAppsError);

    const initValues = {
        name: '',
        description: '',
        clientId: '',
        clientSecret: ''
    };

    const formik = useFormik({
        initialValues: isCreate ? initValues : clientAppData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            description: Yup.string()
                .max(255, t('MESSAGES.descriptionTooBig', {max: 255}))
                .required(t('MESSAGES.descriptionRequired')),
            name: Yup.string()
                .max(70, t('MESSAGES.nameTooBig', {max: 70}))
                .required(t('MESSAGES.nameRequired')),
            clientId: Yup.string()
                .max(70, t('MESSAGES.clientIdTooBig', {max: 70}))
                .required(t('MESSAGES.clientIdRequired'))
        }),
        onSubmit: async (values, helpers) => {
          try {
              const clientAppModel = {
                    clientName: values.name,
                    clientDescription: values.description,
                    clientId: values.clientId
              }
              console.log(clientAppModel)
              let result = {};
              if (isCreate) {
                  console.log(clientAppPutUrl)
                result = await CreateClientAppData(clientAppPutUrl, clientAppModel);
              }
              else {
                result = await UpdateClientAppData(clientAppPutUrl, clientAppModel);
              }
    
              if (isMountedRef()) {
                  if (result.status) {
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: result.statusText });
                    helpers.setSubmitting(false);
                    if (result.status === 404) {
                        enqueueSnackbar(t('MESSAGES.clientAppNotFound', {clientName: values.name}), {
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
                        setClientAppsError(result);
                    }
                  }
                  else {
                    if (isCreate) {
                        enqueueSnackbar(t('MESSAGES.clientAppCreatedSuccessfully', {clientName: values.name}), {
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
                            pathname: '/management/app/clients/single/' + result.clientAppId,
                        });
                    }
                    else {
                        enqueueSnackbar(t('MESSAGES.clientAppUpdatedSuccessfully', {clientName: values.name}), {
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
                enqueueSnackbar(t('MESSAGES.clientAppGeneralError', {clientName: values.name}), {
                    variant: 'error',
                    anchorOrigin: {
                      vertical: 'top',
                      horizontal: 'center'
                    },
                    autoHideDuration: 2000,
                    TransitionComponent: Slide
                });
                setClientAppsError(err);
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
                        
                    { !isCreate ? 
                        <TextField
                            fullWidth
                            margin="normal"
                            label={t('FORM.name')}
                            name="name"
                            value={formik.values.name}
                            variant="outlined"
                            inputProps={
                                { readOnly: true}
                            }
                        />
                    :
                        <TextField
                            helperText={formik.touched.name && formik.errors.name}
                            error={Boolean(formik.touched.name && formik.errors.name)}
                            fullWidth
                            margin="normal"
                            label={t('FORM.name')}
                            name="name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            variant="outlined"
                        />
                    } 
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
                        helperText={formik.touched.clientId && formik.errors.clientId}
                        error={Boolean(formik.touched.clientId && formik.errors.clientId)}
                        fullWidth
                        margin="normal"
                        label={t('FORM.clientId')}
                        name="clientId"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.clientId}
                        variant="outlined"
                    />
                    </FormControl>
                </Grid>
                { !isCreate &&
                    <Grid
                        item
                        xs={12}
                        sm={10}
                        md={8}
                        >
                        <FormControl fullWidth variant="outlined">
                        <TextField
                            multiline
                            rows={6}
                            fullWidth
                            margin="normal"
                            label={t('FORM.clientSecret')}
                            name="clientSecret"
                            value={formik.values.clientSecret}
                            variant="outlined"
                            inputProps={
                                { readOnly: true}
                            }
                        />
                        </FormControl>
                    </Grid>
                }
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