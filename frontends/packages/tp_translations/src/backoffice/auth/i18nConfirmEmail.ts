import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";

import {CONFIRMEMAIL_TRANSLATIONS as EN_CONFIRMEMAIL_TRANSLATIONS} from '../../consts/Translations/en/backoffice/Auth/confirmEmail';
import {CONFIRMEMAIL_TRANSLATIONS as PT_CONFIRMEMAIL_TRANSLATIONS} from '../../consts/Translations/pt/backoffice/Auth/confirmEmail';

export const i18nextConfirmEmail = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_CONFIRMEMAIL_TRANSLATIONS
        },
        pt: {
            translation: PT_CONFIRMEMAIL_TRANSLATIONS
        }
    }
});