import React, {useState} from 'react';
import PropTypes, {number, string} from 'prop-types';
import {Media, UncontrolledTooltip} from './../../../components';
import {Collapse} from "reactstrap";
import {timeSince} from "../../../utilities";

const get_post_url = slug => `https://youtube.com/watch?v=${slug}`;

function truncate(text) {
    if (text.length > 75) {
        return text.substring(0, 75) + "...";
    } else {
        return text;
    }
}

function Youtube(props) {
    const [open, setOpen] = useState(true);
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
                    {props.title}
                </span>
                <br/>
                <a href={get_post_url(props.post_id)} rel="noopener noreferrer" target="_blank"
                   className="small text-decoration-none-light">
                    {timeSince(props.created)}
                </a>
            </div>
            <div onClick={function () {
                return setOpen(!open);
            }}>
                <Collapse isOpen={open}>
                    <p className="mb-1">
                        {truncate(props.description)}
                    </p>
                </Collapse>
                <Collapse isOpen={!open}>
                    <p className="mb-1">
                        {props.description}
                    </p>
                    <span id="Like">
                        <i className="fa fa-thumbs-o-up mr-1"/>
                        <span
                            className={"mr-2 text-success"}>
                        {props.like_count}
                        </span>
                    </span>
                    <span className="mr-2">·</span>
                    <span id="Dislike">
                        <i className="fa fa-thumbs-o-down mr-1"/>
                        <span
                            className={"mr-2 text-success"}>
                        {props.dislike_count}
                        </span>
                    </span>
                    <span id="View">
                        <span className="mr-2">·</span><i className="fa fa-eye mr-1"/> <span
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
                    <UncontrolledTooltip placement="bottom" target="Dislike">
                        Dislikes
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
    dislike_count: number,
    view_count: number,
    comment_count: number,
    mediaClassName: PropTypes.node
};
Youtube.defaultProps = {
    created: "",
    post_id: "",
    title: "",
    description: "",
    like_count: 0,
    dislike_count: 0,
    view_count: 0,
    comment_count: 0,
    mediaClassName: "text-empty"
};

export {Youtube};
