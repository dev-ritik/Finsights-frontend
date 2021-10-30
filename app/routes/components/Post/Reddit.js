import React, {useState} from 'react';
import PropTypes, {number, string} from 'prop-types';
import {Media, UncontrolledTooltip} from './../../../components';
import {Collapse} from "reactstrap";

function timeSince(timeStamp) {
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
        return timeStamp;
    }
    if (secondsPast < 60) { // Less than a minute
        return parseInt(secondsPast) + 'secs ago';
    }
    if (secondsPast < 3600) { // Less than an hour
        return parseInt(secondsPast / 60) + 'mins ago';
    }
    if (secondsPast <= 86400) { // Less than a day
        return parseInt(secondsPast / 3600) + 'hrs ago';
    }
    if (secondsPast <= 172800) { // Less than 2 days
        return 'Yesderday at ' + formatDate(timeStamp, "h:mmtt");
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

const get_post_url = slug => `https://reddit.com${slug}`;

function truncate(text) {
    if (text.length > 75) {
        return text.substring(0, 75) + "...";
    } else {
        return text;
    }
}

function Reddit(props) {
    const [open, setOpen] = useState(true);
    return <Media className={`mb-4 ${props.mediaClassName}`}>
        {/*<Media left className="mr-3">*/}
        {/*    <Avatar.Image*/}
        {/*        size="md"*/}
        {/*        src={randomAvatar()}*/}
        {/*        className="mr-2"*/}
        {/*        addOns={[*/}
        {/*            <AvatarAddOn.Icon*/}
        {/*                className="fa fa-circle"*/}
        {/*                color="white"*/}
        {/*                key="avatar-icon-bg"*/}
        {/*            />,*/}
        {/*            <AvatarAddOn.Icon*/}
        {/*                className="fa fa-circle"*/}
        {/*                color={randomArray(status)}*/}
        {/*                key="avatar-icon-fg"*/}
        {/*            />*/}
        {/*        ]}*/}
        {/*    />*/}
        {/*</Media>*/}
        <Media body>
            <div className="mb-2">
                <a href={get_post_url(props.url)} rel="noopener noreferrer" target="_blank"
                   className="h6 text-decoration-none">
                    {props.title}
                </a>
                <br/>
                <span className="small">
                    {timeSince(props.created)}
                </span>
            </div>
            <div onClick={function () {
                return setOpen(!open);
            }}>
                <Collapse isOpen={open}>
                    <p className="mb-1">
                        {truncate(props.body)}
                    </p>
                </Collapse>
                <Collapse isOpen={!open}>
                    <p className="mb-1">
                        {props.body}
                    </p>
                    <span className={"mr-2 " + (props.reddit_score >= 0 ? 'text-success' : 'text-danger')} id="RedditScore">
                    {props.reddit_score}
                    </span>
                    <i className="fa fa-angle-up text-success"/> <i className="fa fa-angle-down text-danger"/>
                    <UncontrolledTooltip placement="left" target="RedditScore">
                        Reddit Score
                    </UncontrolledTooltip>
                </Collapse>
            </div>
        </Media>
    </Media>
        ;
}

Reddit.propTypes = {
    created: string,
    title: string,
    body: string,
    reddit_score: number,
    url: string,
    mediaClassName: PropTypes.node
};
Reddit.defaultProps = {
    created: "",
    title: "",
    body: "",
    reddit_score: 0,
    url: "/",
    mediaClassName: "text-empty"
};

export {Reddit};
