import PropTypes from 'prop-types';

import { i18nextAbout } from "@transitionpt/translations";
import { styled, Typography, Box, Divider } from '@mui/material';

const RootWrapper = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.spacing(5)};
`
);

const PageHeader = ({ heading, subheading, ...rest }) => {
  const { t } = i18nextAbout;

  return (
    <RootWrapper {...rest}>
      {heading && <Typography variant="h1">{t(heading)}</Typography>}
      {subheading && (
        <Typography variant="subtitle2">{t(subheading)}</Typography>
      )}
      <Divider
        sx={{
          mt: 5
        }}
      />
    </RootWrapper>
  );
};

PageHeader.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string
};

export default PageHeader;
