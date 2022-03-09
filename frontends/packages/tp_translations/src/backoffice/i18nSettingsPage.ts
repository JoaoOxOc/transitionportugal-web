import { i18nCreateInstanceSync } from "../utils/i18nCreateInstance";

import {SETTINGSPAGE_TRANSLATIONS as EN_SETTINGSPAGE_TRANSLATIONS} from '../consts/Translations/en/backoffice/Settings/SettingsPage';
import {SETTINGSPAGE_TRANSLATIONS as PT_SETTINGSPAGE_TRANSLATIONS} from '../consts/Translations/pt/backoffice/Settings/SettingsPage';

export const i18nextSettingsPage = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_SETTINGSPAGE_TRANSLATIONS
        },
        pt: {
            translation: PT_SETTINGSPAGE_TRANSLATIONS
        }
    }
});