import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";
import { SETTINGDETAILS_TRANSLATIONS as EN_SETTINGDETAILS_TRANSLATIONS } from '../../consts/Translations/en/backoffice/Settings/SettingDetails';
import { SETTINGDETAILS_TRANSLATIONS as PT_SETTINGDETAILS_TRANSLATIONS } from '../../consts/Translations/pt/backoffice/Settings/SettingDetails';
export var i18nextSettingDetails = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EN_SETTINGDETAILS_TRANSLATIONS
        },
        pt: {
            translation: PT_SETTINGDETAILS_TRANSLATIONS
        }
    }
});
//# sourceMappingURL=i18nSettingDetails.js.map