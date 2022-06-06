import { useState, useEffect, useRef, forwardRef, Children } from 'react';
import {
  Typography,
  Divider,
  Container,
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

const SummaryStep = ({values, districtSelected, municipalitySelected, associationTypeSelected}) => {
  console.log(values,districtSelected, municipalitySelected, associationTypeSelected)
    const { t } = i18nextRegisterForm;

    return (
        <Box px={1} py={1}>
          <Container >

            <Typography
              align="left"
              sx={{
                pt: 5,
                lineHeight: 1.5,
                px: 4
              }}
              variant="h4"
            >
              {t(
                'FORMS.mainUserData'
              )}
            </Typography>
            <Divider/>
            <Typography
              sx={{
                pt: 1,
                px: 6
              }}
              variant="subtitle2"
            >
              {values.first_name + " " + values.last_name} (<b>{t("FORMS.username") + ": "}{values.username}</b>)
            </Typography>
            <Typography
              sx={{
                pt: 1,
                px: 6
              }}
              variant="subtitle2"
            >
              {t("FORMS.emailAddress") + ": " + values.email}
            </Typography>
            <Typography
              align="left"
              sx={{
                pt: 5,
                lineHeight: 1.5,
                px: 4
              }}
              variant="h4"
            >
              {t(
                'LABELS.step2Title'
              )}
            </Typography>
            <Divider/>
            <Typography
              sx={{
                pt: 1,
                px: 6
              }}
              variant="subtitle2"
            >
              {values.association_name} (<b>{t("FORMS.emailAddress") + ": "}{values.association_email}</b>)
            </Typography>
            <Typography
              sx={{
                pt: 1,
                px: 6
              }}
              variant="subtitle2"
            >
              {t("FORMS.associationType") + ": "}{values.association_type} (<b>{t("FORMS.associationVat") + ": "}{values.association_vat ? values.association_vat : "N/D"}</b>)
            </Typography>
            <Typography
              align="left"
              sx={{
                pt: 5,
                lineHeight: 1.5,
                px: 4
              }}
              variant="h4"
            >
              {t(
                'FORMS.associationLocation'
              )}
            </Typography>
            <Divider/>
            <Typography
              sx={{
                pt: 1,
                px: 6
              }}
              variant="subtitle2"
            >
              {t("FORMS.associationMunicipality") + ": " + (values.association_municipality_code ? municipalitySelected.label : "") + "  " + t("FORMS.associationDistrict") + ": " + (values.association_district_code ? districtSelected.label : "")}
            </Typography>
            <Typography
              sx={{
                pt: 1,
                px: 6
              }}
              variant="subtitle2"
            >
              {t("FORMS.address") + ": " + values.association_address + " " + values.association_postalcode + " " + values.association_town}
            </Typography>
          </Container>
        </Box>
    );
}

export default SummaryStep;