import { i18nCreateInstanceSync } from "../utils/i18nCreateInstance";

import {PARTNER_TRANSLATIONS as EN_PARTNER_TRANSLATIONS} from '../consts/Translations/en/home/Components/partner';
import {PARTNER_TRANSLATIONS as PT_PARTNER_TRANSLATIONS} from '../consts/Translations/pt/home/Components/partner';

export const i18nextPartner = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_PARTNER_TRANSLATIONS
        },
        pt: {
            translation: PT_PARTNER_TRANSLATIONS
        }
    }
});