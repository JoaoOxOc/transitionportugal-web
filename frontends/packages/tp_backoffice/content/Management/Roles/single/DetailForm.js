import { useState, useCallback, useEffect } from 'react';
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

import { useSession } from "next-auth/react";
import { UpdateRoleData, CreateRole } from '../../../../services/roles';
import { GetScopes } from '../../../../services/scopes';

import { i18nextRoleDetails } from "@transitionpt/translations";

const DetailForm = ({roleData, rolePutUrl, isCreate}) => {
    const { t } = i18nextRoleDetails;
    const router = useRouter();
    const isMountedRef = useRefMounted();
    const { enqueueSnackbar } = useSnackbar();
    const [scopes, setScopes] = useState(null);
    const [scopesToUpdate, setScopesToUpdate] = useState(null);
    const [roleError, setRoleError] = useState(null);
    useErrorHandler(roleError);
    const { data: session, status } = useSession();

    const receiveSelectedScopes = (selectedScopes) => {
        const scopesUpdate = [];
        selectedScopes.forEach(selected => {
            scopesUpdate.push(scopes.filter((scope) => {return scope.scopeName == selected; }).map(
                (scope) => { return {"scopeId": scope.id}; }
            )[0]);
        });
        console.log(scopesUpdate)
        setScopesToUpdate(scopesUpdate);
    }

    const getScopesData = useCallback(async () => {
        const scopesSearchDataJson = {
            searchText: "",
            page: "",
            size: "",
            sort: "ScopeName",
            sortDirection: "asc"
        };
        try {
            let scopesData = await GetScopes(process.env.NEXT_PUBLIC_API_BASE_URL + "/scopes/get", scopesSearchDataJson, session.accessToken);
            if (isMountedRef()) {
              if (scopesData.scopes) {
                setScopes(scopesData.scopes);
              }
            }
          } catch (err) {
            console.error(err);
          }
    }, [isMountedRef]);

    useEffect(() => {
        if (!isCreate) {
            getScopesData();
        }
    }, [isCreate,getScopesData]);

    const initValues = {
        roleName: ''
    };

    const formik = useFormik({
        initialValues: isCreate ? initValues : roleData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            roleName: Yup.string()
                .max(70, t('MESSAGES.nameTooBig', {max: 70}))
                .required(t('MESSAGES.nameRequired'))
        }),
        onSubmit: async (values, helpers) => {
          try {
              const roleModel = {
                roleId: values.roleId,
                roleName: values.roleName,
                scopes: scopesToUpdate
              }
              console.log(roleModel)
              let result = {};
              if (isCreate) {
                  console.log(rolePutUrl)
                result = await CreateRole(rolePutUrl, roleModel, session.accessToken);
              }
              else {
                result = await UpdateRoleData(rolePutUrl, roleModel, session.accessToken);
              }
    
              if (isMountedRef()) {
                  if (result.status) {
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: result.statusText });
                    helpers.setSubmitting(false);
                    if (result.status === 404) {
                        enqueueSnackbar(t('MESSAGES.roleNotFound', {roleName: values.roleName}), {
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
                        setRoleError(result);
                    }
                  }
                  else {
                    if (isCreate) {
                        enqueueSnackbar(t('MESSAGES.roleCreatedSuccessfully', {roleName: values.roleName}), {
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
                            pathname: '/management/profiles/single/' + result.roleId,
                        });
                    }
                    else {
                        enqueueSnackbar(t('MESSAGES.roleUpdatedSuccessfully', {roleName: values.roleName}), {
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
                enqueueSnackbar(t('MESSAGES.roleGeneralError', {roleName: values.roleName}), {
                    variant: 'error',
                    anchorOrigin: {
                      vertical: 'top',
                      horizontal: 'center'
                    },
                    autoHideDuration: 2000,
                    TransitionComponent: Slide
                });
                setRoleError(err);
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
                            helperText={formik.touched.roleName && formik.errors.roleName}
                            error={Boolean(formik.touched.roleName && formik.errors.roleName)}
                            fullWidth
                            margin="normal"
                            label={t('FORM.name')}
                            name="roleName"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.roleName}
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
                    { !isCreate && scopes && roleData &&
                        <>
                            <Typography>
                                {t("FORM.scopes")}
                            </Typography>
                            <TransferList sendChoices={receiveSelectedScopes} labels={{"choiceLabel": t("FORM.choices"), "selectedLabel": t("FORM.selected") }} leftData={scopes.map((scope) => { return scope.scopeName; })} rightData={roleData.scopes.map((scope) => { return scope.scopeIdentifier; })}/>
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