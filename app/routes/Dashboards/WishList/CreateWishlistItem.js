import React from 'react';

import {
    Button,
    ButtonGroup,
    CardBody,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    UncontrolledButtonDropdown,
    UncontrolledTooltip
} from './../../../components';
import Slider from "rc-slider";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import _ from "lodash";
import {ListGroup, ListGroupItem, Media, UncontrolledDropdown} from "reactstrap";
import ExtendedDropdown from "../../../components/ExtendedDropdown";
import {connect} from "react-redux";
import {addNotification} from "../../../redux/Notification";
import {checkAndFetchValidAccessKey} from "../../../redux/User";
import axios from "axios";
import {API_URL} from "../../../constants";

const FeelingSlider = ({value, onChange}) => (<div style={{width: "100%"}}>
    <Slider
        min={0}
        max={5}
        step={1}
        marks={{
            0: <span className="text-gray-400">❌</span>,
            1: <span className="text-yellow-500 text-lg">🤔</span>,
            2: <span className="text-blue-400">😐</span>,
            3: <span className="text-green-500">👍</span>,
            4: <span className="text-green-600">💪</span>,
            5: <span className="text-green-700 text-lg">🚀</span>,
        }}
        value={value || 0}
        onChange={(val) => onChange(val === 0 ? null : val)}
        trackStyle={[{background: "linear-gradient(to right, #22c55e, #3b82f6)"}]}
        railStyle={{backgroundColor: "#e5e7eb", height: 6}}
        handleStyle={[
            {
                borderColor: "#3b82f6",
                height: 18,
                width: 18,
                marginTop: -6,
                backgroundColor: "#fff",
                boxShadow: "0 0 6px rgba(59,130,246,0.6)",
            },
        ]}
    />
</div>);

class CreateWishlistItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.data, stock_options: [], current_stock_display: "", dropdownOpen: false, deleteModal: false,
        };
        this.toggle = this.toggle.bind(this);
        this.unique_id = _.uniqueId("item-")
    }

    componentDidMount() {
        this.setState({
            ..._.omit(this.props.data, ['stocks']),
            current_stock_display: (this.state.current_stock_display !== "" && this.props.data.stock_id === prevProps.data.stock_id) ? this.state.current_stock_display : this.getStockDetailFromId(this.props.data.stock_id).name
        })
    }

    componentDidUpdate(prevProps, prevState, ss) {
        if (this.props.data && (!_.isEqual(this.props.data, prevProps.data) || this.props.stocks.length !== prevProps.stocks.length)) {
            // Update state if related props are changed
            this.setState({
                ..._.omit(this.props.data, ['stocks']),
                current_stock_display: (this.state.current_stock_display !== "" && this.props.data.stock_id === prevProps.data.stock_id) ? this.state.current_stock_display : this.getStockDetailFromId(this.props.data.stock_id).name
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
            const stocks = this.props.stocks.filter(value => regex.test(value.name) || regex.test(value.symbol))
            this.setState({
                stock_options: stocks
            })
        }, 400);
    }

    selectStock(stockId) {
        const stocks = this.props.stocks.filter(item => item.stock.id === Number(stockId));
        this.setState({
            current_stock_display: stocks[0].name, dropdownOpen: false, exchange_id: stocks[0].exchange,
        })
        this.props.updateItemFunction(this.props.index, 'stock_id', stockId)
        if (stocks.length === 1) this.props.updateItemFunction(this.props.index, 'exchange_id', stocks[0].exchange)
    }

    getStockDetailFromId(stockId) {
        const stocks = this.props.stocks.filter(item => item.stock.id === stockId);
        if (stocks.length !== 0) {
            return stocks[0]
        } else {
            return {
                name: "", symbol: "", stock_id: "", exchange: "",
            }
        }
    }

    copyItem(targetWishlist) {
        if (!('id' in this.props.data) || typeof this.props.data['id'] === 'undefined') {
            this.props.addNotification({
                title: "Error!", message: "Unsaved Wishlist", colour: "error"
            });
            return
        }
        checkAndFetchValidAccessKey().then(access => {
            axios.request({
                method: 'POST', url: `${API_URL}/portfolio/wishlistitem/${this.props.data['id']}/copy`, headers: {
                    'Authorization': `Bearer ${access}`
                }, data: {
                    'wishlist_id': targetWishlist.id
                }
            }).then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    this.props.addNotification({
                        title: "Error!", message: "Unknown error occurred while getting a link", colour: "error"
                    });
                    return
                }
                this.props.addNotification({
                    title: "Success!", message: `Copied to ${targetWishlist.title}`, colour: "success"
                });
            }).catch((error) => {
                if (!error.response && error.message === "Network Error") {
                    this.props.addNotification({
                        title: "Error!", message: "Check your internet connection", colour: "error"
                    });
                } else if (error.response.status === 400) {
                    let message = "";
                    for (const [, value] of Object.entries(error.response.data)) {
                        message += value + " "
                    }
                    this.props.addNotification({
                        title: "Error!", message: message, colour: "error"
                    });
                } else {
                    this.props.addNotification({
                        title: "Error!", message: "Unknown error occurred", colour: "error"
                    });
                }
            });
        }).catch(e => {
            this.props.addNotification({
                title: "Error!", message: e.message, colour: "error"
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
        const {
            executed,
            hold_feeling,
            comment,
        } = this.state;

        return (<CardBody className="p-3">
            {/* Toolbar */}
            <div className="d-flex justify-content-end mb-3">
                <ButtonGroup>
                    <UncontrolledButtonDropdown>
                        <DropdownToggle color="secondary" outline caret>
                            Copy
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Your Wishlists</DropdownItem>
                            {this.props.wishlists.map((wl) => (<DropdownItem
                                key={wl.id}
                                onClick={() => this.copyItem(wl)}
                            >
                                {wl.title}
                            </DropdownItem>))}
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    <Button
                        color="secondary"
                        outline
                        active={executed}
                        id="execute"
                        onClick={() => {
                            this.props.updateItemFunction(this.props.index, 'executed', !this.state.executed)
                            this.setState({
                                executed: !this.state.executed,
                            })
                        }}
                    >
                        <i className="fa fa-fw fa-check"/>
                    </Button>
                    <UncontrolledTooltip placement="bottom" target="execute">
                        Mark as executed
                    </UncontrolledTooltip>
                    <Button
                        color="secondary"
                        outline
                        onClick={() => this.setState({deleteModal: true})}
                    >
                        <i className="fa fa-fw fa-trash"/>
                    </Button>
                </ButtonGroup>
            </div>

            {/* Stock Selection */}
            <FormGroup row>
                <Label for="stock" sm={2}>
                    Stock
                </Label>
                <Col sm={10}>
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
                                               dropdownOpen: !this.state.dropdownOpen
                                           });
                                       }}
                                       onChange={(e) => {
                                           this.doSearch(e.target.value)
                                           this.setState({
                                               current_stock_display: e.target.value, dropdownOpen: true
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
                                                    this.props.updateItemFunction(this.props.index, 'exchange_id', e.currentTarget.textContent)
                                                    this.setState({
                                                        exchange_id: e.currentTarget.textContent,
                                                    })
                                                }}
                                            >
                                                NSE
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={(e) => {
                                                    this.props.updateItemFunction(this.props.index, 'exchange_id', e.currentTarget.textContent)
                                                    this.setState({
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
                                        {this.state.stock_options.map((stock, index) => (<ListGroupItem
                                            key={index}
                                            tag="button"
                                            action
                                            className="p-2"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                this.selectStock(stock.stock.id)
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
                                        </ListGroupItem>))}
                                    </ListGroup>
                                </ExtendedDropdown.Section>
                            </ExtendedDropdown>)}

                    </UncontrolledDropdown>
                </Col>
            </FormGroup>

            <Row className="align-items-center mb-3">
                <Col sm={2}>
                    <Label>Buy</Label>
                </Col>
                <Col sm={3}>
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
                                    buy_price: e.target.value,
                                })
                            }}
                            onBlur={(e) => {
                                this.props.updateItemFunction(this.props.index, 'buy_price', e.target.value)
                            }}
                            value={this.state.buy_price || ""}
                        />
                    </InputGroup>
                </Col>
                <Col sm={3}>
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
                                    buy_piece: e.target.value,
                                })
                            }}
                            onBlur={(e) => {
                                this.props.updateItemFunction(this.props.index, 'buy_piece', e.target.value)
                            }}
                            value={this.state.buy_piece || ""}
                        />
                    </InputGroup>
                </Col>
                <Col sm={2}>
                    <FeelingSlider value={this.state.buy_feeling}
                                   onChange={(e) => {
                                       this.setState({
                                           buy_feeling: e,
                                       })
                                       this.props.updateItemFunction(this.props.index, 'buy_feeling', e)
                                   }}/>
                </Col>
                <Col sm={2}>
                    <DatePicker
                        selected={this.state.buy_valid_till}
                        onChange={(date) => {
                            this.props.updateItemFunction(this.props.index, 'buy_valid_till', date)
                            this.setState({
                                buy_valid_till: date,
                            })
                        }}
                        placeholderText="Valid till"
                        className="form-control"/>
                </Col>
            </Row>
            <Row className="align-items-center mb-3">
                <Col sm={2}>
                    <Label>Sell</Label>
                </Col>
                <Col sm={3}>
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
                                    sell_price: e.target.value,
                                })
                            }}
                            onBlur={(e) => {
                                this.props.updateItemFunction(this.props.index, 'sell_price', e.target.value)
                            }}
                            value={this.state.sell_price || ""}
                        />
                    </InputGroup>
                </Col>
                <Col sm={3}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            Qty
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
                                    sell_quantity: e.target.value,
                                })
                            }}
                            onBlur={(e) => {
                                this.props.updateItemFunction(this.props.index, 'sell_quantity', e.target.value)
                            }}
                            value={this.state.sell_quantity || ""}
                        />
                        <InputGroupAddon addonType="append">%</InputGroupAddon>
                    </InputGroup>
                </Col>
                <Col sm={2}>
                    <FeelingSlider value={this.state.sell_feeling}
                                   onChange={(e) => {
                                       this.setState({
                                           sell_feeling: e,
                                       })
                                       this.props.updateItemFunction(this.props.index, 'sell_feeling', e)
                                   }}/>
                </Col>
                <Col sm={2}>
                    <DatePicker
                        selected={this.state.sell_valid_till}
                        onChange={(date) => {
                            this.props.updateItemFunction(this.props.index, 'sell_valid_till', date)
                            this.setState({
                                sell_valid_till: date,
                            })
                        }}
                        placeholderText="Valid till"
                        className="form-control"/>
                </Col>
            </Row>

            {/* Hold Section */
            }
            <FormGroup row>
                <Label sm={2}>Hold</Label>
                <Col sm={10}>
                    <FeelingSlider
                        value={hold_feeling}
                        onChange={(e) => {
                            this.setState({
                                hold_feeling: e,
                            })
                            this.props.updateItemFunction(this.props.index, 'hold_feeling', e)
                        }}/>
                </Col>
            </FormGroup>

            {/* Comment */
            }
            <FormGroup>
                <Label for="comment">Comment</Label>
                <Input
                    type="textarea"
                    id="comment"
                    placeholder="Your notes..."
                    value={comment}
                    onChange={(e) => this.setState({comment: e.target.value})}
                    onBlur={(e) => {
                        this.props.updateItemFunction(this.props.index, 'comment', e.target.value)
                    }}
                />
            </FormGroup>

            {/* Delete Modal */
            }
            <Modal
                isOpen={this.state.deleteModal}
                toggle={() => this.setState({deleteModal: !this.state.deleteModal})}
            >
                <ModalHeader>Confirm Delete</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this trade item?
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        onClick={() => {
                            this.props.deleteFunction(this.props.index);
                            this.setState({deleteModal: false});
                        }}
                    >
                        Yes
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => this.setState({deleteModal: false})}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </CardBody>)
            ;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps, wishlists: state.wishlists
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
    updateItemFunction: PropTypes.func,
    deleteFunction: PropTypes.func,
    index: PropTypes.number,
    data: PropTypes.object,
    addNotification: PropTypes.func,
};

CreateWishlistItem.defaultProps = {
    stocks: []
};