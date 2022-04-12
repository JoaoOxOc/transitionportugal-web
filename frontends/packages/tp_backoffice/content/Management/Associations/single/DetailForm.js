import { useState } from 'react';
import { 
    Grid, 
    Button, 
    FormControl, 
    TextField, 
    Slide,
    Divider,
    Tabs,
    Tab,
    FormControlLabel,
    FormHelperText,
    CircularProgress,
    styled
} from '@mui/material';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useErrorHandler } from 'react-error-boundary';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useRefMounted } from '../../../../hooks/useRefMounted';

import { UpdateAssociationData } from '../../../../services/associations';

import { i18nextAssociationDetails } from "@transitionpt/translations";

import MainTab from './MainTab';
import AddressTab from './AddressTab';
import UsersTab from './UsersTab';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

const DetailForm = ({associationData, associationPutUrl}) => {
    const { t } = i18nextAssociationDetails;
    const router = useRouter();
    const isMountedRef = useRefMounted();
    const { enqueueSnackbar } = useSnackbar();
    const [currentTab, setCurrentTab] = useState('main');
    const [associationsError, setAssociationsError] = useState(null);
    useErrorHandler(associationsError);

    const formik = useFormik({
        initialValues: associationData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            description: Yup.string()
                .max(255, t('MESSAGES.descriptionTooBig', {max: 255}))
                .required(t('MESSAGES.descriptionRequired')),
            name: Yup.string()
                .max(70, t('MESSAGES.nameTooBig', {max: 70}))
                .required(t('MESSAGES.nameRequired'))
        }),
        onSubmit: async (values, helpers) => {
          try {
              const associationModel = {
                    name: values.name,
                    description: values.description,
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

      const tabs = [
        { value: 'main', label: t('TABS.main') },
        { value: 'address', label: t('TABS.address') },
        { value: 'users', label: t('TABS.users') }
      ];
  
      const handleTabsChange = (_event, value) => {
        setCurrentTab(value);
      };

    return (
        <form noValidate onSubmit={formik.handleSubmit}>
            <Grid direction="column" container justifyContent="center">
                <Grid item xs={12}>
                    <TabsWrapper
                    onChange={handleTabsChange}
                    value={currentTab}
                    variant="scrollable"
                    scrollButtons="auto"
                    textColor="primary"
                    indicatorColor="primary"
                    >
                    {tabs.map((tab) => (
                        <Tab key={tab.value} label={tab.label} value={tab.value} />
                    ))}
                    </TabsWrapper>
                </Grid>
                <Grid item xs={12}>
                    {currentTab === 'main' && <MainTab associationPutUrl={associationPutUrl}/>}
                    {currentTab === 'address' && <AddressTab associationPutUrl={associationPutUrl}/>}
                    {currentTab === 'users' && <UsersTab />}
                </Grid>
            </Grid>
        </form>
    );
}

export default DetailForm;