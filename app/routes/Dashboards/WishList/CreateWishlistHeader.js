import {Col, Form, FormGroup, Input, Label} from './../../../components';
import DatePicker from "react-datepicker";
import {ButtonInput} from "../../Forms/DatePicker/components";
import PropTypes from "prop-types";

import React from 'react';
import {connect} from "react-redux";
import _ from "lodash";
import {addNotification} from "../../../redux/Notification";

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
            <Form className="p-3">
                {/* Title */}
                <FormGroup row>
                    <Label for="title" sm={3}>Title</Label>
                    <Col sm={9}>
                        <Input
                            id="title"
                            type="text"
                            placeholder="Enter title..."
                            value={this.state.title || ""}
                            onChange={(e) => this.setState({title: e.target.value})}
                            onBlur={(e) => this.props.updateField('title', e.target.value)}
                        />
                    </Col>
                </FormGroup>

                {/* Description */}
                <FormGroup row>
                    <Label for="description" sm={3}>Description</Label>
                    <Col sm={9}>
                        <Input
                            id="description"
                            type="textarea"
                            rows={3}
                            placeholder="Enter a description..."
                            value={this.state.description || ""}
                            onChange={(e) => this.setState({description: e.target.value})}
                            onBlur={(e) => this.props.updateField('description', e.target.value)}
                        />
                    </Col>
                </FormGroup>

                {/* Date Range */}
                <FormGroup row>
                    <Label sm={3}>Date Range</Label>
                    <Col sm={4}>
                        <DatePicker
                            customInput={<ButtonInput/>}
                            selected={this.state.from || ""}
                            placeholderText="From"
                            className="form-control"
                            onChange={(date) => {
                                if (this.state.to && this.state.to < date) {
                                    this.props.addNotification({
                                        title: "Error!",
                                        message: "To date cannot be less than from date",
                                        colour: "error"
                                    });
                                } else {
                                    this.props.updateField('from', date);
                                    this.setState({from: date});
                                }
                            }}
                        />
                    </Col>
                    <Col sm={4}>
                        <DatePicker
                            customInput={<ButtonInput/>}
                            selected={this.state.to || ""}
                            placeholderText="To"
                            className="form-control"
                            onChange={(date) => {
                                if (this.state.from && this.state.from > date) {
                                    this.props.addNotification({
                                        title: "Error!",
                                        message: "To date cannot be less than from date",
                                        colour: "error"
                                    });
                                } else {
                                    this.props.updateField('to', date);
                                    this.setState({to: date});
                                }
                            }}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                        />
                    </Col>
                </FormGroup>

                {/* Comment */}
                <FormGroup row>
                    <Label for="comment" sm={3}>Comment</Label>
                    <Col sm={9}>
                        <Input
                            id="comment"
                            type="textarea"
                            rows={2}
                            placeholder="Comments..."
                            value={this.state.comment || ""}
                            onChange={(e) => this.setState({comment: e.target.value})}
                            onBlur={(e) => this.props.updateField('comment', e.target.value)}
                        />
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addNotification: (alert) => {
            dispatch(addNotification(alert))
        },
    }
}

export default connect(null, mapDispatchToProps)(CreateWishlistHeader);

CreateWishlistHeader.propTypes = {
    stocks: PropTypes.array,
    updateField: PropTypes.func,
    index: PropTypes.number,
    data: PropTypes.object,
    addNotification: PropTypes.func,
};

CreateWishlistHeader.defaultProps = {
    stocks: []
};