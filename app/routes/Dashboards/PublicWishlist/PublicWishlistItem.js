import React from 'react';

import {CardBody, CardFooter, Progress, Table} from './../../../components';
import PropTypes from "prop-types";
import {CardTitle, UncontrolledTooltip} from "reactstrap";


const PublicWishlistItem = (props) => {
    const stocks = props.stocks.filter(item => item.stock_id === props.data.stock_id).map(({
                                                                                               name,
                                                                                               symbol,
                                                                                               price
                                                                                           }) => ({
        name,
        symbol,
        price,
    }));

    const buyQuantityDisplay = (buy_price, buy_piece) => {
        return `${buy_price && buy_piece ?
            `${((Number(buy_price) * Number(buy_piece) * 100) / props.budget).toFixed(2)} % (${buy_piece})` :
            (
                buy_piece ? buy_piece : "-"
            )}`
    }

    return (
        <>
            <CardBody>
                <div className="d-flex mb-2">
                    {stocks && stocks.length === 1 && (<CardTitle tag="h4">
                        <span
                            className={`${props.data.executed ? "text-success" : ""}`}>{`${stocks[0].name}`}{stocks[0].price && (` . ₹${stocks[0].price}`)}</span>
                        {props.data.executed && (<>
                            <span> <i id="executed" className="fa fa-check-circle"/></span>
                            <UncontrolledTooltip placement="bottom" target="executed">
                                Executed
                            </UncontrolledTooltip>
                        </>)}

                    </CardTitle>)}

                    <span className="ml-auto text-right">
                    {props.data.exchange_id}{stocks && stocks.length === 1 && props.data.exchange_id && (`/`)}{stocks && stocks.length === 1 && (`${stocks[0].symbol}`)}
                </span>
                </div>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Action</th>
                        <th>Price(₹)</th>
                        <th>Quantity %</th>
                        <th>Confidence</th>
                        <th>Execute by</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Buy</td>
                        <td>{props.data.buy_price || "-"}</td>
                        <td>{buyQuantityDisplay(props.data.buy_price, props.data.buy_piece)}</td>
                        <td style={{width: '20%'}}>
                            <Progress value={props.data.buy_feeling || 0} style={{height: "10px"}} className="mb-2"
                                      striped max={5}/>
                        </td>
                        <td>
                            {props.data.buy_valid_till || "-"}
                        </td>
                    </tr>
                    <tr>
                        <td>Sell</td>
                        <td>{props.data.sell_price || "-"}</td>
                        <td>{props.data.sell_quantity ? `${props.data.sell_quantity} %` : "-"}</td>
                        <td style={{width: '20%'}}>
                            <Progress value={props.data.sell_feeling || 0} style={{height: "10px"}} className="mb-2"
                                      striped max={5}/>
                        </td>
                        <td>
                            {props.data.sell_valid_till || "-"}
                        </td>
                    </tr>
                    <tr>
                        <td>Hold</td>
                        <td/>
                        <td/>
                        <td style={{width: '20%'}}>
                            <Progress value={props.data.hold_feeling || 0} style={{height: "10px"}} className="mb-2"
                                      striped max={5}/>
                        </td>
                        <td/>
                    </tr>
                    </tbody>
                </Table>
            </CardBody>
            {props.data.comment && props.data.comment !== "" && (
                <CardFooter className="small">
                    <i className="fa fa-fw fa-comment mr-2"/>
                    {props.data.comment}
                </CardFooter>
            )}
        </>
    )
};

export default PublicWishlistItem;
PublicWishlistItem.propTypes = {
    stocks: PropTypes.array,
    data: PropTypes.object,
    budget: PropTypes.number,
};

PublicWishlistItem.defaultProps = {
    stocks: []
};