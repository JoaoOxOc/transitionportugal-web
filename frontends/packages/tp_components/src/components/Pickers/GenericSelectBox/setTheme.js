import { ThemeProvider } from '@mui/material';
import GenericSelectBox from './index';

export default function GenericSelectBoxCustomTheme({children, form, field, theme}) {
    return (
    <ThemeProvider theme={theme}>
      <GenericSelectBox children={children} form={form} field={field}/>
    </ThemeProvider>
    );
}