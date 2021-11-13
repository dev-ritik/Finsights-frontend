import React, {useState} from 'react';
import PropTypes, {number, string} from 'prop-types';
import {Badge, Media, UncontrolledTooltip} from './../../../components';
import {Collapse} from "reactstrap";
import {exchangeSymbolReprToSymbol, timeSince} from "../../../utilities";

const get_post_url = slug => `https://reddit.com${slug}`;

function truncate(text) {
    if (text.length > 75) {
        return text.substring(0, 75) + "...";
    } else {
        return text;
    }
}

function Reddit(props) {
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
                <a href={get_post_url(props.url)} rel="noopener noreferrer" target="_blank"
                   className="small text-decoration-none-light">
                    {timeSince(props.created)}
                </a>
            </div>
            <div onClick={function () {
                return setOpen(!open);
            }}>
                <Collapse isOpen={open}>
                    <p className="mb-0">
                        {truncate(props.body)}
                    </p>
                    <p className="mb-1">
                        {props.stocks.map(function (data, index) {
                            return <Badge pill color={"secondary"} className="mr-1" key={index}>
                                {exchangeSymbolReprToSymbol(data)}
                            </Badge>;
                        })}
                    </p>
                </Collapse>
                <Collapse isOpen={!open}>
                    <p className="mb-0">
                        {props.body}
                    </p>
                    <p className="mb-1">
                        {props.stocks.map(function (data, index) {
                            return <Badge pill color={"secondary"} className="mr-1" key={index}>
                                {exchangeSymbolReprToSymbol(data)}
                            </Badge>;
                        })}
                    </p>

                    <span className={"mr-2 " + (props.reddit_score >= 0 ? 'text-success' : 'text-danger')}
                          id="RedditScore">
                    {props.reddit_score}
                    </span>
                    <i className="fa fa-angle-up text-success"/> <i className="fa fa-angle-down text-danger"/>
                    <UncontrolledTooltip placement="left" target="RedditScore">
                        Reddit Score
                    </UncontrolledTooltip>
                </Collapse>
            </div>
        </Media>
    </Media>
        ;
}

Reddit.propTypes = {
    created: string,
    title: string,
    body: string,
    reddit_score: number,
    url: string,
    stocks: PropTypes.arrayOf(string),
    mediaClassName: PropTypes.node
};
Reddit.defaultProps = {
    created: "",
    title: "",
    body: "",
    reddit_score: 0,
    url: "/",
    stocks: [],
    mediaClassName: "text-empty"
};

export {Reddit};
