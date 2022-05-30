import PropTypes from 'prop-types';
import {
  Box
} from '@mui/material';

import {DistrictSelect} from "@transitionpt/geolocation";

const ProfileAddressDetails = ({association}) => {
    return (
    <>
      <Box display="flex" mb={3}>
        <DistrictSelect selectId={"district-dropdown"} selectLabel={"FORM.selectDistrict"} notFoundLabel={"FORM.districtNotFound"} defaultValue={"viseu"} />
      </Box>
    </>
  );
};

ProfileAddressDetails.propTypes = {
  // @ts-ignore
  association: PropTypes.object.isRequired
};

export default ProfileAddressDetails;
