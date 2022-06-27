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
import { useSession } from "next-auth/react";
import { UpdateAssociationData } from '../../../../services/associations';

import { i18nextAssociationDetails } from "@transitionpt/translations";

function MainTab({associationPutUrl, associationData}) {
    const { t } = i18nextAssociationDetails;
    const isMountedRef = useRefMounted();
    const { enqueueSnackbar } = useSnackbar();
    const [associationsError, setAssociationsError] = useState(null);
    useErrorHandler(associationsError);
    const { data: session, status } = useSession();

    const formik = useFormik({
        initialValues: associationData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            description: Yup.string()
                .max(255, t('MESSAGES.descriptionTooBig', {max: 255})),
            name: Yup.string()
                .max(70, t('MESSAGES.nameTooBig', {max: 70}))
                .required(t('MESSAGES.nameRequired')),
            email: Yup.string()
                .max(100, t('MESSAGES.emailTooBig', {max: 100}))
                .email(t('MESSAGES.emailInvalid'))
                .required(t('MESSAGES.emailRequired')),
            phone: Yup.string()
                .max(20, t('MESSAGES.phoneNumberTooBig', {max: 20})),
            vat: Yup.string()
                .max(20, t('MESSAGES.vatTooBig', {max: 20})),
            website: Yup.string()
                .max(255, t('MESSAGES.websiteTooBig', {max: 255})),
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
                    postalCode: "",
                    districtCode: "",
                    municipalityCode: ""
              }
              console.log(associationModel)
              const result = await UpdateAssociationData(associationPutUrl, associationModel, session.accessToken);
    
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
                                    md={6}
                                    >
                                    <FormControl fullWidth variant="outlined" sx={{
                                            pr: { xs: 0, md: 1 }
                                        }}>
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
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    >
                                    <FormControl fullWidth variant="outlined">
                                        <TextField
                                            helperText={formik.touched.email && formik.errors.email}
                                            error={Boolean(formik.touched.email && formik.errors.email)}
                                            fullWidth
                                            margin="normal"
                                            label={t('FORM.email')}
                                            name="email"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
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
                                            helperText={formik.touched.phone && formik.errors.phone}
                                            error={Boolean(formik.touched.phone && formik.errors.phone)}
                                            fullWidth
                                            margin="normal"
                                            label={t('FORM.phone')}
                                            name="phone"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.phone}
                                            variant="outlined"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
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
                                    item
                                    xs={12}
                                    md={6}
                                    >
                                    <FormControl fullWidth variant="outlined" sx={{
                                            pr: { xs: 0, md: 1 }
                                        }}>
                                        <TextField
                                            helperText={formik.touched.vat && formik.errors.vat}
                                            error={Boolean(formik.touched.vat && formik.errors.vat)}
                                            fullWidth
                                            margin="normal"
                                            label={t('FORM.vat')}
                                            name="vat"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.vat}
                                            variant="outlined"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    >
                                    <FormControl fullWidth variant="outlined">
                                        <TextField
                                            helperText={formik.touched.website && formik.errors.website}
                                            error={Boolean(formik.touched.website && formik.errors.website)}
                                            fullWidth
                                            margin="normal"
                                            label={t('FORM.website')}
                                            name="website"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.website}
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

export default MainTab;