import {Col, Form, FormGroup, Input, Label, Row} from './../../../components';
import DatePicker from "react-datepicker";
import {ButtonInput} from "../../Forms/DatePicker/components";
import PropTypes from "prop-types";
import {addAlert} from "../../../redux/Alert";

import React from 'react';
import {connect} from "react-redux";
import _ from "lodash";

class CreateWishlistHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.data;
    }

    componentDidUpdate(prevProps, prevState, ss) {
        if (this.props.data && !_.isEqual(this.props.data, prevProps.data)) {
            this.setState({
                ...this.props.data,
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !_.isEqual(this.props.data, nextProps.data) || this.state !== nextState || this.props.stocks.length !== nextProps.stocks.length;
    }

    render() {
        return (
            <Form className="m-2">
                <FormGroup row>
                    <Label for="title" sm={4}>
                        Title
                    </Label>
                    <Col sm={8}>
                        <Input
                            type="text"
                            name=""
                            id="title"
                            placeholder="Enter title..."
                            onChange={(e) => {
                                this.setState({
                                    ...this.state,
                                    title: e.target.value
                                })
                            }}
                            onBlur={(e) => {
                                this.props.updateField('title', e.target.value)
                            }}
                            value={this.state.title || ""}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="description" sm={4}>
                        Description
                    </Label>
                    <Col sm={8}>
                        <Input
                            type="textarea"
                            name="text"
                            id="description"
                            placeholder="Enter a description..."
                            className="mb-2"
                            onChange={(e) => {
                                this.setState({
                                    ...this.state,
                                    description: e.target.value
                                })
                            }}
                            onBlur={(e) => {
                                this.props.updateField('description', e.target.value)
                            }}
                            value={this.state.description || ""}
                        />
                    </Col>
                </FormGroup>
                <Row>
                    <Col md={6}>
                        <FormGroup row>
                            <Label for="from" sm={4}>
                                From
                            </Label>
                            <Col sm={2}>

                                <DatePicker
                                    customInput={<ButtonInput/>}
                                    selected={this.state.from}
                                    onChange={(date) => {
                                        if (this.state.to && this.state.to < date) {
                                            this.props.addAlert({
                                                title: "Error!",
                                                message: "To date cannot be less than from date",
                                                colour: "danger"
                                            });
                                        } else {
                                            this.props.updateField('from', date)
                                            this.setState({
                                                ...this.state,
                                                from: date
                                            })
                                        }
                                    }}
                                    className="mb-2"
                                />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup row>
                            <Label for="to" sm={4}>
                                To
                            </Label>
                            <Col sm={2}>
                                <DatePicker
                                    customInput={<ButtonInput/>}
                                    selected={this.state.to}
                                    onChange={(date) => {
                                        if (this.state.from > date) {
                                            this.props.addAlert({
                                                title: "Error!",
                                                message: "To date cannot be less than from date",
                                                colour: "danger"
                                            });
                                        } else {
                                            this.props.updateField('to', date)
                                            this.setState({
                                                ...this.state,
                                                to: date
                                            })
                                        }
                                    }}
                                    className="mb-2"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                />
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup row>
                    <Label for="comment" sm={4}>
                        Comment
                    </Label>
                    <Col sm={8}>
                        <Input
                            type="textarea"
                            name="text"
                            id="comment"
                            placeholder="Comments..."
                            className="mb-2"
                            onChange={(e) => {
                                this.setState({
                                    ...this.state,
                                    comment: e.target.value
                                })
                            }}
                            onBlur={(e) => {
                                this.props.updateField('comment', e.target.value)
                            }}
                            value={this.state.comment || ""}
                        />
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addAlert: (alert) => {
            dispatch(addAlert(alert))
        },
    }
}

export default connect(null, mapDispatchToProps)(CreateWishlistHeader);

CreateWishlistHeader.propTypes = {
    stocks: PropTypes.array,
    updateField: PropTypes.func,
    index: PropTypes.number,
    data: PropTypes.object,
    addAlert: PropTypes.func,
};

CreateWishlistHeader.defaultProps = {
    stocks: []
};