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

import { CreateAssociation } from '../../../../services/associations';

import { i18nextAssociationDetails } from "@transitionpt/translations";

const CreateForm = ({associationPutUrl}) => {

    
    
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

    return (
        <></>
    );
}

export default CreateForm;