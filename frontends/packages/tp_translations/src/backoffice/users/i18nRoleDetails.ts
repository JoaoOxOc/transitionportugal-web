import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";

import {ROLEDETAILS_TRANSLATIONS as EN_ROLEDETAILS_TRANSLATIONS} from '../../consts/Translations/en/backoffice/User/RoleDetails';
import {ROLEDETAILS_TRANSLATIONS as PT_ROLEDETAILS_TRANSLATIONS} from '../../consts/Translations/pt/backoffice/User/RoleDetails';

export const i18nextRoleDetails = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_ROLEDETAILS_TRANSLATIONS
        },
        pt: {
            translation: PT_ROLEDETAILS_TRANSLATIONS
        }
    }
});