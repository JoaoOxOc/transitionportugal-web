import * as deepFreeze from 'deep-freeze';
import { BOTTOM_MENU_TRANSLATIONS } from './menu';
import { FOOTER_TRANSLATIONS } from './footer';

export const TRANSLATIONS = deepFreeze({
    Header: BOTTOM_MENU_TRANSLATIONS,
    Footer: FOOTER_TRANSLATIONS
} as const);