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
