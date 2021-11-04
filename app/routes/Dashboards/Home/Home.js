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
                    title="Welcome to finsights :)"
                    className="mb-4 mb-lg-5"
                />
                <ul>
                    <li>Use the search above</li>
                    <li>Check the news section</li>
                </ul>
            </Col>
        </Row>
    </Container>
)
export default setupPage({
    pageTitle: 'Home'
})(Home);