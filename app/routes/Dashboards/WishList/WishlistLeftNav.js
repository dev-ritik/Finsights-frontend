import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';

import {Nav, NavItem, NavLink} from './../../../components';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addNotification} from "../../../redux/Notification";
import {update} from "../../../redux/Wishlists";


class WishlistLeftNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wishlists: [],
        };
    }

    componentDidMount() {
        this.props.updateWishlist()
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
                            <i className="fa fa-angle-down align-self-center ml-auto"/>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        {this.props.wishlists.map(function (wishlist) {
                            return <NavLink tag={RouterNavLink} to={`/wishlist/${wishlist.id}`} className="d-flex"
                                            key={wishlist.id}>
                                {wishlist.title}
                            </NavLink>;
                        })}
                    </NavItem>
                    <NavItem>
                        <NavLink tag={RouterNavLink} to={`/wishlist`} exact>
                            <i className="fa fa-fw fa-plus mr-2"/>
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
        wishlists: state.wishlists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNotification: (alert) => {
            dispatch(addNotification(alert))
        },
        updateWishlist: () => {
            dispatch(update())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishlistLeftNav);

WishlistLeftNav.propTypes = {
    wishlists: PropTypes.array,
    addNotification: PropTypes.func,
    updateWishlist: PropTypes.func,
};