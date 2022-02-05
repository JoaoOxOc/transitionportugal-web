import * as deepFreeze from 'deep-freeze';

export const NOTIFICATION_TRANSLATIONS = deepFreeze({
    DOWNLOAD: {
        success: "Download success",
        failed: "Download failed"
    }
} as const);