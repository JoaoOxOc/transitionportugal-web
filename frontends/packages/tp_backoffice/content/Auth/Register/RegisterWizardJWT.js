import { useState, useEffect, useRef, forwardRef, Children } from 'react';
import {
  Typography,
  Container,
  Divider,
  Button,
  Slide,
  CircularProgress,
  Grid,
  Box,
  Step,
  StepLabel,
  Stepper,
  Collapse,
  Alert,
  Avatar,
  IconButton,
  TextField as MuiTextField,
  MenuItem,
  ListItemText,
  ListItem,
  List,
  ListItemIcon,
  InputLabel,
  FormControl,
  styled
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { i18nextRegisterForm } from "@transitionpt/translations";
import Link from '../../../components/Link';
import { Field, Form, Formik, useField, withFormik, ErrorMessage } from 'formik';
import { CheckboxWithLabel, TextField, Select, Autocomplete } from 'formik-mui';
import * as Yup from 'yup';
import { IMaskMixin, IMaskInput, IMask } from 'react-imask';
import CloseIcon from '@mui/icons-material/Close';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import SummaryStep from './steps/summary';
import Modal from '../../../components/Modal';
import TermsModal from '../../../content/TermsModal';
import {GenericSelectBox,HelperTooltip} from '@transitionpt/components';
import {getOdsPtDistricts, getOdsPtCountiesByDistrict} from '@transitionpt/geolocation';


const BoxActions = styled(Box)(
    ({ theme }) => `
      background: ${theme.colors.alpha.black[5]}
  `
  );

const BoxFields = styled(Box)(
    ({ theme }) => `
    .invalid-feedback {
      color: red !important;
    }
  `
  );

const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
        background-color: ${theme.colors.success.main};
        color: ${theme.palette.success.contrastText};
        width: ${theme.spacing(12)};
        height: ${theme.spacing(12)};
        box-shadow: ${theme.colors.shadows.success};
        margin-left: auto;
        margin-right: auto;
  
        .MuiSvgIcon-root {
          font-size: ${theme.typography.pxToRem(45)};
        }
  `
  );

  const ListItemTextWrapper = styled(ListItemText)(
    ({ theme }) => `
        color: ${theme.colors.alpha.black};
  `
  );
  const ListItemIconWrapper = styled(ListItemIcon)(
    ({ theme }) => `
        color: ${theme.colors.success.main};
        min-width: 32px;
  `
  );

  const CustomInputLabel = styled(InputLabel)(
    () =>`
    label {
        position: relative !important;
        margin-top: 10px !important;
    }
    `
)

// const postalCodeMask = [
//   /[1-9]/,
//   /\d/,
//   /\d/,
//   /\d/,
//   "-",
//   /\d/,
//   /\d/,
//   /\d/
// ];

const postalCodeMask = "0000-000";

//https://github.com/uNmAnNeR/imaskjs/tree/master/packages/react-imask
//https://stackoverflow.com/questions/65441972/react-material-ui-textfield-controlled-input-with-custom-input-component-not
//https://stackoverflow.com/questions/68447169/react-formik-mui-textfield-with-custom-input-loosing-focus
//https://merictaze.com/posts/creating-a-unified-formik-input-field-to-support-all-input-types-seamlessly/
const PostalCodeMaskInput = forwardRef((props, ref) => {
  console.log(props)
  const { inputRef, field, ...rest } = props;
  return (<IMaskInput
    {...field}
    mask={postalCodeMask}
    ref={inputRef}
    unmask={true} // true|false|'typed'
    // inputRef={el => this.input = el}  // access to nested input
    // DO NOT USE onChange TO HANDLE CHANGES!
    // USE onAccept INSTEAD
    onAccept={
      // depending on prop above first argument is
      // `value` if `unmask=false`,
      // `unmaskedValue` if `unmask=true`,
      // `typedValue` if `unmask='typed'`
      (value, mask) => console.log(value)
    }
    // ...and more mask props in a guide

    // input props also available
    placeholder='Enter number here'
  />
)});
PostalCodeMaskInput.displayName = "PostalCodeMaskInput";

const formikValues = null;
const formikSetFieldValue = null;
const formikHandleChange = null;
const formikHandleBlur = null;
let associationPostalCodeValue = '';

//https://codesandbox.io/s/lingering-platform-hqh1c?file=/src/FormikTextField.js:177-565
//https://codesandbox.io/s/formik-with-custom-field-component-s90x2?file=/src/InputText.jsx:184-209
const PostalCodeCustomInput = forwardRef((props, ref) => {
  const { inputRef, onChange, onBlur,onFocus, ...other } = props;
  return (
    <IMaskInput
      {...other}
      ref={inputRef}
      mask={postalCodeMask}
      onChange={formikHandleChange}
      onBlur={formikHandleBlur}
      onFocus={(event) => {onFocus(event)}}
      disabled={false}
      // required={true}
    />
  );
});
PostalCodeCustomInput.displayName = "PostalCodeCustomInput";

const MaskedStyledTextField = IMaskMixin(({inputRef, ...props}) => {
  console.log(props)
  const [field, meta, helpers] = useField(props);
  const handleChange = name => event => {
    console.log(event.target.value)
    helpers.setValue(event.target.value, true);
  };
  const handleBlur = (evt) => {
    console.log(evt)
    if (!meta.touched) {
      helpers.setTouched(true, true);
    }
    // field.setValue({
    //   target: {
    //     name: props.name,
    //     value: evt.target.value || '',
    //   },
    // });
  };
  return (
    <>
      <MuiTextField
        {...props}
        InputProps={{
            inputComponent: PostalCodeMaskInput,
            field
        }}
      />
      {meta.touched && meta.error ? (
        <ErrorMessage name={field.name} component="div" className="invalid-feedback"/>
      ) : null}
    </>
  )
});

// TODO: terms modal get consent - https://stackoverflow.com/questions/66193822/react-bootstrap-form-check-with-formik and https://formik.org/docs/api/withFormik
export const RegisterWizardJWT = ({termsProps, associationTypes}) => {
  console.log(associationTypes)
    const { t } = i18nextRegisterForm;
    const { enqueueSnackbar } = useSnackbar();
    const [openAlert, setOpenAlert] = useState(true);
    const [userRegistered, setUserRegistered] = useState(false);
    const [termsConsented, setTermsConsented] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState({});
    const [selectedMunicipality, setSelectedMunicipality] = useState({});
    const [selectedAssociationType, setSelectedAssociationType] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setLang] = useState("pt");
    const [stateFormikValues, setFormikValues] = useState(null);
    // const [formikHandleChange, setHandleChange] = useState(() => () => console.log("formik handle change"));
    // const [formikHandleBlur, setHandleBlur] = useState(() => () => console.log("formik handle blur"));
    i18nextRegisterForm.changeLanguage(currentLang);

    useEffect(() => {
        const handleNewMessage = (event) => {
          setLang(event.detail);
        };
              
        window.addEventListener('newLang', handleNewMessage);
    }, []);

    const cacheTest = (asyncValidate) => {
      let _valid = false;
      let _value = '';
    
      return async (value) => {
        if (value !== _value) {
          const response = await asyncValidate(value);
          _value = value;
          _valid = response;
          return response;
        }
        return _valid;
      };
    };

    const checkEmailUnique = async (value) => {
      const response = await fetch(process.env.NEXT_PUBLIC_AUTH_URL + "/searchBy?searchUri=" + "/user/search-user", {
        method: 'POST',
        body: JSON.stringify({ u: value }),
        headers: { 
          "Content-Type": "application/json",
          "credentials": 'include'
        }
      });
      
      return response.ok !== true;
    }

    const checkUsernameUnique = async (value) => {
      const response = await fetch(process.env.NEXT_PUBLIC_AUTH_URL + "/searchBy?searchUri=" + "/user/search-user", {
        method: 'POST',
        body: JSON.stringify({ u: value }),
        headers: { 
          "Content-Type": "application/json",
          "credentials": 'include'
        }
      });
      
      return response.ok !== true;
    }

    const checkAssociationEmailUnique = async (value) => {
      const response = await fetch(process.env.NEXT_PUBLIC_AUTH_URL + "/searchBy?searchUri=" + "/association/search", {
        method: 'POST',
        body: JSON.stringify({ email: value }),
        headers: { 
          "Content-Type": "application/json",
          "credentials": 'include'
        }
      });

      return response.ok !== true;
    }

    const checkAssociationVatUnique = async (value) => {
      const response = await fetch(process.env.NEXT_PUBLIC_AUTH_URL + "/searchBy?searchUri=" + "/association/search", {
        method: 'POST',
        body: JSON.stringify({ vat: value }),
        headers: { 
          "Content-Type": "application/json",
          "credentials": 'include'
        }
      });

      return response.ok !== true;
    }

    const checkAssociationVatValid = async (value) => {
      const response = await fetch(process.env.NEXT_PUBLIC_AUTH_URL + "/searchBy?searchUri=" + "/association/validatevat", {
        method: 'POST',
        body: JSON.stringify({ vat: value }),
        headers: { 
          "Content-Type": "application/json",
          "credentials": 'include'
        }
      });
      return response.ok !== true;
    }

    const termsDialogJson = {
      closeLabel: t("LABELS.closeTermsDialog"),
      okReturnOption: "consented",
      showOkButton: false,
      okButton: t("LABELS.termsConsentButton"),
      showCancelButton: true,
      cancelButton: t("LABELS.termsCancelButton"),
    }

    const receiveCancelConsentAction = (eventValue) => {
      setIsOpen(false);
    }

    const receiveConsentAction = (eventValue) => {
      setTermsConsented(true);
      setIsOpen(false);
    }

    return (
        <FormikStepper
                isRegistered={userRegistered}
                initialValues={{
                  first_name: '',
                  last_name: '',
                  username: '',
                  terms: termsConsented == true ? true : false,
                  promo: true,
                  password: '',
                  password_confirm: '',
                  email: '',
                  association_name: '',
                  association_email: '',
                  association_vat: '',
                  association_type: '',
                  association_address: '',
                  association_town: '',
                  association_postalcode: '',
                  association_municipality_code: '',
                  association_district_code: '',
                  association_latitude: '',
                  association_longitude: ''
                }}
                onSubmit={async (values, helpers) => {
                  console.log(values)
                  try {
                    const registerResult = await fetch(process.env.NEXT_PUBLIC_AUTH_URL + "/register", {
                      method: 'POST',
                      body: JSON.stringify({
                        firstName: values.first_name,
                        lastName: values.last_name,
                        username: values.username,
                        email: values.email,
                        password: values.password,
                        confirmPassword: values.password_confirm,
                        termsConfirmed: values.terms,
                        associationName: values.association_name,
                        associationEmail: values.association_email,
                        associationType: values.association_type,
                        associationVat: values.association_vat,
                        associationAddress: values.association_address,
                        associationPostalCode: values.association_postalcode,
                        associationTown: values.association_town,
                        associationDistrictCode: values.association_district_code,
                        associationMunicipalityCode: values.association_municipality_code,
                    }),
                      headers: { 
                        "Content-Type": "application/json",
                        "credentials": 'include'
                      }
                    });
                    //             const registerResult = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/register", "POST", null,{
                    //     firstName: values.first_name,
                    //     lastName: values.last_name,
                    //     username: values.username,
                    //     email: values.email,
                    //     password: values.password,
                    //     confirmPassword: values.password_confirm,
                    //     termsConfirmed: values.terms,
                    //     associationName: values.association_name,
                    //     associationEmail: values.association_email,
                    //     associationVat: values.association_vat,
                    //     associationAddress: values.association_address,
                    //     associationTown: values.association_town,
                    // });
                    const registerResultParsed = await registerResult.json();
                    if (registerResultParsed.status === "Success") {
                        setUserRegistered(true);
                        helpers.setSubmitting(false);
                    }
                    else {
                        helpers.setStatus({ success: false });
                        helpers.setErrors({ submit: registerResultParsed.statusText });
                        helpers.setSubmitting(false);
                        if (registerResult.status === 403) {
                            enqueueSnackbar(t('MESSAGES.passwordComplexityError'), {
                              variant: 'error',
                              anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'center'
                              },
                              autoHideDuration: 2000,
                              TransitionComponent: Slide
                            });
                        }
                        if (registerResult.status === 500) {
                            enqueueSnackbar(t('MESSAGES.serverError'), {
                              variant: 'error',
                              anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'center'
                              },
                              autoHideDuration: 2000,
                              TransitionComponent: Slide
                            });
                        }
                        else if (registerResultParsed.statusText === "Unauthorized") {
                            setDisplayRecoverLink(true);
                            enqueueSnackbar(t('MESSAGES.tokenExpiredError'), {
                              variant: 'error',
                              anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'center'
                              },
                              autoHideDuration: 2000,
                              TransitionComponent: Slide
                            });
                        }
                        else if (registerResult.status === 409) {
                            enqueueSnackbar(t('MESSAGES.usernameAlreadyTaken'), {
                              variant: 'error',
                              anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'center'
                              },
                              autoHideDuration: 2000,
                              TransitionComponent: Slide
                            });
                        }
                    }
                  } catch (err) {
                    console.error(err);
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: err.message });
                    helpers.setSubmitting(false);
                  }
                }}
              >
                <FormikStep
                  // receiveHandleChange={(handleFunction) => {setHandleChange(() => handleFunction)}}
                  // receiveHandleBlur={(handleFunction) => {setHandleBlur(() => handleFunction)}}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .email(
                        t('MESSAGES.emailInvalid')
                      )
                      .max(100,t('MESSAGES.emailTooBig', { number: 100 }))
                      .required(t('MESSAGES.emailRequired'))
                      .test(
                        'email-backend-validation',  // Name
                        t('MESSAGES.emailAlreadyTaken'),               // Msg
                        useRef(cacheTest(checkEmailUnique)).current
                        // async (email) => {
                        //   if (email) {
                        //     const response = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/search-user", "POST", null,{ username: email, password: "t" });

                        //     return response.ok !== undefined;
                        //   }
                        //   else {
                        //     return true;
                        //   }
                        // }
                      ),
                    first_name: Yup.string()
                      .max(20, t('MESSAGES.firstNameTooBig', { number: 20 }))
                      .required(t('MESSAGES.firstNameRequired')),
                    last_name: Yup.string()
                      .max(20, t('MESSAGES.lastNameTooBig', { number: 20 }))
                      .required(t('MESSAGES.lastNameRequired')),
                    username: Yup.string()
                      .max(50, t('MESSAGES.usernameTooBig', { number: 50 }))
                      .required(t('MESSAGES.usernameRequired'))
                      .test(
                        'username-backend-validation',  // Name
                        t('MESSAGES.usernameAlreadyTaken'),               // Msg
                        useRef(cacheTest(checkUsernameUnique)).current
                      ),
                    password: Yup.string()
                      .min(8, t('MESSAGES.passwordTooSmall', { number: 8 }))
                      .max(100, t('MESSAGES.passwordTooBig', { number: 100 }))
                      .required(t('MESSAGES.passwordRequired')),
                    password_confirm: Yup.string()
                      .oneOf(
                        [Yup.ref('password')],
                        t('MESSAGES.passwordsNoMatch')
                      )
                      .required(t('MESSAGES.confirmPasswordRequired')),
                    terms: Yup.bool()
                      .oneOf([true], t('MESSAGES.termsRequired'))
                      .required(t('MESSAGES.termsRequired'))
                  })}
                  label={t('LABELS.step1Title')}
                >
                  <BoxFields p={4}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="first_name"
                          component={TextField}
                          label={t('FORMS.firstName')}
                          placeholder={t('PLACEHOLDER.firstName')}
                          aria-labelledby={ t('FORMS.firstName') } 
                          aria-describedby={ t('FORMS.firstName_help') }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="last_name"
                          component={TextField}
                          label={t('FORMS.lastName')}
                          aria-labelledby={ t('FORMS.lastName') } 
                          aria-describedby={ t('FORMS.lastName_help') }
                          placeholder={t('PLACEHOLDER.lastName')}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="email"
                          component={TextField}
                          label={t('FORMS.emailAddress')}
                          aria-labelledby={ t('FORMS.emailAddress') } 
                          aria-describedby={ t('FORMS.emailAddress_help') }
                          placeholder={t('PLACEHOLDER.emailAddress')}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="username"
                          type="text"
                          component={TextField}
                          label={t('FORMS.username')}
                          aria-labelledby={ t('FORMS.username') } 
                          aria-describedby={ t('FORMS.username_help') }
                          placeholder={t('PLACEHOLDER.username')}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{
                            pb: 0
                          }}>
                        <List
                          dense
                          sx={{
                            mb: 0
                          }}
                        >
                          <ListItem disableGutters>
                            <ListItemIconWrapper>
                              <CheckCircleOutlineTwoToneIcon />
                            </ListItemIconWrapper>
                            <ListItemTextWrapper
                              primaryTypographyProps={{ variant: 'h6' }}
                              primary={t('FORMS.passwordRule1')}
                            />
                          </ListItem>
                          <ListItem disableGutters>
                            <ListItemIconWrapper>
                              <CheckCircleOutlineTwoToneIcon />
                            </ListItemIconWrapper>
                            <ListItemTextWrapper
                              primaryTypographyProps={{ variant: 'h6' }}
                              primary={t('FORMS.passwordRule2')}
                            />
                          </ListItem>
                          <ListItem disableGutters>
                            <ListItemIconWrapper>
                              <CheckCircleOutlineTwoToneIcon />
                            </ListItemIconWrapper>
                            <ListItemTextWrapper
                              primaryTypographyProps={{ variant: 'h6' }}
                              primary={t('FORMS.passwordRule3')}
                            />
                          </ListItem>
                        </List>
                      </Grid>
                      <Grid item xs={12} md={6} sx={{
                            pt: { xs: '10px !important', md: '10px !important' },
                            pl: 4
                          }}>
                        <Field
                          fullWidth
                          type="password"
                          name="password"
                          component={TextField}
                          label={t('FORMS.password')}
                          aria-labelledby={ t('FORMS.password') } 
                          aria-describedby={ t('FORMS.password_help') }
                          placeholder={t('PLACEHOLDER.password')}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} sx={{
                            pt: { xs: '10px !important', md: '10px !important' },
                            pl: 4
                          }}>
                        <Field
                          fullWidth
                          type="password"
                          name="password_confirm"
                          component={TextField}
                          label={t('FORMS.confirmPassword')}
                          aria-labelledby={ t('FORMS.confirmPassword') } 
                          aria-describedby={ t('FORMS.confirmPassword_help') }
                          placeholder={t('PLACEHOLDER.confirmPassword')}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        {/* <Field
                          name="promo"
                          type="checkbox"
                          component={CheckboxWithLabel}
                          Label={{
                            label: t(
                              'Yes, I want to receive monthly promotional materials.'
                            )
                          }}
                        />
                        <br /> */}
                        <Field
                          name="terms"
                          type="checkbox"
                          component={CheckboxWithLabel}
                          aria-labelledby={ t('FORMS.confirmTerms') } 
                          aria-describedby={ t('FORMS.confirmTerms_help') }
                          onChange={e => formikSetFieldValue('terms', e.target.checked)}
                          Label={{
                            label: (
                              <>
                                <Typography variant="body2">
                                  {t('LABELS.accept')}{' '}
                                  <Link href="#" onClick={() => setIsOpen(true)} aria-label={ t('FORMS.confirmTermsPopup') } >{t('LABELS.terms')}</Link>.
                                </Typography>
                                <ErrorMessage name="terms" component="div" className="invalid-feedback" />
                              </>
                            )
                          }}
                        />
                      </Grid>
                    </Grid>
                  </BoxFields>
                  {termsProps.terms && isOpen && <Modal dialogOkAction={receiveConsentAction} dialogCancelAction={receiveCancelConsentAction} dialogJson={termsDialogJson} setIsOpen={isOpen}><TermsModal termsLanguages={termsProps.terms.termsLanguages}/></Modal>}
                </FormikStep>
                <FormikStep
                  validationSchema={Yup.object().shape({
                    association_name: Yup.string()
                      .max(50,t('MESSAGES.associationNameTooBig', { number: 50 }))
                      .required(t('MESSAGES.associationNameRequired')),
                      association_email: Yup.string()
                      .email(t('MESSAGES.associationEmailInvalid'))
                      .max(100,t('MESSAGES.associationEmailTooBig', { number: 100 }))
                      .required(t('MESSAGES.associationEmailRequired'))
                      .test(
                        'association-email-backend-validation',  // Name
                        t('MESSAGES.associationEmailAlreadyTaken'),               // Msg
                        useRef(cacheTest(checkAssociationEmailUnique)).current
                        
                      ),
                      association_vat: Yup.string()
                      .max(20,t('MESSAGES.associationVatTooBig', { number: 20 }))
                      .test(
                        'association-vat-exists',  // Name
                        t('MESSAGES.associationVatAlreadyTaken'),               // Msg
                        useRef(cacheTest(checkAssociationVatUnique)).current
                        
                      )
                      .test(
                        'association-vat-backend-validation',  // Name
                        t('MESSAGES.associationVatInvalid'),               // Msg
                        useRef(cacheTest(checkAssociationVatValid)).current
                        
                      ),
                      // association_type: Yup.string()
                      // .required(t('MESSAGES.associationTypeRequired')),
                      association_address: Yup.string()
                      .max(100,t('MESSAGES.associationAddressTooBig', { number: 100 })),
                      association_postalcode: Yup.string()
                      .max(10,t('MESSAGES.associationPostalCodeTooBig', { number: 10 }))
                      .required(t('MESSAGES.associationPostalCodeRequired')),
                      association_town: Yup.string()
                      .max(50,t('MESSAGES.associationTownTooBig', { number: 50 }))
                      .required(t('MESSAGES.associationTownRequired')),
                      association_municipality_code: Yup.string()
                      .required(t('MESSAGES.associationMunicipalityRequired')),
                      association_district_code: Yup.string()
                      .required(t('MESSAGES.associationDistrictRequired'))
                      
                  })}
                  label={t('LABELS.step2Title')}
                >
                  <Box p={4}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="association_name"
                          component={TextField}
                          label={t('FORMS.associationName')}
                          aria-labelledby={ t('FORMS.associationName') } 
                          aria-describedby={ t('FORMS.associationName_help') }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="association_email"
                          type="email"
                          component={TextField}
                          label={t('FORMS.associationEmail')}
                          aria-labelledby={ t('FORMS.associationEmail') } 
                          aria-describedby={ t('FORMS.associationEmail_help') }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl sx={{width: '100%'}}>
                          <Grid container>
                            <Grid item xs={11}>
                              <InputLabel id="association-type-label">{t('FORMS.associationType')}</InputLabel>
                              <Field
                                placeholder={t("PLACEHOLDER.associationType")}
                                name="association_type"
                                fullWidth
                                required={true}
                                component={GenericSelectBox}
                                aria-labelledby={ t('FORMS.associationType') } 
                                aria-describedby={ t('FORMS.associationType_help') }>
                                {associationTypes && !associationTypes.associationTypesError && associationTypes.map((type, index) => {
                                  <MenuItem key={index} value={type.code}>{type.name}</MenuItem>
                                })
                                }
                              </Field>
                            </Grid>
                            <Grid item xs={1}
                              sx={{pt: '7px'}}>
                              <HelperTooltip tooltipAriaLabel={t('FORMS.associationTypeHelpTooltip')} tooltipText={t('FORMS.associationTypeHelpTooltipText')}/>
                            </Grid>
                          </Grid>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="association_vat"
                          component={TextField}
                          label={t('FORMS.associationVat')}
                          aria-labelledby={ t('FORMS.associationVat') } 
                          aria-describedby={ t('FORMS.associationVat_help') }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="h4"
                          sx={{
                            lineHeight: 1.5,
                            px: 4

                          }}
                        >
                          {t("FORMS.geolocationTitle")}
                        </Typography>
                        <Typography
                          variant="h4"
                          color="text.secondary"
                          fontWeight="normal"
                          sx={{
                            lineHeight: 1.5,
                            px: 4

                          }}
                        >
                          {t("FORMS.geolocationSubtitle")}
                        </Typography>
                        <Divider/>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="association_address"
                          component={TextField}
                          label={t('FORMS.associationAddress')}
                          aria-labelledby={ t('FORMS.associationAddress') } 
                          aria-describedby={ t('FORMS.associationAddress_help') }
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Field fullWidth
                            component={TextField}
                            name="association_postalcode"
                            placeholder={t('FORMS.associationPostalCode')}
                            label={t('FORMS.associationPostalCode')}
                            aria-labelledby={ t('FORMS.associationPostalCode') } 
                            aria-describedby={ t('FORMS.associationPostalCode_help') }
                            onChange={formikHandleChange}
                            onBlur={formikHandleBlur}
                            InputProps={{ inputComponent: PostalCodeCustomInput }}>
                        </Field>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Field
                          fullWidth
                          name="association_town"
                          component={TextField}
                          label={t('FORMS.associationTown')}
                          aria-labelledby={ t('FORMS.associationTown') } 
                          aria-describedby={ t('FORMS.associationTown_help') }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl sx={{width: '100%'}}>
                          <InputLabel id="association-district-label">{t('FORMS.associationDistrict')}</InputLabel>
                          <Field
                            name="association_district_code"
                            fullWidth
                            required={true}
                            // component={GenericSelectBox}
                            aria-labelledby={ t('FORMS.associationDistrict') } 
                            aria-describedby={ t('FORMS.associationDistrict_help') }>
                              {({
                                field, // { name, value, onChange, onBlur }
                                form,
                                form: { touched, errors, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                meta,
                              }) => {
                                return (
                                  <>
                                    <GenericSelectBox 
                                        placeholder={t("PLACEHOLDER.associationDistrict")}
                                        field={field} form={form} 
                                        fieldDependentOf={"association_municipality_code"}
                                        fieldDependentOfValue={""}
                                        sendSelected={(value,label) => {setSelectedDistrict({code: value, label: label});}}>
                                      {getOdsPtDistricts().map((type, index) => (
                                        <MenuItem key={index} value={type.district_code}>{type.distrito}</MenuItem>
                                      ))
                                      }
                                    </GenericSelectBox>
                                    {meta.touched && meta.error ? (
                                      <ErrorMessage name="association_district_code" component="div" className="invalid-feedback">{ msg => <div style={{ color: 'red', lineWeight: '800' }}>{msg}</div> }</ErrorMessage>
                                    ) : null}
                                  </>
                              )}}
                            {/* <MenuItem value="">{t("PLACEHOLDER.associationDistrict")}</MenuItem>
                            {getOdsPtDistricts().map((type, index) => (
                              <MenuItem key={index} value={type.district_code}>{type.distrito}</MenuItem>
                            ))
                            } */}
                          </Field>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl sx={{width: '100%'}}>
                          <InputLabel id="association-municipality-label">{t('FORMS.associationMunicipality')}</InputLabel>
                          <Field
                            name="association_municipality_code"
                            fullWidth
                            required={true}
                            aria-labelledby={ t('FORMS.associationMunicipality') } 
                            aria-describedby={ t('FORMS.associationMunicipality_help') }>
                              {({
                                field, // { name, value, onChange, onBlur }
                                form,
                                form: { touched, errors, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                meta,
                              }) => {
                                return (
                                  <>
                                    <GenericSelectBox 
                                        placeholder={t("PLACEHOLDER.associationMunicipality")}
                                        field={field} form={form}
                                        sendSelected={(value,label) => setSelectedMunicipality({code: value, label: label})}>
                                      {selectedDistrict.code && getOdsPtCountiesByDistrict(values.association_district_code).map((type, index) => (
                                        <MenuItem key={index} value={type.municipality_code}>{type.concelho}</MenuItem>
                                      ))
                                      }
                                    </GenericSelectBox>
                                    {meta.touched && meta.error ? (
                                      <ErrorMessage name="association_municipality_code" component="div" className="invalid-feedback">{ msg => <div style={{ color: 'red', lineWeight: '800' }}>{msg}</div> }</ErrorMessage>
                                    ) : null}
                                  </>
                              )}}
                          </Field>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                </FormikStep>
                <FormikStep 
                   receiveFormValues={(values) => { setFormikValues(values); }}
                   label={t('LABELS.step3Title')}>
                     {stateFormikValues &&
                      <SummaryStep values={stateFormikValues} districtSelected={selectedDistrict} municipalitySelected={selectedMunicipality} associationTypeSelected={selectedAssociationType}/>
                     }
                </FormikStep>
                <FormikStep label={t('LABELS.step4Title')}>
                  {userRegistered == true &&
                    <Box px={4} py={8}>
                      <Container maxWidth="sm">
                        <AvatarSuccess>
                          <CheckTwoToneIcon />
                        </AvatarSuccess>
                        <Collapse in={openAlert}>
                          <Alert
                            sx={{
                              mt: 5
                            }}
                            action={
                              <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                  setOpenAlert(false);
                                }}
                              >
                                <CloseIcon fontSize="inherit" />
                              </IconButton>
                            }
                            severity="info"
                          >
                            {t(
                              'MESSAGES.confirmationEmailSent'
                            )}
                          </Alert>
                        </Collapse>

                        <Typography
                          align="center"
                          sx={{
                            pt: 5,
                            pb: 4,
                            lineHeight: 1.5,
                            px: 10
                          }}
                          variant="h3"
                        >
                          {t(
                            'MESSAGES.successfulMessage'
                          )}
                        </Typography>

                        <Button
                          fullWidth 
                          variant="contained"
                          aria-label={ t('LABELS.buttonToLogin') }
                          href={'/auth/login/cover'}>
                          {t('LABELS.goLogIn')}
                        </Button>
                      </Container>
                    </Box>
                    }
                </FormikStep>
              </FormikStepper>
    );
}



export function FormikStep({ children }) {
    return <>{children}</>;
  }
  
  export function FormikStepper({ children, isRegistered, ...props }) {
    const childrenArray = Children.toArray(children);
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];
    const [completed, setCompleted] = useState(false);
    const { t } = i18nextRegisterForm;

    function isLastStep() {
      return step === childrenArray.length - 2;
    }

    if (completed == false && isRegistered == true) {
      setCompleted(true);
      setStep((s) => s + 1);
    }
  
    return (
      <Formik
        {...props}
        validationSchema={currentChild.props.validationSchema}
        validateOnChange={false}
        onSubmit={async (values, helpers) => {
          if (isLastStep()) {
              await props.onSubmit(values, helpers);
          } else {
            setStep((s) => s + 1);
            helpers.setTouched({});
          }
        }}
      >
        {({ values, isSubmitting, setFieldValue, handleChange, handleBlur }) => {
          formikValues = values;
          formikSetFieldValue = setFieldValue;
          formikHandleChange = handleChange;
          formikHandleBlur = handleBlur;
          if (currentChild.props.receiveFormValues) {
            currentChild.props.receiveFormValues(values);
          }
          // currentChild.props.receiveHandleChange(handleChange);
          // currentChild.props.receiveHandleBlur(handleBlur);
          return (
          <Form autoComplete="off">
            <Stepper alternativeLabel activeStep={step}>
              {childrenArray.map((child, index) => (
                <Step
                  key={child.props.label}
                  completed={step > index || completed}
                >
                  <StepLabel>{child.props.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
  
            {currentChild}
            {!completed ? (
              <BoxActions
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Button
                  disabled={isSubmitting || step === 0}
                  variant="outlined"
                  color="primary"
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                >
                  {t('LABELS.previous')}
                </Button>
  
                <Button
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {isSubmitting
                    ? t('LABELS.submitting')
                    : isLastStep()
                    ? t('LABELS.completeRegist')
                    : t('LABELS.nextStep')}
                </Button>
              </BoxActions>
            ) : null}
          </Form>
        );}
        } 
      </Formik>
    );
  }