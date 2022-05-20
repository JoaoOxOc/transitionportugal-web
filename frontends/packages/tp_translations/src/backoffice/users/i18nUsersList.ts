import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";

import {USERSLIST_TRANSLATIONS as EN_USERSLIST_TRANSLATIONS} from '../../consts/Translations/en/backoffice/User/UsersList';
import {USERSLIST_TRANSLATIONS as PT_USERSLIST_TRANSLATIONS} from '../../consts/Translations/pt/backoffice/User/UsersList';

export const i18nextUsersList = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_USERSLIST_TRANSLATIONS
        },
        pt: {
            translation: PT_USERSLIST_TRANSLATIONS
        }
    }
});