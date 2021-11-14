import React from 'react';
import {Col, Container, Row, setupPage} from './../../../components';

import {HeaderMain} from "../../components/HeaderMain";


const About = () => (
    <Container>
        <Row className="mb-5">
            <Col lg={12}>
                <HeaderMain
                    title="About"
                    className="mb-4 mb-lg-5"
                />
                <h4 className="mt-5">Overview</h4>
                <p className="pb-1">
                    <strong>Finsights</strong> is an application endeavouring to help you with passive investments. We
                    aim to deliver quality analytics on securities like Equity for the Indian market.
                </p>
                <h4 className="mt-1">Contribute!<i className="fa fa-fw fa-smile-o"/></h4>
                <p className="pb-3">
                    Finsights is a hobby project. We continuously strive to add new and exciting features<i
                    className="fa fa-fw fa-bar-chart"/> while improving existing ones. We are always open to new ideas<i
                    className="fa fa-fw fa-lightbulb-o"/> to add value to the platform and your investment journey. If
                    you have something you would love to be available on a financial platform (not limited to just
                    analysis), feel free to get in touch with us. We really appreciate your feedback!.
                    <br/>
                    <br/>
                    This application right now is really underfunded. We have some recurring infrastructure costs to
                    cover as well. Please feel free to contribute to the application in any manner possible. Be it an
                    idea/ algorithm<i className="fa fa-fw fa-lightbulb-o"/>, frontend (React.js) or Backend (Django)
                    development<i className="fa fa-fw fa-code"/>, please reach us out at <a
                    href="mailto:ritikkne@gmail.com?subject=I%20would%20love%20to%20help%20with%20Finsights"
                    target="_blank" rel="noopener noreferrer">ritikkne@gmail.com</a>.
                    If you feel that the application was of value to you, please consider funding<i
                    className="fa fa-fw fa-heart"/> the project. As low as a cup of coffee<i
                    className="fa fa-fw fa-coffee"/> a month can go a long way in keeping our motivation up.
                    <br/>
                    <br/>
                    Thanks<i className="fa fa-fw fa-thumbs-up"/> & happy investing<i
                    className="fa fa-fw fa-line-chart"/>.
                </p>
            </Col>
        </Row>
    </Container>
)
export default setupPage({
    pageTitle: 'About'
})(About);