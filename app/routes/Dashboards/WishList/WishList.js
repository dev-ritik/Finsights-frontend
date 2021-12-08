import React from 'react';

import {Col, Container, Row} from './../../../components';
import {HeaderMain} from "../../components/HeaderMain";
import WishlistLeftNav from "./WishlistLeftNav";
import PropTypes from "prop-types";
import CreateWishlist from "./CreateWishlist";

class WishList extends React.Component {

    get_wishlist_id(page_props) {
        if (typeof page_props.match === 'undefined'
            || typeof page_props.match.params === 'undefined' || typeof page_props.match.params.id === 'undefined') {
            return -1;
        } else {
            return Number(page_props.match.params.id);
        }
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                    <HeaderMain
                        title="Wishlist"
                        className="mb-5 mt-4"
                    />
                    <Row>
                        <Col lg={3}>
                            <WishlistLeftNav/>
                        </Col>
                        <Col lg={9}>
                            <CreateWishlist {...this.props} wishlistId={this.get_wishlist_id(this.props)}/>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

export default WishList;

WishList.propTypes = {
    match: PropTypes.shape({params: PropTypes.any}),
};