import * as deepFreeze from 'deep-freeze';

export const TIMELINE_TRANSLATIONS = deepFreeze({
    TIMELINE: {
        community_image: "Community Image",
        timeline: "See our Timeline"
    },
    TIMELINE_PAGE: {
        title: "Transição Portugal - timeline"
    },
    TIMELINE_NAV: {
        first: "Jump to Start",
        last: "Jump to Last",
        next: "Next",
        play: "Play",
        previous: "Previous"
    }
} as const);