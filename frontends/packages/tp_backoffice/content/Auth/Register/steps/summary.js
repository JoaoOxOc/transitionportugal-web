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
  const [geolocationDeterminedAddress, setGeolocationDeterminedAddress] = useState('');
  const [geolocationError, setGeolocationError] = useState('');
  const { t } = i18nextRegisterForm;
  const splitAddress = values.association_address.split(/[,º]/);
  console.log(splitAddress, splitAddress.length);
  // TODO: get HERE apikey from somewhere
  // captcha: https://codesandbox.io/s/w7m717779w
    hereGeolocator({
      houseNumber: splitAddress.length > 1 ? splitAddress[1] : null,
      street: splitAddress[0],
      postalCode: values.association_postalcode,
      town: values.association_town,
      city: municipalitySelected.label,
      county: districtSelected.label,
      country: 'Portugal'
    },
    "").then(result => {
      if (result && result.IsError === false) {
        setAssociationLatitude(result.Latitude);
        setAssociationLongitude(result.Longitude);
        setGeolocationDeterminedAddress(result.Label);
      }
      else if (result) {
        setGeolocationError(result.ErrorMessage);
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
              {t("FORMS.associationMunicipality") + ": " + (values.association_municipality_code ? municipalitySelected.label : "") + ";  " + t("FORMS.associationDistrict") + ": " + (values.association_district_code ? districtSelected.label : "")}
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
                { geolocationError &&
                  <Alert
                    sx={{
                      mt: 1
                    }}
                    severity="error"
                    aria-label={ t('FORMS.geolocationErrorResult') }
                  >
                    <Typography variant="h4">{t('FORMS.geolocationErrorResult')}</Typography>
                  </Alert>
                }
                <Alert
                  sx={{
                    mt: 1
                  }}
                  severity="warning"
                  aria-label={ t('FORMS.geolocationResult') }
                >
                  <Typography variant="h4">{t('FORMS.geolocationResult')}</Typography>
                  <Typography variant="subtitle2" sx={{pt: 1, pb:1}}><strong>{geolocationDeterminedAddress} ({values.association_latitude} {values.association_longitude})</strong></Typography>
                  <Typography variant="subtitle2">{t('FORMS.geolocationResultMoreInfo')}</Typography>
                </Alert>
              </>
            }
          </Container>
        </Box>
    );
}

export default SummaryStep;