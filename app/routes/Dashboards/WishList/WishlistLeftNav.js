import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';

import {Nav, NavItem, NavLink} from './../../../components';
import axios from "axios";
import {API_URL} from "../../../constants";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {checkAndFetchValidAccessKey} from "../../../redux/User";
import {addNotification} from "../../../redux/Notification";


class WishlistLeftNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wishlists: [],
        };
    }

    componentDidMount() {
        this.performQuery()
    }

    performQuery = () => {
        checkAndFetchValidAccessKey().then(access => {
            axios.get(`${API_URL}/portfolio/wishlists`, {
                    headers: {
                        'Authorization': `Bearer ${access}`
                    }
                }
            ).then(res => {
                this.setState({wishlists: res.data})
            }).catch(() => {
                this.props.addNotification({
                    title: "Error!",
                    message: "Error occurred while fetching existing wishlist",
                    colour: "error"
                });
            });
        }).catch(e => {
            this.props.addNotification({
                title: "Error!",
                message: e.message,
                colour: "error"
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                <Nav vertical pills className="mb-3">
                    <NavItem>
                        <NavLink href="#" className="small d-flex px-1">
                    <span>
                        My Wishlists
                    </span>
                            <i className="fa fa-angle-down align-self-center ml-auto"></i>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        {this.state.wishlists.map(function (wishlist) {
                            return <NavLink tag={RouterNavLink} to={`/wishlist/${wishlist.id}`} className="d-flex"
                                            key={wishlist.id}>
                                {wishlist.title}
                            </NavLink>;
                        })}
                    </NavItem>
                    <NavItem>
                        <NavLink tag={RouterNavLink} to={`/wishlist`} exact>
                            <i className="fa fa-fw fa-plus mr-2"></i>
                            Add New Wishlist
                        </NavLink>
                    </NavItem>
                </Nav>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        userInfo: state.userInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNotification: (alert) => {
            dispatch(addNotification(alert))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishlistLeftNav);

WishlistLeftNav.propTypes = {
    userInfo: PropTypes.object,
    addNotification: PropTypes.func,
};