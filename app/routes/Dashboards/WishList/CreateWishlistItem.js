import React from 'react';

import {
    Button,
    ButtonGroup,
    ButtonToolbar,
    CardBody,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label,
    Row,
    UncontrolledButtonDropdown,
    UncontrolledTooltip
} from './../../../components';
import classes from "../../Forms/Sliders/Sliders.scss";
import Slider from "rc-slider";
import DatePicker from "react-datepicker";
import {ButtonInput} from "../../Forms/DatePicker/components";
import PropTypes from "prop-types";
import _ from "lodash";
import {ListGroup, ListGroupItem, Media, UncontrolledDropdown} from "reactstrap";
import ExtendedDropdown from "../../../components/ExtendedDropdown";
import {connect} from "react-redux";
import {addNotification} from "../../../redux/Notification";
import {checkAndFetchValidAccessKey} from "../../../redux/User";
import axios from "axios";
import {API_URL} from "../../../constants";


class CreateWishlistItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.data,
            stock_options: [],
            current_stock_display: "",
            dropdownOpen: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.setState({
            ..._.omit(this.props.data, ['stocks']),
            current_stock_display: (this.state.current_stock_display !== "" && this.props.data.stock_id === prevProps.data.stock_id) ? this.state.current_stock_display :
                this.getStockDetailFromId(this.props.data.stock_id).name
        })
    }

    componentDidUpdate(prevProps, prevState, ss) {
        if (this.props.data && (!_.isEqual(this.props.data, prevProps.data) || this.props.stocks.length !== prevProps.stocks.length)) {
            this.setState({
                ..._.omit(this.props.data, ['stocks']),
                current_stock_display: (this.state.current_stock_display !== "" && this.props.data.stock_id === prevProps.data.stock_id) ? this.state.current_stock_display :
                    this.getStockDetailFromId(this.props.data.stock_id).name
            })
        }
    }

    doSearch = (searchText) => {
        if (searchText.length < 2) {
            return
        }
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            const regex = new RegExp(`^${searchText}*`, 'i');
            const stocks = this.props.stocks.filter(
                value => regex.test(value.name) || regex.test(value.symbol))
            this.setState({
                ...this.state,
                stock_options: stocks
            })
        }, 400);
    }

    selectStock(stockId) {
        const stocks = this.props.stocks.filter(
            item => item.stock_id === Number(stockId));
        this.setState({
            ...this.state,
            current_stock_display: stocks[0].name,
            dropdownOpen: false,
            exchange_id: stocks[0].exchange,
        })
        this.props.data.stock_id = stockId
        if (stocks.length === 1)
            this.props.data.exchange_id = stocks[0].exchange
    }

    getStockDetailFromId(stockId) {
        const stocks = this.props.stocks.filter(
            item => item.stock_id === stockId);
        if (stocks.length !== 0) {
            return stocks[0]
        } else {
            return {
                name: "",
                symbol: "",
                stock_id: "",
                exchange: "",
            }
        }
    }

    copyItem(targetWishlist) {
        if (!('id' in this.props.data) || typeof this.props.data['id'] === 'undefined')
        {
            this.props.addNotification({
                title: "Error!",
                message: "Unsaved Wishlist",
                colour: "error"
            });
            return
        }
        checkAndFetchValidAccessKey().then(access => {
            axios.request({
                    method: 'POST',
                    url: `${API_URL}/portfolio/wishlistitem/${this.props.data['id']}/copy`,
                    headers: {
                        'Authorization': `Bearer ${access}`
                    },
                    data: {
                        'wishlist_id': targetWishlist.id
                    }
                }
            ).then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    this.props.addNotification({
                        title: "Error!",
                        message: "Unknown error occurred while getting a link",
                        colour: "error"
                    });
                    return
                }
                this.props.addNotification({
                    title: "Success!",
                    message: `Copied to ${targetWishlist.title}`,
                    colour: "success"
                });
            }).catch((error) => {
                if (!error.response && error.message === "Network Error") {
                    this.props.addNotification({
                        title: "Error!",
                        message: "Check your internet connection",
                        colour: "error"
                    });
                } else if (error.response.status === 400) {
                    let message = "";
                    for (const [key, value] of Object.entries(error.response.data)) {
                        message += value + " "
                    }
                    this.props.addNotification({
                        title: "Error!",
                        message: message,
                        colour: "error"
                    });
                } else {
                    this.props.addNotification({
                        title: "Error!",
                        message: "Unknown error occurred",
                        colour: "error"
                    });
                }
            });
        }).catch(e => {
            this.props.addNotification({
                title: "Error!",
                message: e.message,
                colour: "error"
            });
        });
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !_.isEqual(this.props.data, nextProps.data) || this.state !== nextState || this.props.stocks.length !== nextProps.stocks.length;
    }

    render() {
        return (
            <CardBody className="p-3">
                <div className="flex-column flex-md-row d-flex mb-2">
                    <ButtonToolbar className="ml-auto">
                        <ButtonGroup className="mr-2">
                            <UncontrolledButtonDropdown>
                                <DropdownToggle color="secondary" outline caret>
                                    <i className="fa fa-fw fa-copy mr-1"/>
                                    Copy
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>
                                        Your Wishlists
                                    </DropdownItem>
                                    {this.props.wishlists.map((wishlist) => {
                                        return <DropdownItem
                                            key={wishlist.id}
                                            onClick={() => this.copyItem(wishlist)}
                                        >
                                            {wishlist.title}
                                        </DropdownItem>;
                                    })}
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                            <Button className="text-decoration-none align-self-center" color="secondary" outline
                                    active={this.state.executed}
                                    id="execute"
                                    onClick={() => {
                                        this.props.data.executed = !this.state.executed
                                        this.setState({
                                            ...this.state,
                                            executed: !this.state.executed,
                                        })
                                    }
                                    }>
                                <i className="fa fa-fw fa-check"/>
                            </Button>
                            <UncontrolledTooltip placement="bottom" target="execute">
                                Mark as executed
                            </UncontrolledTooltip>
                            <Button className="text-decoration-none align-self-center" color="secondary" outline
                                    id="delete" onClick={() => this.props.deleteFunction(this.props.index)}>
                                <i className="fa fa-fw fa-trash"/>
                            </Button>
                            <UncontrolledTooltip placement="bottom" target="delete">
                                Delete
                            </UncontrolledTooltip>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
                <Form>
                    <FormGroup row className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="stock" sm={4}>
                            Stock
                        </Label>
                        <Col sm={8}>
                            <UncontrolledDropdown isOpen={this.state.dropdownOpen}>
                                <DropdownToggle nav>
                                    <InputGroup>
                                        <Input placeholder="Search Stock..."
                                               type="text"
                                               name="stock"
                                               id="stock"
                                               value={this.state.current_stock_display}
                                               onClick={() => {
                                                   this.setState({
                                                       ...this.state,
                                                       dropdownOpen: !this.state.dropdownOpen
                                                   });
                                               }}
                                               onChange={(e) => {
                                                   this.doSearch(e.target.value)
                                                   this.setState({
                                                       ...this.state,
                                                       current_stock_display: e.target.value,
                                                       dropdownOpen: true
                                                   });
                                               }}
                                        />
                                        <InputGroupAddon addonType="append">
                                            <UncontrolledButtonDropdown>
                                                <DropdownToggle color="secondary" outline caret>
                                                    {this.state.exchange_id || "Exchange"}
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem header>Select Folder:</DropdownItem>
                                                    <DropdownItem
                                                        onClick={(e) => {
                                                            this.props.data.exchange_id = e.currentTarget.textContent
                                                            this.setState({
                                                                ...this.state,
                                                                exchange_id: e.currentTarget.textContent,
                                                            })
                                                        }}
                                                    >
                                                        NSE
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        onClick={(e) => {
                                                            this.props.data.exchange_id = e.currentTarget.textContent
                                                            this.setState({
                                                                ...this.state,
                                                                exchange_id: e.currentTarget.textContent,
                                                            })
                                                        }}
                                                    >
                                                        BSE
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </DropdownToggle>
                                {this.state.stock_options.length > 0 && (

                                    <ExtendedDropdown className="ml-3">
                                        <ExtendedDropdown.Section list>
                                            <ListGroup>
                                                {this.state.stock_options.map((stock, index) => (
                                                    <ListGroupItem
                                                        key={index}
                                                        tag="button"
                                                        action
                                                        className="p-2"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            this.selectStock(stock.stock_id)
                                                        }}
                                                    >
                                                        <Media>
                                                            <Media body>
                                                                <span className="d-flex justify-content-start">
                                                                    <span
                                                                        className="h6 pb-0 mb-0 d-flex align-items-center">
                                                                            {stock.name}
                                                                    </span>
                                                                <span className="ml-auto small">{stock.symbol}</span>
                                                            </span>
                                                            </Media>
                                                        </Media>
                                                    </ListGroupItem>)
                                                )}
                                            </ListGroup>
                                        </ExtendedDropdown.Section>
                                    </ExtendedDropdown>
                                )}

                            </UncontrolledDropdown>
                        </Col>
                    </FormGroup>
                </Form>
                <Row className="ml-0 mr-0">
                    <Label for="buy" sm={2}>
                        Buy
                    </Label>
                    <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    Price
                                </InputGroupAddon>
                                <Input
                                    type="number"
                                    min="0.00"
                                    max="100000.00"
                                    step="0.05"
                                    name=""
                                    id="buy_price"
                                    placeholder="₹"
                                    onChange={(e) => {
                                        this.setState({
                                            ...this.state,
                                            buy_price: e.target.value,
                                        })
                                    }}
                                    onBlur={(e) => {
                                        this.props.data.buy_price = e.target.value
                                    }}
                                    value={this.state.buy_price || ""}
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    Pieces
                                </InputGroupAddon>
                                <Input
                                    type="number"
                                    min="0"
                                    step="1"
                                    name=""
                                    id="piece"
                                    placeholder="1"
                                    onChange={(e) => {
                                        this.setState({
                                            ...this.state,
                                            buy_piece: e.target.value,
                                        })
                                    }}
                                    onBlur={(e) => {
                                        this.props.data.buy_piece = e.target.value
                                    }}
                                    value={this.state.buy_piece || ""}
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className="m-1">
                            <Row className="ml-1">
                                <Label for="buy_feeling" sm={3}>
                                    Feeling
                                </Label>
                                <Col sm={4}>
                                    <div className={`${classes.rangeSliderWrap} ${classes.block_slider}`}>
                                        <Slider min={0}
                                                max={5}
                                                step={1}
                                                marks={{0: "x", 1: "🤔", 5: "🚀"}}
                                                onChange={(e) => {
                                                    if (e === 0)
                                                        e = null
                                                    this.props.data.buy_feeling = e
                                                    this.setState({
                                                        ...this.state,
                                                        buy_feeling: e,
                                                    })
                                                }}
                                                value={this.state.buy_feeling || 0}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="to" sm={4}>
                                Execute by
                            </Label>
                            <Col sm={2}>
                                <DatePicker
                                    customInput={<ButtonInput/>}
                                    selected={this.state.buy_valid_till}
                                    onChange={(date) => {
                                        this.props.data.buy_valid_till = date
                                        this.setState({
                                            ...this.state,
                                            buy_valid_till: date,
                                        })
                                    }}
                                    className="mb-2"
                                />
                            </Col>
                        </FormGroup>
                    </Form>
                </Row>
                <Row className="ml-0 mr-0">
                    <Label for="sell" sm={2}>
                        Sell
                    </Label>
                    <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    Price
                                </InputGroupAddon>
                                <Input
                                    type="number"
                                    min="0.00"
                                    max="100000.00"
                                    step="0.05"
                                    name=""
                                    id="sell_price"
                                    placeholder="₹"
                                    onChange={(e) => {
                                        this.setState({
                                            ...this.state,
                                            sell_price: e.target.value,
                                        })
                                    }}
                                    onBlur={(e) => {
                                        this.props.data.sell_price = e.target.value
                                    }}
                                    value={this.state.sell_price || ""}
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    Quantity
                                </InputGroupAddon>
                                <Input
                                    type="number"
                                    min="0.0"
                                    max="100.0"
                                    step="0.1"
                                    name=""
                                    id="quantity"
                                    placeholder="100"
                                    onChange={(e) => {
                                        this.setState({
                                            ...this.state,
                                            sell_quantity: e.target.value,
                                        })
                                    }}
                                    onBlur={(e) => {
                                        this.props.data.sell_quantity = e.target.value
                                    }}
                                    value={this.state.sell_quantity || ""}
                                />
                                <InputGroupAddon addonType="append">%</InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className="m-1">
                            <Row className="ml-1">
                                <Label for="sell_feeling" sm={3}>
                                    Feeling
                                </Label>
                                <Col sm={4}>
                                    <div className={`${classes.rangeSliderWrap} ${classes.block_slider}`}>
                                        <Slider min={0}
                                                max={5}
                                                step={1}
                                                marks={{0: "x", 1: "🤔", 5: "🚀"}}
                                                onChange={(e) => {
                                                    if (e === 0)
                                                        e = null
                                                    this.props.data.sell_feeling = e
                                                    this.setState({
                                                        ...this.state,
                                                        sell_feeling: e,
                                                    })
                                                }}
                                                value={this.state.sell_feeling || 0}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="to" sm={4}>
                                Execute by
                            </Label>
                            <Col sm={2}>
                                <DatePicker
                                    customInput={<ButtonInput/>}
                                    selected={this.state.sell_valid_till}
                                    onChange={(date) => {
                                        this.props.data.sell_valid_till = date
                                        this.setState({
                                            ...this.state,
                                            sell_valid_till: date,
                                        })
                                    }}
                                    className="mb-2"
                                />
                            </Col>
                        </FormGroup>
                    </Form>
                </Row>
                <Form>
                    <FormGroup row>
                        <Label for="hold_label" sm={4}>
                            Hold
                        </Label>
                        <Label for="hold_feeling" sm={4}>
                            Feeling
                        </Label>
                        <Col sm={4}>
                            <div className={`${classes.rangeSliderWrap} ${classes.block_slider}`}>
                                <Slider min={0}
                                        max={5}
                                        step={1}
                                        marks={{0: "x", 1: "🤔", 5: "🚀"}}
                                        onChange={(e) => {
                                            if (e === 0)
                                                e = null
                                            this.props.data.hold_feeling = e
                                            this.setState({
                                                ...this.state,
                                                hold_feeling: e,
                                            })
                                        }}
                                        value={this.state.hold_feeling || 0}
                                />
                            </div>
                        </Col>
                    </FormGroup>
                    <FormGroup row className="mb-0 mr-sm-2 mb-sm-0">
                        <Label for="item_comment" sm={4}>
                            Comment
                        </Label>
                        <Col sm={8}>
                            <Input
                                type="textarea"
                                name="text"
                                id="item_comment"
                                placeholder="Comments..."
                                className="mb-2"
                                onChange={(e) => {
                                    this.setState({
                                        ...this.state,
                                        comment: e.target.value,
                                    })
                                }}
                                onBlur={(e) => {
                                    this.props.data.comment = e.target.value
                                }}
                                value={this.state.comment || ""}
                            />
                        </Col>
                    </FormGroup>
                </Form>
            </CardBody>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        wishlists: state.wishlists
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addNotification: (alert) => {
            dispatch(addNotification(alert))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateWishlistItem);

CreateWishlistItem.propTypes = {
    wishlists: PropTypes.array,
    stocks: PropTypes.array,
    updateFunction: PropTypes.func,
    deleteFunction: PropTypes.func,
    index: PropTypes.number,
    data: PropTypes.object,
    addNotification: PropTypes.func,
};

CreateWishlistItem.defaultProps = {
    stocks: []
};