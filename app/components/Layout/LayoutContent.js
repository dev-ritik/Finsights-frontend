import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, Media} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {clear} from "../../redux/Alert";

const LayoutContent = (props) => {
    const dispatch = useDispatch()
    const alert = useSelector((state) => state.alert)

    const icon = {
        'primary': 'fa-caret-right',
        'danger': 'fa-close',
        'info': 'fa-info',
        'warning': 'fa-exclamation',
        'success': 'fa-check',
        'dark': 'fa-question',
        null: ''
    }[alert.colour]

    return (
        <>
            {
                alert.title && alert.message ?
                    <Alert color={alert.colour} className="m-2">
                        <Media>
                            <Media left middle className="mr-3">
                                <span className="fa-stack fa-lg">
                                    <i className="fa fa-circle fa-stack-2x alert-bg-icon"/>
                                    <i className={`fa ${icon} fa-stack-1x fa-inverse alert-icon`}/>
                                </span>
                            </Media>
                            <Media body>
                                <h6 className="alert-heading mb-1">
                                    {alert.title}
                                </h6>
                                {alert.message}
                                <div className="mt-2">
                                    {/*<Button color={alert.colour}>I Understand</Button>{' '}*/}
                                    <Button color={alert.colour} outline onClick={
                                        () => {
                                            dispatch(clear())
                                        }
                                    }>Ok</Button>{' '}
                                </div>
                            </Media>
                        </Media>
                    </Alert>
                    : <></>
            }
            <div className="layout__content">
                {props.children}
            </div>
        </>
    )
};

LayoutContent.propTypes = {
    children: PropTypes.node
};
LayoutContent.layoutPartName = "content";

export {
    LayoutContent
};
