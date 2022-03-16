import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";
import { SETTINGSLIST_TRANSLATIONS as EN_SETTINGSLIST_TRANSLATIONS } from '../../consts/Translations/en/backoffice/Settings/SettingsList';
import { SETTINGSLIST_TRANSLATIONS as PT_SETTINGSLIST_TRANSLATIONS } from '../../consts/Translations/pt/backoffice/Settings/SettingsList';
export var i18nextSettingsList = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EN_SETTINGSLIST_TRANSLATIONS
        },
        pt: {
            translation: PT_SETTINGSLIST_TRANSLATIONS
        }
    }
});
//# sourceMappingURL=i18nSettingsList.js.map