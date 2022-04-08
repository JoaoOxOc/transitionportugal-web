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
    CircularProgress, 
    Typography
} from '@mui/material';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useErrorHandler } from 'react-error-boundary';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useRefMounted } from '../../../../hooks/useRefMounted';
import TransferList from '../../../../components/TransferList';

import { UpdateScopeData, CreateScope } from '../../../../services/scopes';

import { i18nextScopeDetails } from "@transitionpt/translations";

const DetailForm = ({scopeData, scopeRoles, scopePutUrl, isCreate}) => {
    const { t } = i18nextScopeDetails;
    const router = useRouter();
    const isMountedRef = useRefMounted();
    const { enqueueSnackbar } = useSnackbar();
    const [scopesError, setScopesError] = useState(null);
    useErrorHandler(scopesError);

    const initValues = {
        scopeName: '',
        description: ''
    };

    const formik = useFormik({
        initialValues: isCreate ? initValues : scopeData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            description: Yup.string()
                .max(255, t('MESSAGES.descriptionTooBig', {max: 255}))
                .required(t('MESSAGES.descriptionRequired')),
            scopeName: Yup.string()
                .max(70, t('MESSAGES.nameTooBig', {max: 70}))
                .required(t('MESSAGES.nameRequired'))
        }),
        onSubmit: async (values, helpers) => {
          try {
              const scopeModel = {
                ScopeIdentifier: values.scopeName,
                description: values.description,
              }
              console.log(scopeModel)
              let result = {};
              if (isCreate) {
                  console.log(scopePutUrl)
                result = await CreateScope(scopePutUrl, scopeModel);
              }
              else {
                result = await UpdateScopeData(scopePutUrl, scopeModel);
              }
    
              if (isMountedRef()) {
                  if (result.status) {
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: result.statusText });
                    helpers.setSubmitting(false);
                    if (result.status === 404) {
                        enqueueSnackbar(t('MESSAGES.scopeNotFound', {clientName: values.scopeName}), {
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
                        setScopesError(result);
                    }
                  }
                  else {
                    if (isCreate) {
                        enqueueSnackbar(t('MESSAGES.scopeCreatedSuccessfully', {clientName: values.scopeName}), {
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
                            pathname: '/management/scopes/single/' + result.clientAppId,
                        });
                    }
                    else {
                        enqueueSnackbar(t('MESSAGES.scopeUpdatedSuccessfully', {clientName: values.scopeName}), {
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
                enqueueSnackbar(t('MESSAGES.scopeGeneralError', {clientName: values.scopeName}), {
                    variant: 'error',
                    anchorOrigin: {
                      vertical: 'top',
                      horizontal: 'center'
                    },
                    autoHideDuration: 2000,
                    TransitionComponent: Slide
                });
                setScopesError(err);
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
                            value={formik.values.scopeName}
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
                            value={formik.values.scopeName}
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
                    { scopeRoles && !isCreate &&
                        <>
                            <Typography>
                                {t("FORM.scopeRoles")}
                            </Typography>
                            <TransferList leftData={[1,2,3]} rightData={scopeRoles}/>
                        </>
                    }
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