import React from 'react';
import PropTypes, {number, string} from 'prop-types';
import {Badge, Media, UncontrolledTooltip} from './../../../components';
import {exchangeSymbolReprToSymbol, timeSince} from "../../../utilities";
import DOMPurify from "dompurify";


const get_post_url = (topic_slug, topic_id, post_number) => `https://forum.valuepickr.com/t/${topic_slug}/${topic_id}/${post_number}`;

function format(text) {
    const hashtagPattern = /href="\//gim;
    text = text.replace(hashtagPattern, 'href="https://forum.valuepickr.com/');
    return text
}

function ValuePickr({
                        mediaClassName = "",
                        text,
                        stocks = [],
                        topic_name,
                        topic_id,
                        post_number,
                        created,
                        read_count,
                        likes,
                        reply_count
                    }) {
    const viewId = `view-${topic_id}-${post_number}`;
    const likeId = `like-${topic_id}-${post_number}`;
    const replyId = `reply-${topic_id}-${post_number}`;

    return (
        <Media className={`mb-3 ${mediaClassName}`}>
            <Media body>
                <div className="mb-2">
                    {/* Sanitized text (safe HTML rendering) */}
                    <span
                        className="newline-format"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(format(text), {USE_PROFILES: {html: true}}),
                        }}
                    />

                    {/* Stock tags */}
                    {stocks.length > 0 && (
                        <p className="mb-1">
                            {stocks.map((data, index) => (
                                <Badge
                                    pill
                                    key={index}
                                    color="light"
                                    className="border mr-1 text-muted"
                                    href={`#/analysis/stock/${data}/news`}
                                >
                                    {exchangeSymbolReprToSymbol(data)}
                                </Badge>
                            ))}
                        </p>
                    )}

                    {/* Post link */}
                    <a
                        href={get_post_url(topic_name, topic_id, post_number)}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="small text-muted"
                    >
                        <u>{timeSince(created)}</u>
                    </a>
                </div>

                {/* Stats row */}
                <div className="d-flex align-items-center flex-wrap small">
          <span id={viewId} className="mr-3 d-flex align-items-center">
            <i className="fa fa-eye mr-1 text-muted"/>
            <span className="text-success">{read_count}</span>
          </span>
                    <UncontrolledTooltip target={viewId}>Views</UncontrolledTooltip>

                    <span id={likeId} className="mr-3 d-flex align-items-center">
            <i className="fa fa-heart mr-1 text-muted"/>
            <span className="text-success">{likes}</span>
          </span>
                    <UncontrolledTooltip target={likeId}>Likes</UncontrolledTooltip>

                    <span id={replyId} className="mr-3 d-flex align-items-center">
            <i className="fa fa-reply mr-1 text-muted"/>
            <span className="text-success">{reply_count}</span>
          </span>
                    <UncontrolledTooltip target={replyId}>Replies</UncontrolledTooltip>
                </div>
            </Media>
        </Media>
    );
}

ValuePickr.propTypes = {
    created: string,
    text: string,
    post_id: number,
    post_number: number,
    topic_id: number,
    topic_name: string,
    likes: number,
    read_count: number,
    reply_count: number,
    stocks: PropTypes.arrayOf(string),
    mediaClassName: PropTypes.node
};
ValuePickr.defaultProps = {
    created: "",
    text: "",
    post_id: 0,
    post_number: 1,
    topic_id: 1,
    topic_name: "",
    likes: 0,
    read_count: 0,
    reply_count: 0,
    stocks: [],
    mediaClassName: "text-empty"
};

export {ValuePickr};
