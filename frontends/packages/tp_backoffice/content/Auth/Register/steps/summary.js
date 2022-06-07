import { useState, useEffect, useRef, forwardRef, Children } from 'react';
import {
  Typography,
  Divider,
  Container,
  Box,
  Alert
} from '@mui/material';
import { i18nextRegisterForm } from "@transitionpt/translations";
import ShareLocationTwoToneIcon from '@mui/icons-material/ShareLocationTwoTone';
import HomeWorkTwoToneIcon from '@mui/icons-material/HomeWorkTwoTone';
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';

import dynamic from "next/dynamic";
const MapDynamic = dynamic(() => import("@transitionpt/components/src/components/BaseMap/index"), {ssr: false});
import {hereGeolocator} from '@transitionpt/geolocation';

const SummaryStep = ({values, districtSelected, municipalitySelected, associationTypeSelected}) => {
  const [associationLatitude, setAssociationLatitude] = useState('');
  const [associationLongitude, setAssociationLongitude] = useState('');
  const { t } = i18nextRegisterForm;
  // TODO: pass dynamic address data and get here apikey from somewhere
    hereGeolocator({
      houseNumber: 22,
      street: "Sá Carneiro",
      postalCode: '3660',
      town: 'São Pedro do Sul',
      city: 'São Pedro do Sul',
      county: 'Viseu',
      country: 'Portugal'
    },
    "").then(result => {
      if (result && result.IsError === false) {
        setAssociationLatitude(result.Latitude);
        setAssociationLongitude(result.Longitude);
      }
    });
    
    values.association_latitude = associationLatitude;
    values.association_longitude = associationLongitude;
    console.log(values,associationTypeSelected);

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
              <AssignmentIndTwoToneIcon fontSize="medium" />{t(
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
              <HomeWorkTwoToneIcon fontSize="medium" />{t(
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
              <ShareLocationTwoToneIcon fontSize="medium" />{t(
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
            {values.association_latitude && values.association_longitude &&
              <>
                <div 
                  style={{position: 'relative',
                  width: '100%',
                  height: '400px',}}>
                    <MapDynamic data={[{lat: values.association_latitude, long: values.association_longitude, marker:{title: values.association_name, info: values.association_address + " " + values.association_postalcode + " " + values.association_town}}]}/>
                </div>
                <Alert
                  sx={{
                    mt: 1
                  }}
                  // action={
                  //   <IconButton
                  //     aria-label="close"
                  //     color="inherit"
                  //     size="small"
                  //     onClick={() => {
                  //       setOpenAlert(false);
                  //     }}
                  //   >
                  //     <CloseIcon fontSize="inherit" />
                  //   </IconButton>
                  // }
                  severity="info"
                  aria-label={ t('FORMS.authErrorResult') }
                >
                  <span>{t('FORMS.authErrorResult')}</span>
                </Alert>
              </>
            }
          </Container>
        </Box>
    );
}

export default SummaryStep;