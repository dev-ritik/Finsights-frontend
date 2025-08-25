import React from 'react';
import PropTypes, {number, string} from 'prop-types';
import {Badge, Media} from './../../../components';
import {exchangeSymbolReprToSymbol, timeSince} from "../../../utilities";
import DOMPurify from "dompurify";


const get_post_url = (channel, id) => `https://t.me/${channel}/${id}`;

function Telegram(props) {
    return (
        <Media className={`mb-2 ${props.mediaClassName}`}>
            <Media body>
                {/* Message Text */}
                <div className="mb-2">
                    {props.formatted_text ? (
                        <span
                            className="d-block mb-2 newline-format"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(props.formatted_text, {
                                    USE_PROFILES: {html: true}
                                })
                            }}
                        />
                    ) : (
                        <span className="d-block mb-2 newline-format">{props.text}</span>
                    )}

                    {/* Stock Badges */}
                    <div className="mb-2">
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
                        href={get_post_url(props.channel, props.post_id)}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="small text-muted"
                    >
                        <u>{timeSince(props.created)}</u>
                    </a>
                </div>

                {/* Interaction Bar */}
                <div className="d-flex align-items-center text-muted small">
                    <span className="mr-3 d-flex align-items-center">
                        <i className="fa fa-eye mr-1"/>
                        {props.view_count}
                    </span>
                    <span className="d-flex align-items-center">
                        <i className="fa fa-share-alt mr-1"/>
                        {props.forward_count}
                    </span>
                </div>
            </Media>
        </Media>
    );
}

Telegram.propTypes = {
    created: string,
    text: string,
    formatted_text: string,
    post_id: string,
    channel: string,
    forward_count: number,
    view_count: number,
    stocks: PropTypes.arrayOf(string),
    mediaClassName: PropTypes.node
};
Telegram.defaultProps = {
    created: "",
    text: "",
    formatted_text: "",
    post_id: 0,
    channel: "",
    forward_count: 0,
    view_count: 0,
    stocks: [],
    mediaClassName: "text-empty"
};

export {Telegram};
