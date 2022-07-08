import React from 'react';

import {Col, Container, Row} from './../../../components';
import {HeaderMain} from "../../components/HeaderMain";
import BondFilter from "./BondFilter";

class BondMain extends React.Component {

    title = "Bonds"

    render() {
        return <React.Fragment>
            <Container>
                <HeaderMain
                    title={this.title}
                    className="mb-5 mt-4"
                />
                <ul className="mb-5">
                    <li>Returns (and sort by returns) can be incorrect. <i>The numbers calculated here are for a natural
                        cash-flow distribution. However, this may not be the case for all the bonds.</i>
                    </li>
                    <li>LTP and Volume information can be old</li>
                </ul>
                <Row>
                    <Col lg={12}>
                        <BondFilter {...this.props}/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    }
}

export default BondMain;
