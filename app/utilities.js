import {PLACEHOLDER_USERNAME} from "./constants";

function hashStr(str) {
    let hash = 0;
    for (const chr in str) {
        hash += chr;
    }
    return hash;
}

export function randomArray(arr) {
    const index = Math.round(Math.random() * (arr.length - 1));
    return arr[index];
}

export function randomAvatar(name = PLACEHOLDER_USERNAME) {
    return "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/" +
        (hashStr(name) % 100 + 1) + ".png"
}

export function timeSince(timeStamp) {
    // Src: https://gist.github.com/valarpirai/27ed1b874142ade9b1d0
    if (!(timeStamp instanceof Date)) {
        timeStamp = new Date(timeStamp);
    }

    if (isNaN(timeStamp.getDate())) {
        return "Invalid date";
    }

    const now = new Date(),
        secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;

    const formatDate = function (date, format, utc) {
        const MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        function ii(i, len) {
            let s = i + "";
            len = len || 2;
            while (s.length < len) s = "0" + s;
            return s;
        }

        const y = utc ? date.getUTCFullYear() : date.getFullYear();
        format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
        format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
        format = format.replace(/(^|[^\\])y/g, "$1" + y);

        const M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
        format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
        format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
        format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
        format = format.replace(/(^|[^\\])M/g, "$1" + M);

        const d = utc ? date.getUTCDate() : date.getDate();
        format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
        format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
        format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
        format = format.replace(/(^|[^\\])d/g, "$1" + d);

        const H = utc ? date.getUTCHours() : date.getHours();
        format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
        format = format.replace(/(^|[^\\])H/g, "$1" + H);

        const h = H > 12 ? H - 12 : H === 0 ? 12 : H;
        format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
        format = format.replace(/(^|[^\\])h/g, "$1" + h);

        const m = utc ? date.getUTCMinutes() : date.getMinutes();
        format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
        format = format.replace(/(^|[^\\])m/g, "$1" + m);

        const s = utc ? date.getUTCSeconds() : date.getSeconds();
        format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
        format = format.replace(/(^|[^\\])s/g, "$1" + s);

        let f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
        format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
        f = Math.round(f / 10);
        format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
        f = Math.round(f / 10);
        format = format.replace(/(^|[^\\])f/g, "$1" + f);

        const T = H < 12 ? "AM" : "PM";
        format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
        format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

        const t = T.toLowerCase();
        format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
        format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

        let tz = -date.getTimezoneOffset();
        let K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
        if (!utc) {
            tz = Math.abs(tz);
            const tzHrs = Math.floor(tz / 60);
            const tzMin = tz % 60;
            K += ii(tzHrs) + ":" + ii(tzMin);
        }
        format = format.replace(/(^|[^\\])K/g, "$1" + K);

        const day = (utc ? date.getUTCDay() : date.getDay()) + 1;
        format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
        format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

        format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
        format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

        format = format.replace(/\\(.)/g, "$1");

        return format;
    };

    if (secondsPast < 0) { // Future date
        if (secondsPast > -60) { // Less than a minute
            return 'after ' + (0 - secondsPast) + ' secs';
        }
        if (secondsPast > -3600) { // Less than an hour
            return 'after ' + Math.trunc((0 - secondsPast) / 60) + ' mins';
        }
        if (secondsPast >= -86400) { // Less than a day
            return 'after ' + (Math.trunc((0 - secondsPast) / 3600)) + ' hrs';
        }
        if (secondsPast >= -172800) { // Less than 2 days
            return 'tomorrow at ' + formatDate(timeStamp, "h:mmtt");
        }
        // TODO: Handle
        return timeStamp;
    }

    if (secondsPast < 60) { // Less than a minute
        return secondsPast + 'secs ago';
    }
    if (secondsPast < 3600) { // Less than an hour
        return Math.trunc(secondsPast / 60) + 'mins ago';
    }
    if (secondsPast <= 86400) { // Less than a day
        return Math.trunc(secondsPast / 3600) + 'hrs ago';
    }
    if (secondsPast <= 172800) { // Less than 2 days
        return 'Yesterday at ' + formatDate(timeStamp, "h:mmtt");
    }
    if (secondsPast > 172800) { // After two days
        let timeString;

        if (secondsPast <= 604800)
            timeString = formatDate(timeStamp, "dddd") + " at " + formatDate(timeStamp, "h:mmtt") // with in a week
        else if (now.getFullYear() > timeStamp.getFullYear())
            timeString = formatDate(timeStamp, "MMMM d, yyyy") // a year ago
        else if (now.getMonth() > timeStamp.getMonth())
            timeString = formatDate(timeStamp, "MMMM d") // months ago
        else
            timeString = formatDate(timeStamp, "MMMM d") + " at " + formatDate(timeStamp, "h:mmtt") // with in a month

        return timeString;
    }
}

export function exchangeSymbolReprToSymbol(exchangeSymbol) {
    return exchangeSymbol.split("/")[1];
}

export function getATagFormattedtext(text) {
    //URLs starting with http://, https://, or ftp://
    // Source: https://stackoverflow.com/a/3890175
    const urlPattern1 = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    text = text.replace(urlPattern1, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    const urlPattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    text = text.replace(urlPattern2, '$1<a href="https://$2" target="_blank" rel="noopener noreferrer">$2</a>');

    return text;
}