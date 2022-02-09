import React from 'react';

import {
    Button,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardFooter,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledButtonDropdown,
    UncontrolledModal,
    UncontrolledTooltip,
    withPageConfig
} from './../../../components';
import axios from "axios";
import {API_URL} from "../../../constants";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import CreateWishlistItem from "./CreateWishlistItem";
import _ from "lodash";
import Toggle from "react-toggle";
import {checkAndFetchValidAccessKey} from "../../../redux/User";
import CreateWishlistHeader from "./CreateWishlistHeader";
import {addNotification} from "../../../redux/Notification";
import {ModalBody, ModalFooter, ModalHeader} from "../../../components";
import {update} from "../../../redux/Wishlists";


const ITEM_EMPTY_DATA = {
    stock_id: "",
    exchange_id: "",
    buy_price: undefined,
    buy_piece: undefined,
    buy_feeling: undefined,
    buy_valid_till: undefined,
    sell_price: undefined,
    sell_quantity: undefined,
    sell_feeling: undefined,
    sell_valid_till: undefined,
    hold_feeling: undefined,
    executed: false,
    comment: undefined,
}

const INITIAL_STATE = {
    wishlistID: null,
    stocks: [],
    title: undefined,
    description: undefined,
    from: moment().toDate(),
    to: undefined,
    comment: undefined,
    items: {
        1: _.clone(ITEM_EMPTY_DATA)
    },
    dirty: false,
}


class CreateWishlist extends React.Component {

    constructor(props) {
        super(props);
        this.state = _.clone(INITIAL_STATE);
        this.updateItem = this.updateItem.bind(this);
    }

    componentDidMount() {
        this.fetchStockList()
        if (this.props.wishlistId !== -1) {
            this.fetchWishlist(this.props.wishlistId)
        }

        this.prevConfig = _.pick(this.props.pageConfig,
            ['pageTitle', 'pageDescription', 'pageKeywords']);
        this.props.pageConfig.changeMeta({
            pageTitle: this.getPageTitle()
        });
    }

    componentWillUnmount() {
        this.props.pageConfig.changeMeta(this.prevConfig);
    }

    componentDidUpdate(prevProps, prevState, ss) {
        if (this.props.wishlistId !== prevProps.wishlistId) {
            if (this.props.wishlistId !== -1)
                this.fetchWishlist(this.props.wishlistId)
            else {
                let initialState = _.clone(INITIAL_STATE);
                initialState.stocks = this.state.stocks
                this.setState(initialState)
            }
        }
        if (this.state.title !== prevState.title) {
            this.props.pageConfig.changeMeta({
                pageTitle: this.getPageTitle()
            });
        }
    }

    getPageTitle() {
        return `${this.state.title && this.state.title !== "" ? this.state.title : `Create Wishlist`}`
    }

    fetchStockList = () => {
        axios.get(`${API_URL}/instrument/stock/all`
        ).then(res => {
            this.setState({stocks: res.data.sort((a, b) => a.name.localeCompare(b.name))})
        }).catch(() => {
            this.props.addNotification({
                title: "Error!",
                message: "Error occurred while fetching stock list",
                colour: "error"
            });
        });
    }

    addEmptyItemForm() {
        let index = 1
        if (Object.keys(this.state.items).length > 0) {
            index = Math.max.apply(null, Object.keys(this.state.items)) + 1
        }
        this.updateItem(index, _.clone(ITEM_EMPTY_DATA))
    }

    updateItem = (index, field, data) => {
        this.setState(oldState => {
            oldState.items[index][field] = data;
            oldState.dirty = true;
            return oldState
        })
    };

    updateField = (field, data) => {
        this.setState({
            dirty: true,
            [field]: data,
        })
    };

    deleteItem = (index) => {
        this.setState(oldState => {
            delete oldState.items[index]
            oldState.dirty = true;
            return oldState
        })
    };

    preProcessWishlistItem(items) {
        let ret = []
        for (let [, value] of Object.entries(items)) {
            if (!value.stock_id || value.stock_id === "") {
                continue
            }
            const item = _.clone(value)
            if (!item.exchange_id || item.exchange_id === "") {
                delete item['exchange_id']
            }

            if (item.buy_valid_till && item.buy_valid_till !== "") {
                item.buy_valid_till = moment(item.buy_valid_till).format("YYYY-MM-DD")
            }

            if (item.sell_valid_till && item.sell_valid_till !== "") {
                item.sell_valid_till = moment(item.sell_valid_till).format("YYYY-MM-DD")
            }

            if (typeof item.buy_piece !== 'undefined' && item.buy_piece !== null && item.buy_piece === "") {
                item.buy_piece = null
            }

            ret.push(item)
        }
        return ret
    }

    fetchWishlist(id) {
        checkAndFetchValidAccessKey().then(access => {
            axios.get(`${API_URL}/portfolio/wishlist/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${access}`
                    },
                }
            ).then(res => {
                let new_to = undefined
                if (res.data.valid_to) {
                    new_to = moment(res.data.valid_to, 'YYYY-MM-DD').toDate()
                }

                let items = {}
                res.data.wishlist_items.forEach(function (item, index) {
                    item.stock_id = item.stock
                    delete item.stock

                    if (item.exchange) {
                        item.exchange_id = item.exchange
                        delete item.exchange
                    }

                    if (item.buy_valid_till) {
                        item.buy_valid_till = moment(item.buy_valid_till, 'YYYY-MM-DD').toDate()
                    }

                    if (item.sell_valid_till) {
                        item.sell_valid_till = moment(item.sell_valid_till, 'YYYY-MM-DD').toDate()
                    }
                    items[index] = item
                });

                this.setState({
                    wishlistID: res.data.id,
                    to: new_to,
                    from: moment(res.data.valid_from, 'YYYY-MM-DD').toDate(),
                    title: res.data.title,
                    description: res.data.description || undefined,
                    comment: res.data.comment,
                    sharable_slug: res.data.sharable_slug || undefined,
                    items: items
                })

            }).catch((error) => {
                if (error.response.status === 404) {
                    this.props.history.push(`/pages/error-404`)
                } else {
                    this.props.addNotification({
                        title: "Error!",
                        message: "Error occurred while fetching existing wishlist",
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

    getPayload() {
        let payload = {
            'title': this.state.title,
            'description': this.state.description,
            'valid_from': `${this.state.from ? moment(this.state.from).format("YYYY-MM-DD") : this.state.from}`,
            'comment': this.state.comment,
            "wishlist_items": this.preProcessWishlistItem(this.state.items)
        }
        if (this.state.to) {
            payload.valid_to = moment(this.state.to).format("YYYY-MM-DD")
        }
        return payload
    }

    submit() {
        if (!this.state.title || this.state.title === "") {
            this.props.addNotification({
                title: "Warning!",
                message: "Enter a title",
                colour: "warning"
            });
            return
        }

        checkAndFetchValidAccessKey().then(access => {
            const url = `${API_URL}/portfolio/wishlist`
            axios.request({
                    method: `${this.state.wishlistID ? 'PUT' : 'POST'}`,
                    url: `${this.state.wishlistID ? `${url}/${this.state.wishlistID}` : `${url}`}`,
                    headers: {
                        'Authorization': `Bearer ${access}`
                    },
                    data: this.getPayload()
                }
            ).then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    this.props.addNotification({
                        title: "Error!",
                        message: "Unknown error occurred",
                        colour: "error"
                    });
                    return
                }
                this.props.addNotification({
                    title: "Success!",
                    message: "Wishlist saved",
                    colour: "success"
                });
                if (!this.state.wishlistID) {
                    // Fresh wishlist
                    this.props.updateWishlist()
                }
                this.setState({
                    dirty: false,
                    wishlistID: res.data.id
                })
            }).catch((error) => {
                if (!error.response && error.message === "Network Error") {
                    this.props.addNotification({
                        title: "Error!",
                        message: "Check your internet connection",
                        colour: "error"
                    });
                } else if (error.response.status === 400) {
                    let message = "";
                    for (const [, value] of Object.entries(error.response.data)) {
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
                        message: "Error occurred while fetching existing wishlist",
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

    delete() {
        if (!(this.state.wishlistID && this.state.wishlistID !== -1)) {
            return
        }
        checkAndFetchValidAccessKey().then(access => {

            axios.delete(`${API_URL}/portfolio/wishlist/${this.state.wishlistID}`, {
                    headers: {
                        'Authorization': `Bearer ${access}`
                    },
                }
            ).then(() => {
                this.props.updateWishlist()
                this.props.history.push(`/wishlist`)
            })
                .catch(() =>
                    this.props.addNotification({
                        title: "Error!",
                        message: "Error occurred while fetching existing wishlist",
                        colour: "error"
                    }));
        }).catch(e => {
            this.props.addNotification({
                title: "Error!",
                message: e.message,
                colour: "error"
            });
        });
    }

    share() {
        if (!(this.state.wishlistID && this.state.wishlistID !== -1)) {
            return
        }
        checkAndFetchValidAccessKey().then(access => {
            axios.request({
                    method: 'POST',
                    url: `${API_URL}/portfolio/wishlist/make_public/${this.state.wishlistID}`,
                    headers: {
                        'Authorization': `Bearer ${access}`
                    },
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
                this.setState({
                    sharable_slug: res.data.sharable_slug
                })
            }).catch((error) => {
                if (!error.response && error.message === "Network Error") {
                    this.props.addNotification({
                        title: "Error!",
                        message: "Check your internet connection",
                        colour: "error"
                    });
                } else if (error.response.status === 400) {
                    let message = "";
                    for (const [, value] of Object.entries(error.response.data)) {
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
                        message: "Error occurred while getting a link",
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

    render() {
        return (
            <React.Fragment>
                <Card className="mb-3">
                    <CardBody>
                        <div className="flex-column flex-md-row d-flex mb-2">
                            <div className="mr-md-auto mr-sm-0">
                                <strong>General detail</strong>
                            </div>
                            <ButtonToolbar>
                                {this.state.wishlistID && this.state.wishlistID !== -1 &&
                                    (
                                        <>
                                            <UncontrolledButtonDropdown className="mr-2">
                                                <DropdownToggle caret color="secondary" outline>
                                                    <i className="fa fa-fw fa-share-alt"/>
                                                </DropdownToggle>
                                                <DropdownMenu persist>
                                                    <DropdownItem toggle={false}>
                                                        <label className="d-flex align-items-middle mb-0">
                                                            <Toggle
                                                                checked={!!(this.state.sharable_slug && this.state.sharable_slug !== "")}
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        this.share()
                                                                    }
                                                                }}
                                                            />
                                                            <span className="ml-2 text-inverse">Share</span>
                                                        </label>
                                                    </DropdownItem>
                                                    {this.state.sharable_slug && this.state.sharable_slug !== "" && (
                                                        <DropdownItem>
                                                            <label className="d-flex align-items-middle mb-0">
                                                                <a href={`#/wishlist/public/${this.state.sharable_slug}`}
                                                                   rel="noopener noreferrer" target="_blank"
                                                                   className="small text-decoration-none-light">
                                                                    <i className="fa fa-fw fa-link mr-2"/>
                                                                    Sharable link
                                                                </a>
                                                            </label>
                                                        </DropdownItem>
                                                    )}

                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>
                                            <ButtonGroup id="modalDefault402" className="mr-2">
                                                <Button className="text-decoration-none align-self-center"
                                                        id="delete">
                                                    <i className="fa fa-fw fa-trash"/>
                                                </Button>
                                                <UncontrolledTooltip placement="bottom" target="delete">
                                                    Delete
                                                </UncontrolledTooltip>
                                            </ButtonGroup>
                                            <UncontrolledModal target="modalDefault402" className="modal-danger">
                                                <ModalHeader className="py-3"/>
                                                <ModalBody className="table-danger text-center px-5">
                                                    <i className="fa fa-5x fa-close fa-fw modal-icon mb-3"/>
                                                    <h6>Danger</h6>
                                                    <p className="modal-text">
                                                        {`Are you sure you want to delete${this.state.title ? ` ${this.state.title}` : ``}??`}
                                                    </p>
                                                    <UncontrolledModal.Close color="danger" className="mr-2"
                                                                             onClickFunc={() => this.delete()}
                                                    >
                                                        Yes
                                                    </UncontrolledModal.Close>
                                                    <UncontrolledModal.Close color="link" className="text-danger">
                                                        Cancel
                                                    </UncontrolledModal.Close>
                                                </ModalBody>
                                                <ModalFooter className="py-3"/>
                                            </UncontrolledModal>
                                        </>
                                    )}
                                <ButtonGroup>
                                    <Button color="primary" id="save"
                                            disabled={!this.state.dirty}
                                            onClick={() => this.submit()}
                                    >
                                        <i className="fa fa-save"/>
                                    </Button>
                                    <UncontrolledTooltip placement="bottom" target="save">
                                        Save
                                    </UncontrolledTooltip>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </div>
                    </CardBody>
                    <CreateWishlistHeader
                        updateField={this.updateField}
                        data={{...(_.pick(this.state, ['title', 'description', 'from', 'to', 'comment']))}}/>
                </Card>
                <Card className="mb-3">
                    {Object.entries(this.state.items).map((t, k) => {
                            return (
                                <React.Fragment key={k}>
                                    <CreateWishlistItem
                                        stocks={this.state.stocks}
                                        index={Number(t[0])}
                                        data={t[1]}
                                        updateItemFunction={this.updateItem}
                                        deleteFunction={this.deleteItem}
                                        key={k}
                                    />
                                    {(k === Object.keys(this.state.items).length - 1) ? <></> : <hr className="m-1"/>}
                                </React.Fragment>
                            )
                        }
                    )}
                    <CardFooter className="text-center">
                        <a href="javascript:" onClick={() => {
                            this.addEmptyItemForm()
                        }}>
                            <i className="fa fa-plus text-success mr-2"/>
                            Add Item
                        </a>
                    </CardFooter>
                </Card>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        userInfo: state.userInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNotification: (alert) => {
            dispatch(addNotification(alert))
        },
        updateWishlist: () => {
            dispatch(update())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withPageConfig(CreateWishlist));

CreateWishlist.propTypes = {
    wishlistId: PropTypes.number,
    userInfo: PropTypes.object,
    addNotification: PropTypes.func,
    history: PropTypes.object,
    pageConfig: PropTypes.object,
    updateWishlist: PropTypes.func,
};

