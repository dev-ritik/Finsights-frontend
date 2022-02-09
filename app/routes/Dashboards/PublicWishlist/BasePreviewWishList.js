import React from 'react';

import {Col, Container, Row} from './../../../components';
import {HeaderMain} from "../../components/HeaderMain";
import PropTypes from "prop-types";
import PublicWishlistDisplay from "./PublicWishlistDisplay";
import PreviewWishlistDisplay from "./PreviewWishlistDisplay";

class BasePreviewWishList extends React.Component {

    title = "BasePreviewWishList"
    WishlistDisplay = PublicWishlistDisplay

    get_public_id(page_props) {
        if (typeof page_props.match === 'undefined'
            || typeof page_props.match.params === 'undefined' || typeof page_props.match.params.id === 'undefined') {
            return "";
        } else {
            return page_props.match.params.id;
        }
    }

    render() {
        return <React.Fragment>
            <Container>
                <HeaderMain
                    title={this.title}
                    className="mb-5 mt-4"
                />
                <Row>
                    <Col lg={12}>
                        <this.WishlistDisplay {...this.props} slugId={this.get_public_id(this.props)}/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    }
}

class PublicWishList extends BasePreviewWishList {

    title = "Public Wishlist"
    WishlistDisplay = PublicWishlistDisplay
}

class PreviewWishList extends BasePreviewWishList {

    title = "Preview Wishlist"
    WishlistDisplay = PreviewWishlistDisplay
}

export {PublicWishList, PreviewWishList};

BasePreviewWishList.propTypes = {
    match: PropTypes.shape({params: PropTypes.any}),
};