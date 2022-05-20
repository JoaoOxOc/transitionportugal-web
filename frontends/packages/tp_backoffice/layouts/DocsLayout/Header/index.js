import { Card, Box, Button, styled } from '@mui/material';
import { i18nextAbout } from "@transitionpt/translations";
import Link from '../../../components/Link';

import Logo from '../../../components/Logo';

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
    width: 100%;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    z-index: 6;
    top: 0;
    padding: 0 ${theme.spacing(2)};
    height: ${theme.spacing(10)};
`
);

function Header() {
  const { t } = i18nextAbout;

  return (
    <HeaderWrapper>
      <Logo />
      <Box>
        <Button
          component={Link}
          href="/dashboards/reports"
          variant="contained"
          sx={{ mx: 2 }}
        >
          {t('View Live Preview')}
        </Button>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
