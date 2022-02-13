import React from 'react';
import {Link} from 'react-router-dom';

import {
    Avatar,
    AvatarAddOn,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Sidebar,
    UncontrolledButtonDropdown
} from './../../../components';
import {randomAvatar} from './../../../utilities';
import {useDispatch, useSelector} from "react-redux";
import {PLACEHOLDER_USERNAME, UNKNOWN_USERNAME} from "../../../constants";
import {Button} from "reactstrap";
import {logout} from "../../../redux/User";
import PropTypes from "prop-types";

const avatarImg = randomAvatar();

const SidebarTopA = (props) => {
    const userInfo = useSelector((state) => state.userInfo)
    const dispatch = useDispatch()

    return (
        <React.Fragment>
            { /* START: Sidebar Default */}
            <Sidebar.HideSlim>
                <Sidebar.Section className="pt-0">
                    <Link to="/" className="d-block">
                        <Sidebar.HideSlim>
                            <Avatar.Image
                                size="lg"
                                src={avatarImg}
                                addOns={[
                                    <AvatarAddOn.Icon
                                        className="fa fa-circle"
                                        color="white"
                                        key="avatar-icon-bg"
                                    />,
                                    <AvatarAddOn.Icon
                                        className="fa fa-circle"
                                        color="success"
                                        key="avatar-icon-fg"
                                    />
                                ]}
                            />
                        </Sidebar.HideSlim>
                    </Link>

                    <UncontrolledButtonDropdown>
                        <DropdownToggle color="link" className="pl-0 pb-0 btn-profile sidebar__link">
                            {userInfo.refreshToken ? (userInfo.fullName ? userInfo.fullName : UNKNOWN_USERNAME) : PLACEHOLDER_USERNAME}
                            <i className="fa fa-angle-down ml-2"/>
                        </DropdownToggle>
                        <DropdownMenu persist>
                            {userInfo.refreshToken ? (
                                <>
                                    <DropdownItem tag={Link} to="/profile">
                                        My Profile
                                    </DropdownItem>
                                    <DropdownItem divider/>
                                    <DropdownItem tag={Button} onClick={() => {
                                        dispatch(logout());
                                        props.history.push(`/login`)
                                    }}>
                                        <i className="fa fa-fw fa-sign-out mr-2"/>
                                        Sign Out
                                    </DropdownItem>
                                </>
                            ) : (
                                <DropdownItem tag={Link} to="/login">
                                    Login
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    {/*<div className="small sidebar__link--muted">*/}
                    {/*    Engineer*/}
                    {/*</div>*/}
                </Sidebar.Section>
            </Sidebar.HideSlim>
            { /* END: Sidebar Default */}

            { /* START: Sidebar Slim */}
            <Sidebar.ShowSlim>
                <Sidebar.Section>
                    <Avatar.Image
                        size="sm"
                        src={avatarImg}
                        addOns={[
                            <AvatarAddOn.Icon
                                className="fa fa-circle"
                                color="white"
                                key="avatar-icon-bg"
                            />,
                            <AvatarAddOn.Icon
                                className="fa fa-circle"
                                color="success"
                                key="avatar-icon-fg"
                            />
                        ]}
                    />
                </Sidebar.Section>
            </Sidebar.ShowSlim>
            { /* END: Sidebar Slim */}
        </React.Fragment>
    )
}

SidebarTopA.propTypes = {
    history: PropTypes.object
}

export {SidebarTopA};
