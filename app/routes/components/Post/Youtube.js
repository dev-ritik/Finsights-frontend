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

function Youtube({
                     title,
                     post_id,
                     created,
                     description,
                     stocks,
                     like_count,
                     view_count,
                     comment_count,
                     mediaClassName
                 }) {
    const [expanded, setExpanded] = useState(false);

    const renderBadges = () =>
        stocks
            .filter(Boolean)
            .map((data, index) => (
                <Badge
                    pill
                    color="light"
                    className="border mr-1 text-muted"
                    href={`#/analysis/stock/${data}/news`}
                    key={index}
                >
                    {exchangeSymbolReprToSymbol(data)}
                </Badge>
            ));

    const renderStat = (id, icon, value, tooltip) => (
        <>
      <span id={id} className="mr-2">
        <i className={`fa ${icon} mr-1`}/>
        <span className="text-success">{value}</span>
      </span>
            <UncontrolledTooltip placement="bottom" target={id}>
                {tooltip}
            </UncontrolledTooltip>
        </>
    );

    return (
        <Media className={`mb-2 ${mediaClassName}`}>
            <Media body>
                <div className="mb-2">
                    <h6 className="mb-1">{title}</h6>
                    <a
                        href={get_post_url(post_id)}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="small text-muted"
                    >
                        <u>{timeSince(created)}</u>
                    </a>
                </div>

                <div onClick={() => setExpanded(!expanded)} style={{cursor: "pointer"}}>
                    {!expanded ? (
                        <Collapse isOpen>
                            <p className="mb-0">{truncate(description)}</p>
                            <div className="mb-1">{renderBadges()}</div>
                        </Collapse>
                    ) : (
                        <Collapse isOpen>
                            <p
                                className="mb-0 newline-format"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(format(description), {
                                        USE_PROFILES: {html: true},
                                        ADD_ATTR: ["target", "rel"],
                                    }),
                                }}
                            />
                            <div className="mb-1">{renderBadges()}</div>
                            <div>
                                {renderStat("Like", "fa-thumbs-o-up", like_count, "Likes")}
                                <span className="mr-2">·</span>
                                {renderStat("View", "fa-eye", view_count, "Views")}
                                <span className="mr-2">·</span>
                                {renderStat("Comment", "fa-comment-o", comment_count, "Comments")}
                            </div>
                        </Collapse>
                    )}
                </div>
            </Media>
        </Media>
    );
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
