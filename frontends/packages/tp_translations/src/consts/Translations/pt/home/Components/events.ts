import * as deepFreeze from 'deep-freeze';

export const EVENTS_TRANSLATIONS = deepFreeze({
    EVENTS: {
        eventImageAlt: 'Cartaz do evento',
        eventLocation: "Localização do Evento"
    },
    LABELS: {
        presentation: "Apresentação"
    }
} as const);