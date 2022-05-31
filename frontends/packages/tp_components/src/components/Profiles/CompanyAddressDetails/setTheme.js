import { ThemeProvider } from '@mui/material';
import ProfileAddressDetails from './index';

export default function ProfileAddressDetailsCustomTheme({association, theme}) {
    return (
    <ThemeProvider theme={theme}>
      <ProfileAddressDetails association={association}/>
    </ThemeProvider>
    );
}