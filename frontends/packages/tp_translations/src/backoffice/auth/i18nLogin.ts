import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";

import {LOGIN_TRANSLATIONS as EN_LOGIN_TRANSLATIONS} from '../../consts/Translations/en/backoffice/Auth/login';
import {LOGIN_TRANSLATIONS as PT_LOGIN_TRANSLATIONS} from '../../consts/Translations/pt/backoffice/Auth/login';

export const i18nextLogin = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_LOGIN_TRANSLATIONS
        },
        pt: {
            translation: PT_LOGIN_TRANSLATIONS
        }
    }
});