import * as deepFreeze from 'deep-freeze';

export const NOTIFICATION_TRANSLATIONS = deepFreeze({
    DOWNLOAD: {
        success: "Download com sucesso",
        failed: "Download falhou"
    }
} as const);