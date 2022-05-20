import * as deepFreeze from 'deep-freeze';
import { NOTIFICATION_TRANSLATIONS } from './notification';

export const TRANSLATIONS = deepFreeze({
    Notification: NOTIFICATION_TRANSLATIONS
} as const);