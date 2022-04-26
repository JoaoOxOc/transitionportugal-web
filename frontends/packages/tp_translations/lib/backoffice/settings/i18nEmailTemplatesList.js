import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";
import { EMAILTEMPLATESLIST_TRANSLATIONS as EN_EMAILTEMPLATESLIST_TRANSLATIONS } from '../../consts/Translations/en/backoffice/Settings/EmailTemplatesList';
import { EMAILTEMPLATESLIST_TRANSLATIONS as PT_EMAILTEMPLATESLIST_TRANSLATIONS } from '../../consts/Translations/pt/backoffice/Settings/EmailTemplatesList';
export var i18nextEmailTemplatesList = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EN_EMAILTEMPLATESLIST_TRANSLATIONS
        },
        pt: {
            translation: PT_EMAILTEMPLATESLIST_TRANSLATIONS
        }
    }
});
//# sourceMappingURL=i18nEmailTemplatesList.js.map