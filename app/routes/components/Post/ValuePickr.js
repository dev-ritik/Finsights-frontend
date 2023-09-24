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

function ValuePickr(props) {

    return <Media className={`mb-2 ${props.mediaClassName}`}>
        <Media body>
            <div className="mb-2">
                {/*Handle relative links for example for user tag*/}
                <span className="newline-format"
                      dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(format(props.text), {USE_PROFILES: {html: true}})}}/>
                <p className="mb-0">
                    {props.stocks.map(function (data, index) {
                        return <Badge pill color={"secondary"} className="mr-1" href={`#/analysis/stock/${data}/news`}
                                      key={index}>
                            {exchangeSymbolReprToSymbol(data)}
                        </Badge>;
                    })}
                </p>
                <a href={get_post_url(props.topic_name, props.topic_id, props.post_number)} rel="noopener noreferrer"
                   target="_blank"
                   className="small text-decoration-none-light">
                    <u>{timeSince(props.created)}</u>
                </a>
            </div>
            <div>
                <span id="View">
                    <i className="fa fa-eye mr-1"/>
                    <span
                        className={"mr-2 text-success"}>
                    {props.read_count}
                    </span>
                </span>
                <span id="View">
                    <i className="fa fa-heart mr-1"/>
                    <span
                        className={"mr-2 text-success"}>
                    {props.likes}
                    </span>
                </span>
                <span className="mr-2">·</span>
                <span id="Forward">
                    <i className="fa fa-reply mr-1"/>
                    <span
                        className={"mr-2 text-success"}>
                    {props.reply_count}
                    </span>
                </span>
                <UncontrolledTooltip placement="bottom" target="View">
                    Views
                </UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="Forward">
                    Forward
                </UncontrolledTooltip>
            </div>
        </Media>
    </Media>
        ;
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
