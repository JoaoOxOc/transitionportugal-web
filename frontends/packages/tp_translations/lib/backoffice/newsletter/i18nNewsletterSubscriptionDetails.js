import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";
import { NEWSLETTERDETAILS_TRANSLATIONS as EN_NEWSLETTERDETAILS_TRANSLATIONS } from '../../consts/Translations/en/backoffice/Newsletter/NewsletterDetails';
import { NEWSLETTERDETAILS_TRANSLATIONS as PT_NEWSLETTERDETAILS_TRANSLATIONS } from '../../consts/Translations/pt/backoffice/Newsletter/NewsletterDetails';
export var i18nextNewsletterSubscriptionDetails = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EN_NEWSLETTERDETAILS_TRANSLATIONS
        },
        pt: {
            translation: PT_NEWSLETTERDETAILS_TRANSLATIONS
        }
    }
});
//# sourceMappingURL=i18nNewsletterSubscriptionDetails.js.map