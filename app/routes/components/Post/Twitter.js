import React from 'react';
import PropTypes, {number, object, string} from 'prop-types';
import {Badge, Media, UncontrolledTooltip} from './../../../components';
import {exchangeSymbolReprToSymbol, timeSince} from "../../../utilities";
import DOMPurify from 'dompurify';
import twttr from 'twitter-text';
import './../../../styles/custom.scss';

const get_post_url = id => `https://twitter.com/i/web/status/${id}`;

// function truncate(text) {
//     if (text.length > 40) {
//         return text.substring(0, 40) + "...";
//     } else {
//         return text;
//     }
// }

function Twitter(props) {
    // const [open, setOpen] = useState(true);
    return <Media className={`mb-2 ${props.mediaClassName}`}>
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
                {/*The index based substring replace will fail for different length of special characters by Twitter*/}
                <span className="newline-format"
                      dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(twttr.autoLink(props.text, props.entities), {USE_PROFILES: {html: true}})}}>
                </span>
                <p className="mb-0">
                    {props.stocks.map(function (data, index) {
                        return <Badge pill color={"secondary"} className="mr-1" href={`#/analysis/stock/${data}/news`}
                                      key={index}>
                            {exchangeSymbolReprToSymbol(data)}
                        </Badge>;
                    })}
                </p>
                <a href={get_post_url(props.post_id)} rel="noopener noreferrer" target="_blank"
                   className="small text-decoration-none-light">
                    <u>{timeSince(props.created)}</u>
                </a>
            </div>
            <div>
                <span id="Comment">
                    <i className="fa fa-comment-o mr-1"/>
                    <span
                        className={"mr-2 " + (props.reply_count >= 0 ? 'text-success' : 'text-danger')}>
                    {props.reply_count}
                    </span>
                </span>
                <span className="mr-2">·</span>
                <span id="Retweet">
                    <i className="fa fa-retweet mr-1"/>
                    <span
                        className={"mr-2 " + (props.retweet_count >= 0 ? 'text-success' : 'text-danger')}>
                    {props.retweet_count}
                    </span>
                </span>
                <span id="Like">
                    <span className="mr-2">·</span><i className="fa fa-heart-o mr-1"/> <span
                    className={"mr-2 " + (props.like_count >= 0 ? 'text-success' : 'text-danger')}>
                    {props.like_count}
                    </span>
                </span>
                <UncontrolledTooltip placement="bottom" target="Comment">
                    Comment
                </UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="Retweet">
                    Retweets
                </UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="Like">
                    Likes
                </UncontrolledTooltip>
            </div>
        </Media>
    </Media>
        ;
}

Twitter.propTypes = {
    created: string,
    text: string,
    entities: object,
    post_id: string,
    like_count: number,
    reply_count: number,
    retweet_count: number,
    stocks: PropTypes.arrayOf(string),
    mediaClassName: PropTypes.node
};
Twitter.defaultProps = {
    created: "",
    text: "",
    entities: {},
    post_id: "",
    like_count: 0,
    reply_count: 0,
    retweet_count: 0,
    stocks: [],
    mediaClassName: "text-empty"
};

export {Twitter};
