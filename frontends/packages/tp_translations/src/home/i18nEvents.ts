import { i18nCreateInstanceSync } from "../utils/i18nCreateInstance";

import {EVENTS_TRANSLATIONS as EN_EVENTS_TRANSLATIONS} from '../consts/Translations/en/home/Components/events';
import {EVENTS_TRANSLATIONS as PT_EVENTS_TRANSLATIONS} from '../consts/Translations/pt/home/Components/events';

export const i18nextEvents = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_EVENTS_TRANSLATIONS
        },
        pt: {
            translation: PT_EVENTS_TRANSLATIONS
        }
    }
});