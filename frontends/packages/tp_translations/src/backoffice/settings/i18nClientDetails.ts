import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";

import {CLIENTDETAILS_TRANSLATIONS as EN_CLIENTDETAILS_TRANSLATIONS} from '../../consts/Translations/en/backoffice/Settings/ClientDetails';
import {CLIENTDETAILS_TRANSLATIONS as PT_CLIENTDETAILS_TRANSLATIONS} from '../../consts/Translations/pt/backoffice/Settings/ClientDetails';

export const i18nextClientDetails = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_CLIENTDETAILS_TRANSLATIONS
        },
        pt: {
            translation: PT_CLIENTDETAILS_TRANSLATIONS
        }
    }
});