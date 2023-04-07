import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";

import {LOGOUT_TRANSLATIONS as EN_LOGOUT_TRANSLATIONS} from '../../consts/Translations/en/backoffice/Auth/logout';
import {LOGOUT_TRANSLATIONS as PT_LOGOUT_TRANSLATIONS} from '../../consts/Translations/pt/backoffice/Auth/logout';

export const i18nextLogout = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_LOGOUT_TRANSLATIONS
        },
        pt: {
            translation: PT_LOGOUT_TRANSLATIONS
        }
    }
});