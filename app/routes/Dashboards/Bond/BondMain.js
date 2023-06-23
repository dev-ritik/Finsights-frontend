import React from 'react';

import {Col, Container, Row, withPageConfig} from './../../../components';
import {HeaderMain} from "../../components/HeaderMain";
import BondFilter from "./BondFilter";
import {API_URL} from "../../../constants";
import axios from "axios";
import {addNotification} from "../../../redux/Notification";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";

class BondMain extends React.Component {

    title = "Bonds"

    INITIAL_STATE = {
        gold_price: 5000,
    }

    constructor(props) {
        super(props);
        this.state = _.clone(this.INITIAL_STATE);
    }

    componentDidMount() {
        this.fetchGoldPrice()
    }

    fetchGoldPrice() {
        axios.get(`${API_URL}/instrument/gold_price`, {}).then((res) => {
            this.setState({
                gold_price: res.data,
            })
        }).catch(() => {
            this.props.addNotification({
                title: "Error!", message: "Error occurred while fetching Gold price", colour: "error"
            });
        });
    }

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
                    <li>The maturity value of all SGB is assumed to be <b>{this.state.gold_price}</b></li>
                    <li>List of NCD issues 2023: <a href="https://www.chittorgarh.com/report/latest-ncd-issue-in-india/27/">Chittorgarh NCDs</a></li>
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

const mapDispatchToProps = (dispatch) => {
    return {
        addNotification: (alert) => {
            dispatch(addNotification(alert))
        },
    }
}

export default connect(null, mapDispatchToProps)(withPageConfig(BondMain));

BondMain.propTypes = {
    addNotification: PropTypes.func,
};

