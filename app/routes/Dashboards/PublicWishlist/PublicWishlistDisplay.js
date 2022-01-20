import React from 'react';

import {Card, CardBody, CardFooter, CustomInput, Nav} from './../../../components';
import axios from "axios";
import {API_URL} from "../../../constants";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import PublicWishlistItem from "./PublicWishlistItem";
import _ from "lodash";
import {CardTitle} from "reactstrap";
import {addNotification} from "../../../redux/Notification";
import {Button, Col, NavItem, Row} from "../../../components";


const INITIAL_FILTER_SORT = {
    excludeExecuted: false,
    excludeNoMarketPrice: false,
}

const INITIAL_STATE = {
    wishlistID: null,
    stocks: [],
    title: undefined,
    description: undefined,
    from: moment().format('MMM Do YY'),
    to: undefined,
    comment: undefined,
    items: {},
    budget: undefined,
    sort: "Name",
    ...INITIAL_FILTER_SORT,
}


class PublicWishlistDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = _.clone(INITIAL_STATE);
    }

    componentDidMount() {
        this.fetchStockList()
        if (this.props.publicId !== "") {
            this.fetchPublicWishlist(this.props.publicId)
        }
    }

    componentDidUpdate(prevProps, prevState, ss) {
        if (this.props.publicId !== prevProps.publicId) {
            if (this.props.publicId !== "")
                this.fetchPublicWishlist(this.props.publicId)
            else {
                this.setState(INITIAL_STATE)
            }
        }
    }

    stockIdToStock = (wishlistItem, allStocks) => {
        const stocks = allStocks.find(item => wishlistItem.stock_id === item.stock_id);
        if (stocks) {
            wishlistItem.stock = stocks
        } else {
            wishlistItem.stock = null
        }
    }

    fetchStockList = () => {
        axios.get(`${API_URL}/instrument/stock/all`
        ).then(res => {
            for (const [, wishlistItem] of Object.entries(this.state.items)) {
                this.stockIdToStock(wishlistItem, res.data)
            }
            this.setState({stocks: res.data})
        }).catch(() => {
            this.props.addNotification({
                title: "Error!",
                message: "Error occurred while fetching stock list",
                colour: "error"
            });
        });
    }

    fetchPublicWishlist(public_id) {
        axios.get(`${API_URL}/portfolio/wishlist/public/${public_id}`,
        ).then(res => {

            let new_to = undefined
            if (res.data.valid_to) {
                new_to = moment(res.data.valid_to, 'YYYY-MM-DD').format('MMM Do YY')
            }

            let items = {}
            let budget = 0;

            res.data.wishlist_items.forEach((item, index) => {
                item.stock_id = item.stock
                delete item.stock

                if (item.exchange) {
                    item.exchange_id = item.exchange
                    delete item.exchange
                }

                if (item.buy_valid_till) {
                    item.buy_valid_till = moment(item.buy_valid_till, 'YYYY-MM-DD').format('MMM Do YY')
                }

                if (item.sell_valid_till) {
                    item.sell_valid_till = moment(item.sell_valid_till, 'YYYY-MM-DD').format('MMM Do YY')
                }

                if (item.buy_price && item.buy_piece) {
                    budget += Number(item.buy_price) * Number(item.buy_piece)
                }
                this.stockIdToStock(item, this.state.stocks)

                items[index] = item
            });

            this.setState({
                publicId: res.data.sharable_slug,
                to: new_to,
                from: moment(res.data.valid_from, 'YYYY-MM-DD').format('MMM Do YY'),
                title: res.data.title,
                description: res.data.description || undefined,
                comment: res.data.comment,
                sharable_slug: res.data.sharable_slug || undefined,
                items: items,
                budget: budget,
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
    }

    render() {
        const filteredWishlistItems = Object.entries(this.state.items).filter(([, value]) => {
            // Implement filter
            if (this.state.excludeExecuted) {
                if (value.executed) {
                    return false
                }
            }
            if (this.state.excludeNoMarketPrice) {
                if (!value.stock || !value.stock.price) {
                    return false
                }
            }
            return true;
        })

        return <React.Fragment>
            <Row>
                <Col lg={2}>
                    <Nav vertical className="mb-3">
                        <NavItem className="mb-2">
                            <span>
                                Sort by
                            </span>
                            <i className="fa fa-sort align-self-center ml-2"/>
                        </NavItem>
                        <NavItem className="d-flex p-0">
                            <CustomInput type="select" name="select" id="sort" value={this.state.sort}
                                         onChange={(e) => {
                                             this.setState({
                                                 sort: e.target.value,
                                             })
                                         }}>
                                <option id="Name" value="Name">Name</option>
                                <option id="Date" value="Date Modified">Date Modified</option>
                            </CustomInput>
                        </NavItem>
                    </Nav>
                    <Nav vertical className="mb-3">
                        <NavItem className="mb-2">
                            <span>
                                Executed
                            </span>
                            <i className="fa fa-check-circle align-self-center ml-2"/>
                        </NavItem>
                        <NavItem className="d-flex px-2 mb-2">
                            <CustomInput type="checkbox" id="radio1" name="rating" label="Exclude" inline
                                         checked={this.state.excludeExecuted}
                                         onChange={(e) => {
                                             this.setState({
                                                 excludeExecuted: e.target.checked,
                                             })
                                         }}
                            />
                        </NavItem>
                    </Nav>
                    <Nav vertical className="mb-3">
                        <NavItem className="mb-2">
                            <span>
                                Market Price
                            </span>
                            <i className="fa fa-inr align-self-center ml-2"/>
                        </NavItem>
                        <NavItem className="d-flex px-2 mb-2">
                            <CustomInput type="checkbox" id="checkbox3" label="Available" inline
                                         checked={this.state.excludeNoMarketPrice}
                                         onChange={(e) => {
                                             this.setState({
                                                 excludeNoMarketPrice: e.target.checked,
                                             })
                                         }}
                            />
                        </NavItem>
                    </Nav>
                    <Button color="link" block
                            onClick={() =>
                                this.setState({
                                    ...INITIAL_FILTER_SORT,
                                })}>
                        Reset to Default
                    </Button>
                </Col>
                <Col lg={9}>
                    <Card className="mb-3">
                        <CardBody>
                            <div className="d-flex mb-2">
                                <CardTitle tag="h4">
                                    {this.state.title}
                                </CardTitle>
                                <span className="ml-auto text-right">
                                    {`${this.state.from}`}
                                    {this.state.to && <>
                                        {` to ${this.state.to}`}
                                    </>
                                    }
                                </span>
                            </div>
                            {this.state.description && this.state.description !== "" && <p className="pb-1 mb-0">
                                {this.state.description || ""}
                            </p>
                            }
                        </CardBody>
                        {this.state.comment && this.state.comment !== "" && <CardFooter className="small">
                            <i className="fa fa-fw fa-comment mr-2"/>
                            {this.state.comment}
                        </CardFooter>}
                    </Card>
                    <Card className="mb-3">
                        {filteredWishlistItems.sort(([, a], [, b]) => {
                            // Implement sort
                            if (!a.stock || !b.stock) {
                                return 0
                            }
                            return a.stock.name.localeCompare(b.stock.name); //default return value (no sorting)
                        })
                            .map((t, k) => {
                                    return <React.Fragment key={k}>
                                        <PublicWishlistItem
                                            stocks={this.state.stocks}
                                            data={t[1]}
                                            budget={this.state.budget}
                                            key={k}
                                        />
                                        {(k === Object.keys(filteredWishlistItems).length - 1) ? <></> : <hr/>}
                                    </React.Fragment>
                                }
                            )}
                    </Card>
                </Col>
            </Row>
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

export default connect(null, mapDispatchToProps)(PublicWishlistDisplay);

PublicWishlistDisplay.propTypes = {
    publicId: PropTypes.string,
    addNotification: PropTypes.func,
    history: PropTypes.object,
};

