import { Box, 
    Grid, 
    Button, 
    Card, 
    FormControl, 
    TextField, 
    useTheme,
    Divider,
    FormControlLabel,
    FormHelperText,
    CircularProgress 
} from '@mui/material';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import { i18nextSettingDetails } from "@transitionpt/translations";

const DetailForm = ({settingData}) => {
    const { t } = i18nextSettingDetails;

      const formik = useFormik({
        initialValues: settingData,
        enableReinitialize: true,
        // validationSchema: Yup.object({
        //   email: Yup.string()
        //     .email(t('The email provided should be a valid email address'))
        //     .max(255)
        //     .required(t('The email field is required')),
        //   name: Yup.string().max(255).required(t('The name field is required')),
        //   password: Yup.string()
        //     .min(8)
        //     .max(255)
        //     .required(t('The password field is required')),
        //   terms: Yup.boolean().oneOf(
        //     [true],
        //     t('You must agree to our terms and conditions')
        //   )
        // }),
        onSubmit: async (values, helpers) => {
          try {
            await register(values.email, values.name, values.password);
    
            if (isMountedRef()) {
              const backTo = router.query.backTo || '/';
              router.push(backTo);
            }
          } catch (err) {
            console.error(err);
    
            if (isMountedRef()) {
              helpers.setStatus({ success: false });
              helpers.setErrors({ submit: err.message });
              helpers.setSubmitting(false);
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
                        helperText={formik.touched.settingValue && formik.errors.settingValue}
                        error={Boolean(formik.touched.settingValue && formik.errors.settingValue)}
                        fullWidth
                        margin="normal"
                        label={t('FORM.value')}
                        name="settingValue"
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
                    {t('FORM.save')}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default DetailForm;