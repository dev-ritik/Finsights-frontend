import config from "../config";

export const API_URL = config.siteCannonicalUrl
export const POSTS_PER_PAGE = 10;
export const ADMIN_EMAIL = "ritikkne@gmail.com";

export const PLACEHOLDER_USERNAME = "Guest User";
export const UNKNOWN_USERNAME = "Investor";

export const REDDIT = 're';
export const TELEGRAM = 'te';
export const YOUTUBE = 'yt';
export const TWITTER = 'tw';
export const VALUEPICKR = 'vp';

export const PLATFORM_CONSTANTS = {
    re: {
        label: 'Reddit',
        icon: 'fa-reddit',
        search_slug: 'reddit',
    },
    te: {
        label: 'Telegram',
        icon: 'fa-send',
        search_slug: 'telegram',
    },
    yt: {
        label: 'Youtube',
        icon: 'fa-youtube-play',
        search_slug: 'youtube',
    },
    tw: {
        label: 'Twitter',
        icon: 'fa-twitter',
        search_slug: 'twitter',
    },
    vp: {
        label: 'ValuePickr',
        icon: 'fa-circle',
        search_slug: 'valuepickr',
    },
}

export const image404 = 'https://raw.githubusercontent.com/blairlee227/IlluStatus/master/src/demo_2.gif'
