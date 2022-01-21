import React from 'react';

import {
    CardBody,
    CardFooter,
    CardTitle,
    Nav,
    NavItem,
    NavLink,
    Progress,
    Table,
    TabPane,
    UncontrolledTabs,
    UncontrolledTooltip
} from './../../../components';
import PropTypes from "prop-types";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import moment from "moment";
import {Badge} from "../../../components";

const PublicWishlistItem = (props) => {
    const buyQuantityDisplay = (buy_price, buy_piece) => {
        return `${buy_price && buy_piece && Number(buy_piece) > 0 && Number(buy_price) > 0 ?
            `${((Number(buy_price) * Number(buy_piece) * 100) / props.budget).toFixed(2)} % (${buy_piece})` :
            (
                buy_piece ? buy_piece : "-"
            )}`
    }

    const WishlistTable = () => {
        return (
            <Table className="mb-0" hover responsive>
                <thead>
                <tr>
                    <th className="bt-0">Action</th>
                    <th className="bt-0">Price(₹)</th>
                    <th className="bt-0">Quantity %</th>
                    <th className="bt-0">Confidence</th>
                    <th className="bt-0">Execute by</th>
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
        )
    }

    const WishlistChart = () => {
        const data = [];
        if (props.data.stock) {
            data.push({
                dt: moment(props.data.stock.ticker_last_checked).format("MMM Do YYYY, h:mm:ss a"),
                price: props.data.stock.price,
            })
        }

        return (
            <ResponsiveContainer width='100%'
                                 minHeight='180px'
            >
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{top: 5, right: 20, left: 20, bottom: 5}}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="dt" padding={{left: 30, right: 30}}/>
                    <YAxis type="number" domain={['auto', 'auto']}/>
                    <Tooltip/>
                    <Legend/>
                    {Number(props.data.sell_price) > 0 &&

                        <ReferenceLine strokeDasharray="3 3"
                                       y={Number(props.data.sell_price)}
                                       label="Sell"
                                       stroke="green"
                                       ifOverflow="extendDomain"/>
                    }
                    {Number(props.data.buy_price) > 0 &&
                        <ReferenceLine strokeDasharray="3 3" y={Number(props.data.buy_price)} label="Buy" stroke="red"
                                       ifOverflow="extendDomain"/>
                    }
                    <Line type="monotone" dataKey="price" stroke="#8884d8"/>
                </LineChart>
            </ResponsiveContainer>
        )
    }

    return (
        <>
            <CardBody>
                <div className="d-flex mb-2">
                    {props.data.stock && (<CardTitle tag="h4">
                        <span className={`${props.data.executed ? "text-success" : ""}`}>{props.data.stock.name}</span>
                        {props.data.executed && (<>
                            <span> <i id="executed" className="fa fa-check-circle"/></span>
                            <UncontrolledTooltip placement="bottom" target="executed">
                                Executed
                            </UncontrolledTooltip>
                        </>)}

                    </CardTitle>)}

                    <span className="ml-auto text-right">
                        {props.data.target_achieved && (
                            <>
                                <Badge pill color="success" className="mr-2" id="target_achieved">
                                    <i className="fa fa-fw fa-diamond mr-1"/>
                                </Badge>
                                <UncontrolledTooltip placement="top" target="target_achieved">
                                    Target achieved
                                </UncontrolledTooltip>
                            </>
                        )}
                        {props.data.within_1_percent && (
                            <>
                                <Badge pill color="primary" className="mr-2" id="within_1_percent">
                                    1%
                                </Badge>
                                <UncontrolledTooltip placement="top" target="within_1_percent">
                                    Within 1%
                                </UncontrolledTooltip>
                            </>
                        )}
                        {props.data.within_2_percent && (
                            <>
                                <Badge pill color="primary" className="mr-2" id="within_2_percent">
                                    2%
                                </Badge>
                                <UncontrolledTooltip placement="top" target="within_2_percent">
                                    Within 2%
                                </UncontrolledTooltip>
                            </>
                        )}
                        {props.data.exchange_id}{props.data.stock && props.data.exchange_id && (`/`)}{props.data.stock && (`${props.data.stock.symbol}`)}
                </span>
                </div>
                <UncontrolledTabs initialActiveTabId="data">
                    <div className="d-flex">
                        <Nav tabs>
                            <NavItem>
                                <UncontrolledTabs.NavLink tabId="data">
                                    <i className="fa fa-fw fa-table mr-2"/>
                                    Data
                                </UncontrolledTabs.NavLink>
                            </NavItem>
                            <NavItem>
                                {props.data.stock && props.data.stock.price &&
                                    <UncontrolledTabs.NavLink tabId="chart">
                                        <i className="fa fa-fw fa-bar-chart mr-2"/>
                                        Chart
                                    </UncontrolledTabs.NavLink>
                                }
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href={`${props.data.stock ? `#/analysis/stock/NSE/${props.data.stock.symbol}/seasonal` : '#'}`}
                                    target="_blank">
                                    Analysis
                                    <i className="fa fa-fw fa-external-link ml-2"/>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>

                    <UncontrolledTabs.TabContent>
                        <TabPane tabId="data">
                            <WishlistTable/>
                        </TabPane>
                        <TabPane tabId="chart">
                            <WishlistChart/>
                        </TabPane>
                    </UncontrolledTabs.TabContent>
                </UncontrolledTabs>
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