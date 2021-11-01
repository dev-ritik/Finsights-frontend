import React from 'react';
import PropTypes, {number, string} from 'prop-types';
import {Media, UncontrolledTooltip} from './../../../components';
import {timeSince} from "../../../utilities";


const get_post_url = id => `https://twitter.com/i/web/status/${id}`;

// function truncate(text) {
//     if (text.length > 40) {
//         return text.substring(0, 40) + "...";
//     } else {
//         return text;
//     }
// }

function Twitter(props) {
    console.log(props)
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
                <a href={get_post_url(props.post_id)} rel="noopener noreferrer" target="_blank"
                   className="small text-decoration-none-light">
                    {timeSince(props.created)}
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
    post_id: string,
    like_count: number,
    reply_count: number,
    retweet_count: number,
    mediaClassName: PropTypes.node
};
Twitter.defaultProps = {
    created: "",
    text: "",
    post_id: "",
    like_count: 0,
    reply_count: 0,
    retweet_count: 0,
    mediaClassName: "text-empty"
};

export {Twitter};
