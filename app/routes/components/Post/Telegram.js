import React from 'react';
import PropTypes, {number, string} from 'prop-types';
import {Badge, Media, UncontrolledTooltip} from './../../../components';
import {exchangeSymbolReprToSymbol, timeSince} from "../../../utilities";
import DOMPurify from "dompurify";


const get_post_url = (channel, id) => `https://t.me/${channel}/${id}`;

// function truncate(text) {
//     if (text.length > 40) {
//         return text.substring(0, 40) + "...";
//     } else {
//         return text;
//     }
// }

function Telegram(props) {
    // const [open, setOpen] = useState(true);
    return <Media className={`mb-2 ${props.mediaClassName}`}>
        <Media body>
            <div className="mb-2">
                {props.formatted_text ? (
                    <span className="newline-format"
                          dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.formatted_text, {USE_PROFILES: {html: true}})}}/>
                ) : (
                    <span className="newline-format">
                    {props.text}
                </span>)}

                <p className="mb-0">
                    {props.stocks.map(function (data, index) {
                        return <Badge pill color={"secondary"} className="mr-1" href={`#/analysis/stock/${data}/news`}
                                      key={index}>
                            {exchangeSymbolReprToSymbol(data)}
                        </Badge>;
                    })}
                </p>
                <a href={get_post_url(props.channel, props.post_id)} rel="noopener noreferrer" target="_blank"
                   className="small text-decoration-none-light">
                    <u>{timeSince(props.created)}</u>
                </a>
            </div>
            <div>
                <span id="View">
                    <i className="fa fa-eye mr-1"/>
                    <span
                        className={"mr-2 text-success"}>
                    {props.view_count}
                    </span>
                </span>
                <span className="mr-2">·</span>
                <span id="Forward">
                    <i className="fa fa-mail-forward mr-1"/>
                    <span
                        className={"mr-2 text-success"}>
                    {props.forward_count}
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
