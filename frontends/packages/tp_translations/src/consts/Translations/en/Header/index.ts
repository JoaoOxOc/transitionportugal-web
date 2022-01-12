import * as deepFreeze from 'deep-freeze';
import { HEADER_TRANSLATIONS } from './header';

export const TRANSLATIONS = deepFreeze({
    Header: HEADER_TRANSLATIONS
} as const);