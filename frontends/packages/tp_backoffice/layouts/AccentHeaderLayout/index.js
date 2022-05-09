import PropTypes from 'prop-types';
import { Box, useTheme } from '@mui/material';
import ThemeSettings from '../../components/ThemeSettings';

import Sidebar from './Sidebar';
import Header from './Header';

const AccentHeaderLayout = ({ children }) => {
  const session = children.props.session ? children.props.session : children.props.children.props.session;
  const theme = useTheme();

  return (
    <>
      <Header session={session}/>
      <Sidebar session={session}/>
      <Box
        sx={{
          position: 'relative',
          zIndex: 5,
          flex: 1,
          display: 'flex',
          pt: `${theme.header.height}`,
          [theme.breakpoints.up('lg')]: {
            pl: `${theme.sidebar.width}`
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            width: '100%'
          }}
        >
          <Box flexGrow={1}>{children}</Box>
        </Box>
      </Box>
      <ThemeSettings />
    </>
  );
};

AccentHeaderLayout.propTypes = {
  children: PropTypes.node
};

export default AccentHeaderLayout;
