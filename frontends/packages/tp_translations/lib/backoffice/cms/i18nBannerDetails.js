import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";
import { BANNERDETAILS_TRANSLATIONS as EN_BANNERDETAILS_TRANSLATIONS } from '../../consts/Translations/en/backoffice/cms/bannerDetails';
import { BANNERDETAILS_TRANSLATIONS as PT_BANNERDETAILS_TRANSLATIONS } from '../../consts/Translations/pt/backoffice/cms/bannerDetails';
export var i18nextBannerDetails = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: { escapeValue: false },
    resources: {
        en: {
            translation: EN_BANNERDETAILS_TRANSLATIONS
        },
        pt: {
            translation: PT_BANNERDETAILS_TRANSLATIONS
        }
    }
});
//# sourceMappingURL=i18nBannerDetails.js.map