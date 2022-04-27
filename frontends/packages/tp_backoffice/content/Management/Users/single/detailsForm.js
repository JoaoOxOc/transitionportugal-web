import { useState } from 'react';
import { 
    Grid, 
    Card,
    Box,
    Typography,
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

import { UpdateUserData } from '../../../../services/users';

import { i18nextUserDetails } from "@transitionpt/translations";

function UserDetailsForm({userData, userPutUrl, edittingCard, cancelEditting}) {
    const { t } = i18nextUserDetails;
    const isMountedRef = useRefMounted();
    const { enqueueSnackbar } = useSnackbar();
    const [userError, setUserError] = useState(null);
    useErrorHandler(userError);

    const formik = useFormik({
        initialValues: userData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string()
                .max(70, t('MESSAGES.nameTooBig', {max: 70}))
                .required(t('MESSAGES.nameRequired')),
            userName: Yup.string()
                .max(20, t('MESSAGES.usernameTooBig', {max: 20}))
                .required(t('MESSAGES.usernameRequired')),
            email: Yup.string()
                .max(100, t('MESSAGES.emailTooBig', {max: 100}))
                .email(t('MESSAGES.emailInvalid'))
                .required(t('MESSAGES.emailRequired')),
            phone: Yup.string()
                .max(20, t('MESSAGES.phoneNumberTooBig', {max: 20})),
        }),
        onSubmit: async (values, helpers) => {
          try {
              const userUpdateModel = {
                userId: values.id,
                name: values.name,
                email: values.email,
                phone: values.phone
              }
              console.log(userUpdateModel)
              const result = await UpdateUserData(userPutUrl, userUpdateModel);
    
              if (isMountedRef()) {
                  if (result.status) {
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: result.statusText });
                    helpers.setSubmitting(false);
                    if (result.status === 404) {
                        enqueueSnackbar(t('MESSAGES.userNotFound', {userName: values.name}), {
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
                        setUserError(result);
                    }
                  }
                  else {
                    enqueueSnackbar(t('MESSAGES.userUpdatedSuccessfully', {userName: values.name}), {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center'
                        },
                        autoHideDuration: 2000,
                        TransitionComponent: Slide
                    });
                    helpers.setSubmitting(false);
                    cancelEditting(userUpdateModel);
                  }
              }
          } catch (err) {
              console.error(err);
    
              if (isMountedRef()) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
                enqueueSnackbar(t('MESSAGES.userGeneralError', {userName: values.name}), {
                    variant: 'error',
                    anchorOrigin: {
                      vertical: 'top',
                      horizontal: 'center'
                    },
                    autoHideDuration: 2000,
                    TransitionComponent: Slide
                });
                setUserError(err);
              }
          }
        }
    });

    return (
        <Typography variant="subtitle2">      
            <form noValidate onSubmit={formik.handleSubmit}>
                <Grid container direction="column" spacing={3}>
                    {edittingCard == "personalDetails" &&
                        <>
                            {/* <Grid item xs={0} md={3}></Grid> */}
                            <Grid item xs={12} md={3} textAlign={{ sm: 'right' }}>
                                <Box pr={3} pb={2}>
                                    <FormControl fullWidth variant="outlined">
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
                                </Box>
                            </Grid>
                        </>
                    }
                    {edittingCard == "contacts" &&
                        <>
                            {/* <Grid item xs={0} md={3}></Grid> */}
                            <Grid item xs={12} md={3} textAlign={{ sm: 'right' }}>
                                <Box pr={3}>
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
                                </Box>
                            </Grid>
                            {/* <Grid item xs={0} md={3}></Grid> */}
                            <Grid item xs={12} md={3} textAlign={{ sm: 'right' }}>
                                <Box pr={3} pb={2} >
                                    <FormControl fullWidth variant="outlined">
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
                                </Box>
                            </Grid>
                        </>
                    }
                    <Grid
                        container
                        direction="row"
                        spacing={3}
                    >
                        <Grid item xs={0} md={3}></Grid>
                        <Grid item xs={12} md={9}>
                            <Divider />
                            <Button
                                sx={{
                                    mt: 3,
                                    maxWidth: '200px !important'
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
                            &nbsp;
                            <Button
                                sx={{
                                    mt: 3,
                                    maxWidth: '200px !important'
                                }}
                                color="secondary"
                                startIcon={
                                    formik.isSubmitting ? <CircularProgress size="1rem" /> : null
                                }
                                disabled={formik.isSubmitting}
                                onClick={cancelEditting}
                                type="submit"
                                fullWidth
                                size="large"
                                variant="contained"
                                >
                                {t('FORM.cancelButton')}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Typography>
    );
}

export default UserDetailsForm;