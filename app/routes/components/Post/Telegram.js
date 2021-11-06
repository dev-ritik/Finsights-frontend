import React from 'react';
import PropTypes, {number, string} from 'prop-types';
import {Media, UncontrolledTooltip} from './../../../components';
import {timeSince} from "../../../utilities";


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
                <span className="h6 text-decoration-none">
                    {props.text}
                </span>
                <br/>
                <a href={get_post_url(props.channel, props.post_id)} rel="noopener noreferrer" target="_blank"
                   className="small text-decoration-none-light">
                    {timeSince(props.created)}
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
                <span id="Retweet">
                    <i className="fa fa-retweet mr-1"/>
                    <span
                        className={"mr-2 text-success"}>
                    {props.forward_count}
                    </span>
                </span>
                <UncontrolledTooltip placement="bottom" target="View">
                    Views
                </UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="Retweet">
                    Retweets
                </UncontrolledTooltip>
            </div>
        </Media>
    </Media>
        ;
}

Telegram.propTypes = {
    created: string,
    text: string,
    post_id: string,
    channel: string,
    forward_count: number,
    view_count: number,
    mediaClassName: PropTypes.node
};
Telegram.defaultProps = {
    created: "",
    text: "",
    post_id: 0,
    channel: "",
    forward_count: 0,
    view_count: 0,
    mediaClassName: "text-empty"
};

export {Telegram};
