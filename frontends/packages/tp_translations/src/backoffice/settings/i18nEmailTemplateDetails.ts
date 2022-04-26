import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";

import {EMAILTEMPLATEDETAILS_TRANSLATIONS as EN_EMAILTEMPLATEDETAILS_TRANSLATIONS} from '../../consts/Translations/en/backoffice/Settings/EmailTemplateDetails';
import {EMAILTEMPLATEDETAILS_TRANSLATIONS as PT_EMAILTEMPLATEDETAILS_TRANSLATIONS} from '../../consts/Translations/pt/backoffice/Settings/EmailTemplateDetails';

export const i18nextEmailTemplateDetails = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_EMAILTEMPLATEDETAILS_TRANSLATIONS
        },
        pt: {
            translation: PT_EMAILTEMPLATEDETAILS_TRANSLATIONS
        }
    }
});