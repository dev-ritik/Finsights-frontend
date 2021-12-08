import React from 'react';

import {Col, Container, Row} from './../../../components';
import {HeaderMain} from "../../components/HeaderMain";
import PropTypes from "prop-types";
import PublicWishlistDisplay from "./PublicWishlistDisplay";

class PublicWishList extends React.Component {

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
                    title="Wishlist"
                    className="mb-5 mt-4"
                />
                <Row>
                    <Col lg={12}>
                        <PublicWishlistDisplay {...this.props} publicId={this.get_public_id(this.props)}/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    }
}

export default PublicWishList;

PublicWishList.propTypes = {
    match: PropTypes.shape({params: PropTypes.any}),
};