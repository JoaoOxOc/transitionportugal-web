import React, { useState } from 'react';
import * as Yup from 'yup';
import { Field, useFormik, Formik, ErrorMessage } from 'formik';
import {
    Box,
    Button,
    FormHelperText,
    TextField,
    Grid,
    Checkbox,
    Typography,
    FormControlLabel,
    CircularProgress
  } from '@material-ui/core';
  import {Alert} from '@material-ui/lab';
  import { i18nextContacts } from "@transitionpt/translations";
import { ContactStyles as styles } from './contact.style';

export default function ContactForm({contactComponentObject}) {
    const { t } = i18nextContacts;
    const [messageSent, setMessageSent] = useState(false);
    const [messageSentError, setMessageSentError] = useState('');

    const messageSendError = ({ error }) => {
      return (
        <>
          <Alert
            sx={{
              mb: 1
            }}
            severity="error"
            aria-label={ t('MESSAGES.messageSentErrorResult') }
          >
            <span>{t('MESSAGES.messageSentError')}</span>
          </Alert>
        </>
      );
    };

    const messageSentLabel = () => {
      return (
        <>
          <Alert
            sx={{
              mb: 1
            }}
            severity="success"
            aria-label={ t('MESSAGES.messageSentResult') }
          >
            <span>{t('MESSAGES.messageSent')}</span>
          </Alert>
        </>
      );
    };

    const formik = useFormik({
        initialValues: {
          fromPhone: '',
          fromEmail: '',
          fromName: '',
          messageSubject: '',
          messageBody: '',
          submit: null
        },
        validationSchema: Yup.object({
          fromEmail: Yup.string()
            .email(t('MESSAGES.fromEmailInvalid'))
            .max(255)
            .required(t('MESSAGES.fromEmailRequired')),
          fromName: Yup.string()
            .max(255)
            .required(t('MESSAGES.fromNameRequired')),
          messageSubject: Yup.string()
            .max(255)
            .required(t('MESSAGES.messageSubjectRequired')),
          messageBody: Yup.string()
            .max(5000)
            .required(t('MESSAGES.messageBodyRequired'))
        }),
        onSubmit: async (values, helpers) => {
          if (values.fromPhone.length != 0) {
            return null;
          }
          //helpers.validateForm(values).then((e) => {helpers.setSubmitting(true); contactUsFormElement.current.submit(values);})
          // console.log(helpers);
          helpers.setSubmitting(true);
          const emailSent = await fetch(process.env.NEXT_PUBLIC_HOME_BASE_URL + "/api/contactUsAction", {
            method: 'POST',
            body: JSON.stringify({ messageData: values }),
            headers: { 
              "Content-Type": "application/json",
              "credentials": 'include'
            }
          });
          const emailSentParsed = await emailSent.json();
          console.log(emailSentParsed, emailSent);
          if (emailSent.status != 200) {
            setMessageSentError('errorMessage');
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: emailSent.error });
            helpers.setSubmitting(false);
          }
          else {
            helpers.setStatus({ success: true });
            helpers.setErrors({ submit: null });
            formik.resetForm();
            setMessageSent(true);
          }
        }
      });

    return (
      <>
        <form key="contactUsFormElement" onSubmit={formik.handleSubmit} method="POST">
          
          <TextField
              style={{
                display: 'none'
              }}
              InputProps={{
                style: {display: 'none'}
              }}
              fullWidth
              name="fromPhone"
              label={t('FORMS.fromPhone')}
              aria-labelledby={ t('FORMS.fromPhone') } 
              aria-describedby={ t('FORMS.fromPhone_help') }
            />
          <TextField
            error={Boolean(formik.touched.fromEmail && formik.errors.fromEmail)}
            fullWidth
            margin="normal"
            helperText={formik.touched.fromEmail && formik.errors.fromEmail}
            label={t('FORMS.emailFrom')}
            aria-labelledby={ t('FORMS.emailFrom') }
            aria-describedby={ t('FORMS.emailFrom_help') }
            name="fromEmail"
            placeholder='email'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.fromEmail}
          />
          <TextField
            error={Boolean(formik.touched.fromName && formik.errors.fromName)}
            fullWidth
            margin="normal"
            helperText={formik.touched.fromName && formik.errors.fromName}
            label={t('FORMS.fromName')}
            aria-labelledby={ t('FORMS.fromName') }
            aria-describedby={ t('FORMS.fromName_help') }
            name="fromName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.fromName}
          />
          <TextField
            error={Boolean(formik.touched.messageSubject && formik.errors.messageSubject)}
            fullWidth
            margin="normal"
            helperText={formik.touched.messageSubject && formik.errors.messageSubject}
            label={t('FORMS.messageSubject')}
            aria-labelledby={ t('FORMS.messageSubject') }
            aria-describedby={ t('FORMS.messageSubject_help') }
            name="messageSubject"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.messageSubject}
          />
          <TextField
            error={Boolean(formik.touched.messageBody && formik.errors.messageBody)}
            fullWidth
            multiline
            minRows={4}
            maxRows={8}
            margin="normal"
            helperText={formik.touched.messageBody && formik.errors.messageBody}
            label={t('FORMS.messageBody')}
            aria-labelledby={ t('FORMS.messageBody') }
            aria-describedby={ t('FORMS.messageBody_help') }
            name="messageBody"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.messageBody}
            variant="outlined"
          />
          {messageSentError && messageSentError != '' && 
            messageSendError(messageSentError)
          }
          {messageSent && 
            messageSentLabel()
          }

          <Button
            sx={{
              mt: 3
            }}
            color="primary"
            startIcon={
              formik.isSubmitting ? <CircularProgress size="1rem" /> : null
            }
            disabled={formik.isSubmitting}
            aria-describedby={ t('FORMS.submit_help') }
            type="submit"
            fullWidth
            size="large"
            variant="contained"
          >
            {t('FORMS.sendButton')}
          </Button>
        </form>
      </>
    )
}