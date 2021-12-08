import React from 'react';

import {Card, CardBody, CardFooter} from './../../../components';
import axios from "axios";
import {API_URL} from "../../../constants";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addAlert} from "../../../redux/Alert";
import moment from "moment";
import PublicWishlistItem from "./PublicWishlistItem";
import _ from "lodash";
import {CardTitle} from "reactstrap";


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
                this.fetchWishlist(this.props.publicId)
            else {
                this.setState(INITIAL_STATE)
            }
        }
    }

    fetchStockList = () => {
        axios.get(`${API_URL}/instrument/stock/all`
        ).then(res => {
            this.setState({stocks: res.data.sort((a, b) => a.name.localeCompare(b.name))})
        }).catch(() => {
            this.props.addAlert({
                title: "Error!",
                message: "Error occurred while fetching stock list",
                colour: "danger"
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

            res.data.wishlist_items.forEach(function (item, index) {
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
                this.props.addAlert({
                    title: "Error!",
                    message: "Error occurred while fetching existing wishlist",
                    colour: "danger"
                });
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <Card className="mb-3">
                    <CardBody>
                        <div className="d-flex mb-2">
                            <CardTitle tag="h4">
                                {this.state.title}
                            </CardTitle>
                            <span className="ml-auto text-right">
                                {`${this.state.from}`}
                                {this.state.to && (
                                    <>
                                        {` to ${this.state.to}`}
                                    </>
                                )
                                }
                            </span>
                        </div>
                        {this.state.description && this.state.description !== "" && (
                            <p className="pb-1 mb-0">
                                {this.state.description || ""}
                            </p>)
                        }
                    </CardBody>
                    {this.state.comment && this.state.comment !== "" && (
                        <CardFooter className="small">
                            <i className="fa fa-fw fa-comment mr-2"/>
                            {this.state.comment}
                        </CardFooter>
                    )}
                </Card>
                <Card className="mb-3">
                    {Object.entries(this.state.items).map((t, k) => {
                            return (
                                <React.Fragment key={k}>
                                    <PublicWishlistItem
                                        stocks={this.state.stocks}
                                        data={t[1]}
                                        budget={this.state.budget}
                                        key={k}
                                    />
                                    {(k === Object.keys(this.state.items).length - 1) ? <></> : <hr/>}
                                </React.Fragment>
                            )
                        }
                    )}
                </Card>
            </React.Fragment>
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

export default connect(null, mapDispatchToProps)(PublicWishlistDisplay);

PublicWishlistDisplay.propTypes = {
    publicId: PropTypes.string,
    addAlert: PropTypes.func,
    history: PropTypes.object,
};

