import { ThemeProvider } from '@mui/material';
import ProfileCover from './index';

export default function ProfileCoverCustomTheme({association, theme}) {
    return (
    <ThemeProvider theme={theme}>
      <ProfileCover association={association}/>
    </ThemeProvider>
    );
}
