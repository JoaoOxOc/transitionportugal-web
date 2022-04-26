import { useState } from 'react';
import { 
    Grid, 
    Card,
    Box,
    Button, 
    FormControl, 
    TextField, 
    Slide,
    Divider,
    FormControlLabel,
    FormHelperText,
    CircularProgress,
    styled
} from '@mui/material';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useErrorHandler } from 'react-error-boundary';
import { useSnackbar } from 'notistack';
import { useRefMounted } from '../../../../hooks/useRefMounted';

import { UpdateAssociationData } from '../../../../services/associations';

import { i18nextAssociationDetails } from "@transitionpt/translations";

function AddressTab({associationPutUrl, associationData}) {
    const { t } = i18nextAssociationDetails;
    const isMountedRef = useRefMounted();
    const { enqueueSnackbar } = useSnackbar();
    const [associationsError, setAssociationsError] = useState(null);
    useErrorHandler(associationsError);

    const formik = useFormik({
        initialValues: associationData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            address: Yup.string()
                .max(255, t('MESSAGES.addressTooBig', {max: 255}))
                .required(t('MESSAGES.addressRequired')),
            town: Yup.string()
                .max(70, t('MESSAGES.townTooBig', {max: 70}))
                .required(t('MESSAGES.townRequired')),
            postalCode: Yup.string()
                .max(20, t('MESSAGES.postalCodeTooBig', {max: 20}))
                .required(t('MESSAGES.postalCodeRequired')),
            latitude: Yup.string()
                .max(20, t('MESSAGES.latitudeTooBig', {max: 20})),
            longitude: Yup.string()
                .max(20, t('MESSAGES.longitudeTooBig', {max: 20})),
        }),
        onSubmit: async (values, helpers) => {
          try {
              const associationModel = {
                    id: values.id,
                    name: values.name,
                    description: values.description,
                    email: values.email,
                    vat: values.vat,
                    phone: values.phone,
                    website: values.website,
                    address: values.address,
                    town: values.town,
                    postalCode: values.postalCode,
                    logoImage: values.logoImage,
                    logoImage: values.logoImage,
              }
              console.log(associationModel)
              const result = await UpdateAssociationData(associationPutUrl, associationModel);
    
              if (isMountedRef()) {
                  if (result.status) {
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: result.statusText });
                    helpers.setSubmitting(false);
                    if (result.status === 404) {
                        enqueueSnackbar(t('MESSAGES.associationNotFound', {associationName: values.name}), {
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
                        setAssociationsError(result);
                    }
                  }
                  else {
                    enqueueSnackbar(t('MESSAGES.associationUpdatedSuccessfully', {associationName: values.name}), {
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
                enqueueSnackbar(t('MESSAGES.associationGeneralError', {associationName: values.name}), {
                    variant: 'error',
                    anchorOrigin: {
                      vertical: 'top',
                      horizontal: 'center'
                    },
                    autoHideDuration: 2000,
                    TransitionComponent: Slide
                });
                setAssociationsError(err);
              }
          }
        }
    });

    return (
            <Card>
                <Box
                    pt={3}
                    pb={1}
                    sx={{
                        px: { xs: 1, md: 3 }
                    }}>
                        <form noValidate onSubmit={formik.handleSubmit}>
                            <Grid direction="row" container justifyContent="left">
                                <Grid
                                    item
                                    xs={12}
                                    >
                                    <FormControl fullWidth variant="outlined">
                                        <TextField
                                            helperText={formik.touched.address && formik.errors.address}
                                            error={Boolean(formik.touched.address && formik.errors.address)}
                                            fullWidth
                                            margin="normal"
                                            label={t('FORM.streetAddress')}
                                            name="address"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.address}
                                            variant="outlined"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    >
                                    <FormControl fullWidth variant="outlined" sx={{
                                            pr: { xs: 0, md: 1 }
                                        }}>
                                        <TextField
                                            helperText={formik.touched.town && formik.errors.town}
                                            error={Boolean(formik.touched.town && formik.errors.town)}
                                            fullWidth
                                            margin="normal"
                                            label={t('FORM.town')}
                                            name="town"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.town}
                                            variant="outlined"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    >
                                    <FormControl fullWidth variant="outlined" sx={{
                                            pr: { xs: 0, md: 1 }
                                        }}>
                                        <TextField
                                            helperText={formik.touched.postalCode && formik.errors.postalCode}
                                            error={Boolean(formik.touched.postalCode && formik.errors.postalCode)}
                                            fullWidth
                                            margin="normal"
                                            label={t('FORM.postalCode')}
                                            name="postalCode"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.postalCode}
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
                </Box>
            </Card>
    );
}

export default AddressTab;