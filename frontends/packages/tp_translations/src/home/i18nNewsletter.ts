import { i18nCreateInstanceSync } from "../utils/i18nCreateInstance";

import {NEWSLETTER_TRANSLATIONS as EN_NEWSLETTER_TRANSLATIONS} from '../consts/Translations/en/home/Components/newsletter';
import {NEWSLETTER_TRANSLATIONS as PT_NEWSLETTER_TRANSLATIONS} from '../consts/Translations/pt/home/Components/newsletter';

export const i18nextNewsletter = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_NEWSLETTER_TRANSLATIONS
        },
        pt: {
            translation: PT_NEWSLETTER_TRANSLATIONS
        }
    }
});