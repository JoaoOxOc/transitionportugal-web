import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";

import {CLIENTSLIST_TRANSLATIONS as EN_CLIENTSLIST_TRANSLATIONS} from '../../consts/Translations/en/backoffice/Settings/ClientsList';
import {CLIENTSLIST_TRANSLATIONS as PT_CLIENTSLIST_TRANSLATIONS} from '../../consts/Translations/pt/backoffice/Settings/ClientsList';

export const i18nextClientsList = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_CLIENTSLIST_TRANSLATIONS
        },
        pt: {
            translation: PT_CLIENTSLIST_TRANSLATIONS
        }
    }
});