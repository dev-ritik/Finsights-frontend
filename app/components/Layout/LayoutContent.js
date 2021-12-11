import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, Media} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {clear} from "../../redux/Alert";
import {toast, ToastContainer} from "react-toastify";
import './../../styles/custom.scss';


const LayoutContent = (props) => {
    const dispatch = useDispatch()
    const alert = useSelector((state) => state.alert)
    const notification = useSelector((state) => state.notification)

    const toastIcon = {
        'default': 'fa-question',
        'info': 'fa-info',
        'warning': 'fa-exclamation',
        'success': 'fa-check',
        'error': 'fa-close',
        null: ''
    }[notification.colour]

    const toastColour = {
        'default': 'secondary',
        'info': 'primary',
        'warning': 'warning',
        'success': 'success',
        'error': 'danger',
        null: ''
    }[notification.colour]

    const toastContent = ({closeToast}) => (
        <Media>
            <Media middle left className="mr-3">
                <i className={`fa fa-fw fa-2x ${toastIcon}`}/>
            </Media>
            <Media body>
                <Media heading tag="h6">
                    {notification.title}
                </Media>
                <p>
                    {notification.message}
                </p>
                <div className="d-flex mt-2">
                    <Button color={toastColour} outline onClick={() => {
                        closeToast
                    }}
                    >Ok</Button>{' '}
                </div>
            </Media>
        </Media>
    );

    useEffect(() => {
        if (!notification.title || notification.title === "") {
            return
        }
        switch (notification.colour) {
            case 'info':
                toast.info(toastContent);
                break;
            case 'success':
                toast.success(toastContent);
                break;
            case 'warning':
                toast.warning(toastContent);
                break;
            case 'error':
                toast.error(toastContent);
                break;
            default:
                toast(toastContent);
                break;
        }
    }, [notification.created_at]);


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
            <ToastContainer
                position="bottom-right"
                autoClose={8000}
                draggable={false}
                hideProgressBar={false}
            />
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
