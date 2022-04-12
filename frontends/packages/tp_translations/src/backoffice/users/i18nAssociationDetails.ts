import { i18nCreateInstanceSync } from "../../utils/i18nCreateInstance";

import {ASSOCIATIONDETAILS_TRANSLATIONS as EN_ASSOCIATIONDETAILS_TRANSLATIONS} from '../../consts/Translations/en/backoffice/User/AssociationDetails';
import {ASSOCIATIONDETAILS_TRANSLATIONS as PT_ASSOCIATIONDETAILS_TRANSLATIONS} from '../../consts/Translations/pt/backoffice/User/AssociationDetails';

export const i18nextAssociationDetails = i18nCreateInstanceSync({
    lng: 'pt',
    contextSeparator: '#',
    interpolation: {escapeValue: false},
    resources: {
        en: {
            translation: EN_ASSOCIATIONDETAILS_TRANSLATIONS
        },
        pt: {
            translation: PT_ASSOCIATIONDETAILS_TRANSLATIONS
        }
    }
});