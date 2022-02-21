import { i18nCreateInstanceSync } from "../utils/i18nCreateInstance";

import {LOGINFORM_TRANSLATIONS as EN_LOGINFORM_TRANSLATIONS} from '../consts/Translations/en/backoffice/Auth/loginForm';
import {LOGINFORM_TRANSLATIONS as PT_LOGINFORM_TRANSLATIONS} from '../consts/Translations/pt/backoffice/Auth/loginForm';

export const i18nextLoginForm = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_LOGINFORM_TRANSLATIONS
        },
        pt: {
            translation: PT_LOGINFORM_TRANSLATIONS
        }
    }
});