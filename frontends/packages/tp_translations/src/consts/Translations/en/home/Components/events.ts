import * as deepFreeze from 'deep-freeze';

export const EVENTS_TRANSLATIONS = deepFreeze({
    EVENTS: {
        eventImageAlt: 'Event Panflet',
        eventLocation: "Event Location"
    },
    LABELS: {
        presentation: "Presentation"
    }
} as const);