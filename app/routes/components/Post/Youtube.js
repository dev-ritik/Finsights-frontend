import React, {useState} from 'react';
import PropTypes, {number, string} from 'prop-types';
import {Badge, Media, UncontrolledTooltip} from './../../../components';
import {Collapse} from "reactstrap";
import {exchangeSymbolReprToSymbol, getATagFormattedtext, timeSince} from "../../../utilities";
import DOMPurify from 'dompurify';
import './../../../styles/custom.scss';

const get_post_url = slug => `https://youtube.com/watch?v=${slug}`;

function truncate(text) {
    if (text.length > 75) {
        return text.substring(0, 75) + "...";
    } else {
        return text;
    }
}

function format(description) {
    description = getATagFormattedtext(description);

    // Replace Hashtags
    // Source: https://stackoverflow.com/a/32765442
    const hashtagPattern = /([ \n])(#)([A-Za-z0-9\/\.]*)/gim;
    description = description.replace(hashtagPattern, '$1<a href="https://www.youtube.com/hashtag/$3" target="_blank">$2$3</a>');

    // Currently, YouTube API doesn't give @mention detail
    return description
}

function Youtube(props) {
    const [open, setOpen] = useState(true);
    return <Media className={`mb-2 ${props.mediaClassName}`}>
        <Media body>
            <div className="mb-2">
                <span className="h6 text-decoration-none">
                    {props.title}
                </span>
                <br/>
                <a href={get_post_url(props.post_id)} rel="noopener noreferrer" target="_blank"
                   className="small text-decoration-none-light">
                    <u>{timeSince(props.created)}</u>
                </a>
            </div>
            <div onClick={function () {
                return setOpen(!open);
            }}>
                <Collapse isOpen={open}>
                    <p className="mb-0">
                        {truncate(props.description)}
                    </p>
                    <p className="mb-1">
                        {props.stocks.map(function (data, index) {
                            return data ? <Badge pill color={"secondary"} className="mr-1"
                                                 href={`#/analysis/stock/${data}/news`}
                                                 key={index}>
                                {exchangeSymbolReprToSymbol(data)}
                            </Badge> : <></>;
                        })}
                    </p>
                </Collapse>
                <Collapse isOpen={!open}>
                    <p className="mb-0 newline-format"
                       dangerouslySetInnerHTML={{
                           __html: DOMPurify.sanitize(format(props.description), {
                               USE_PROFILES: {html: true},
                               ADD_ATTR: ['target', 'rel'],
                           })
                       }}>
                    </p>
                    <p className="mb-1">
                        {props.stocks.map(function (data, index) {
                            return data ? <Badge pill color={"secondary"} className="mr-1"
                                                 href={`#/analysis/stock/${data}/news`} key={index}>
                                {exchangeSymbolReprToSymbol(data)}
                            </Badge> : <></>;
                        })}
                    </p>
                    <span id="Like">
                        <i className="fa fa-thumbs-o-up mr-1"/>
                        <span
                            className={"mr-2 text-success"}>
                        {props.like_count}
                        </span>
                    </span>
                    <span className="mr-2">·</span>
                    <span id="View">
                        <i className="fa fa-eye mr-1"/> <span
                        className={"mr-2 text-success"}>
                        {props.view_count}
                        </span>
                    </span>
                    <span id="Comment">
                        <span className="mr-2">·</span><i className="fa fa-comment-o mr-1"/> <span
                        className={"mr-2 text-success"}>
                        {props.comment_count}
                        </span>
                    </span>
                    <UncontrolledTooltip placement="bottom" target="Like">
                        Likes
                    </UncontrolledTooltip>
                    <UncontrolledTooltip placement="bottom" target="View">
                        Views
                    </UncontrolledTooltip>
                    <UncontrolledTooltip placement="bottom" target="Comment">
                        Comments
                    </UncontrolledTooltip>
                </Collapse>
            </div>
        </Media>
    </Media>
        ;
}

Youtube.propTypes = {
    created: string,
    post_id: string,
    title: string,
    description: string,
    like_count: number,
    view_count: number,
    comment_count: number,
    stocks: PropTypes.arrayOf(string),
    mediaClassName: PropTypes.node
};
Youtube.defaultProps = {
    created: "",
    post_id: "",
    title: "",
    description: "",
    like_count: 0,
    view_count: 0,
    comment_count: 0,
    stocks: [],
    mediaClassName: "text-empty"
};

export {Youtube};
