import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";

import {BANNERSLIST_TRANSLATIONS as EN_BANNERSLIST_TRANSLATIONS} from '../../consts/Translations/en/backoffice/cms/bannersList';
import {BANNERSLIST_TRANSLATIONS as PT_BANNERSLIST_TRANSLATIONS} from '../../consts/Translations/pt/backoffice/cms/bannersList';

export const i18nextBannersList = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_BANNERSLIST_TRANSLATIONS
        },
        pt: {
            translation: PT_BANNERSLIST_TRANSLATIONS
        }
    }
});