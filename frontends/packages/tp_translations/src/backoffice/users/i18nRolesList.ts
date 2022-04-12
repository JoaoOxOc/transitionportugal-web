import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";

import {ROLESLIST_TRANSLATIONS as EN_ROLESLIST_TRANSLATIONS} from '../../consts/Translations/en/backoffice/User/RolesList';
import {ROLESLIST_TRANSLATIONS as PT_ROLESLIST_TRANSLATIONS} from '../../consts/Translations/pt/backoffice/User/RolesList';

export const i18nextRolesList = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_ROLESLIST_TRANSLATIONS
        },
        pt: {
            translation: PT_ROLESLIST_TRANSLATIONS
        }
    }
});