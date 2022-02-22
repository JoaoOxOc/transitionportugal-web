import { i18nCreateInstanceSync } from "../utils/i18nCreateInstance";

import {CONTACTS_TRANSLATIONS as EN_CONTACTS_TRANSLATIONS} from '../consts/Translations/en/home/Components/contacts';
import {CONTACTS_TRANSLATIONS as PT_CONTACTS_TRANSLATIONS} from '../consts/Translations/pt/home/Components/contacts';

export const i18nextContacts = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_CONTACTS_TRANSLATIONS
        },
        pt: {
            translation: PT_CONTACTS_TRANSLATIONS
        }
    }
});