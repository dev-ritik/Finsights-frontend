import React from 'react';
import PropTypes, {number, object, string} from 'prop-types';
import {Badge, Media} from './../../../components';
import {exchangeSymbolReprToSymbol, timeSince} from "../../../utilities";
import DOMPurify from 'dompurify';
// import twttr from 'twitter-text';
import autoLink from 'twitter-text/dist/esm/autoLink';
import './../../../styles/custom.scss';

const get_post_url = id => `https://twitter.com/i/web/status/${id}`;


function Twitter(props) {
    return (
        <Media className={`mb-2 ${props.mediaClassName}`}>
            <Media body>
                <div className="mb-2">
                    {/* Tweet Text */}
                    <span
                        className="d-block mb-2"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                                autoLink(props.text, props.entities),
                                { USE_PROFILES: { html: true } }
                            )
                        }}
                    />
                    {/* Stock Badges */}
                    <div className="mb-1">
                        {props.stocks.map((data, index) =>
                            data ? (
                                <Badge
                                    pill
                                    color="light"
                                    className="border mr-1 text-muted"
                                    href={`#/analysis/stock/${data}/news`}
                                    key={index}
                                >
                                    {exchangeSymbolReprToSymbol(data)}
                                </Badge>
                            ) : null
                        )}
                    </div>
                    {/* Timestamp */}
                    <a
                        href={get_post_url(props.post_id)}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="small text-muted"
                    >
                        <u>{timeSince(props.created)}</u>
                    </a>
                </div>

                {/* Interaction Bar */}
                <div className="d-flex align-items-center text-muted small">
                    <span className="mr-3 d-flex align-items-center hover:text-primary cursor-pointer">
                        <i className="fa fa-comment-o mr-1" />
                        {props.reply_count}
                    </span>
                    <span className="mr-3 d-flex align-items-center hover:text-success cursor-pointer">
                        <i className="fa fa-retweet mr-1" />
                        {props.retweet_count}
                    </span>
                    <span className="d-flex align-items-center hover:text-danger cursor-pointer">
                        <i className="fa fa-heart-o mr-1" />
                        {props.like_count}
                    </span>
                </div>
            </Media>
        </Media>
    );
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
