import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";
import { NEWSLETTERSLIST_TRANSLATIONS as EN_NEWSLETTERSLIST_TRANSLATIONS } from '../../consts/Translations/en/backoffice/Newsletter/NewslettersList';
import { NEWSLETTERSLIST_TRANSLATIONS as PT_NEWSLETTERSLIST_TRANSLATIONS } from '../../consts/Translations/pt/backoffice/Newsletter/NewslettersList';
export var i18nextNewsletterSubscriptionsList = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EN_NEWSLETTERSLIST_TRANSLATIONS
        },
        pt: {
            translation: PT_NEWSLETTERSLIST_TRANSLATIONS
        }
    }
});
//# sourceMappingURL=i18nNewsletterSubscriptionsList.js.map