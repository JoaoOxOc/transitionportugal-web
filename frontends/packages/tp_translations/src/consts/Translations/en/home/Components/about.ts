import * as deepFreeze from 'deep-freeze';

export const ABOUT_TRANSLATIONS = deepFreeze({
    ABOUT: {
        community_image: "Community Image",
        timeline: "See our Timeline"
    },
    ABOUT_PAGE: {
        title: "Transição Portugal"
    }
} as const);