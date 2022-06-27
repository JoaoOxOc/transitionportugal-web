import { ThemeProvider } from '@mui/material';
import GenericSelectBox from './index';

export default function GenericSelectBoxCustomTheme({children, form, field, sendSelected, fieldDependentOf, fieldDependentOfValue, theme, ...rest}) {
    return (
    <ThemeProvider theme={theme}>
      <GenericSelectBox children={children} form={form} field={field} sendSelected={sendSelected} fieldDependentOf={fieldDependentOf} fieldDependentOfValue={fieldDependentOfValue} rest={rest}/>
    </ThemeProvider>
    );
}