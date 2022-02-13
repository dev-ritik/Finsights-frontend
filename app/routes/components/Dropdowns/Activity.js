import React from 'react';
import PropTypes from 'prop-types';
import {
    Media, 
} from './../../../components';

const Activity = (props) => (
    <React.Fragment>
        <Media>
            <Media left>
                <span className="fa-stack fa-lg fa-fw d-flex mr-3">
                    <i className={ `fa fa-fw fa-stack-2x fa-stack-2x text-${ props.iconColorBelow } fa-${ props.iconBelow }` }></i>
                    <i className={ `fa fa-stack-1x fa-fw text-${ props.iconColor } fa-${ props.icon }` }></i>
                </span>
            </Media>
            <Media body>
                <span className="h6">
                    Bertram Gilfoyle
                </span> changed Description to &quot;money&quot;
                <p className="mt-2 mb-1">
                    lerem ipsum
                </p>
                <div className="small mt-2">
                    { "Sat Oct 20 2018 04:19:38 GMT-0700 (Pacific Daylight Time)".toString() }
                </div>
            </Media>
        </Media>
    </React.Fragment>

)
Activity.propTypes = {
    iconColorBelow: PropTypes.node,
    iconBelow: PropTypes.node,
    iconColor: PropTypes.node,
    icon: PropTypes.node
};
Activity.defaultProps = {
    iconColorBelow: "muted",
    iconBelow: "circle",
    iconColor: "white",
    icon: "question",
};

export { Activity };
