import React from 'react';
import {
    Col,
    Container,
    Row, setupPage
} from './../../../components';

import {HeaderMain} from "../../components/HeaderMain";


const Home = () => (
    <Container>
        <Row className="mb-5">
            <Col lg={12}>
                <HeaderMain
                    title="Welcome to finsights"
                    className="mb-4 mb-lg-5"
                />
                <p>
                    Use the search above :)
                </p>
            </Col>
        </Row>
    </Container>
)
export default setupPage({
    pageTitle: 'Home'
})(Home);