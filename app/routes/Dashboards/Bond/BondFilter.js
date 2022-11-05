import React, {Fragment} from 'react'

import {Card, CustomInput, Nav, withPageConfig} from './../../../components';
import axios from "axios";
import {API_URL, image404, POSTS_PER_PAGE} from "../../../constants";
import PropTypes from "prop-types";
import _ from "lodash";
import {Badge, Button, CardFooter, CardImg, Col, Input, NavItem, Row} from "../../../components";
import {connect} from "react-redux";
import {addNotification} from "../../../redux/Notification";
import {BOND_TYPE, FREQUENCY, PRICE_AT, RATING, SORT_BY, TENURE_LEFT} from "./constants";
import {Paginations} from "../../components/Paginations";
import BootstrapTable from "react-bootstrap-table-next";

class BondFilter extends React.Component {

    getInitialFilterSort() {
        // Alternate to deep copy
        return {
            query_str: null,
            volume_available: true, // Filter out bonds with volume
            ignore_record_period: true, // Remove next record - payment period from XIRR calculation
            tax_free: false,
            discount: null,
            bond_type: "NB",
            frequency: null,
            rating: null,
            tenure: new Set(),  // Requires deep copy
            exchange: 'NSE' // Default exchange is NSE
        }
    }

    INITIAL_STATE = {
        bonds: [],
        sort: SORT_BY.NAME_ASC, ...this.getInitialFilterSort(),
        offset: 0,
        currentPage: 1,
        totalPosts: 1,
        bond_data: {}
    }

    constructor(props) {
        super(props);
        this.state = _.clone(this.INITIAL_STATE);
        this.search_timeout = undefined;
    }

    componentDidMount() {
        this.fetchBonds(0, this.state.tenure, this.state.frequency, this.state.rating)
        this.prevConfig = _.pick(this.props.pageConfig, ['pageTitle', 'pageDescription', 'pageKeywords']);
        this.props.pageConfig.changeMeta({
            pageTitle: this.getPageTitle()
        });
    }

    componentWillUnmount() {
        this.props.pageConfig.changeMeta(this.prevConfig);
    }

    fetchBonds(offset = this.state.offset, tenure = this.state.tenure, frequency = this.state.frequency,
               rating = this.state.rating, sort = this.state.sort, volume_available = this.state.volume_available,
               tax_free = this.state.tax_free, discount = this.state.discount, bond_type = this.state.bond_type,
               query_str = this.state.query_str, ignore_record_period = this.state.ignore_record_period) {
        const params = {
            limit: POSTS_PER_PAGE,
            offset: offset,
            sort: sort,
            query_str: query_str,
            tenure: Array.from(tenure),
            rating: rating,
            frequency: frequency,
            bond_type: bond_type,
            exchange: this.state.exchange,
            volume_available: volume_available,
            ignore_record_period: ignore_record_period,
            tax_free: tax_free,
            discount: discount,
        }

        axios.get(`${API_URL}/instrument/bond/all`, {
            params: params
        }).then(this.processBondsResponse).catch((error) => {
            if (error.response.status === 404) {
                this.props.history.push(`/pages/error-404`)
            } else {
                let message = "";
                if (error.response.status === 400) {
                    for (const [, value] of Object.entries(error.response.data)) {
                        message += value + " "
                    }
                } else {
                    message = "Error occurred while fetching bonds";
                }
                this.props.addNotification({
                    title: "Error!", message: message, colour: "error"
                });
            }
        });
    }

    fetchBond(isin) {
        const params = {
            isin: isin,
        }

        axios.get(`${API_URL}/instrument/bond/detail`, {
            params: params
        }).then(this.processBondResponse).catch((error) => {
            if (error.response.status === 404) {
                this.props.history.push(`/pages/error-404`)
            } else {
                let message = "";
                if (error.response.status === 400) {
                    for (const [, value] of Object.entries(error.response.data)) {
                        message += value + " "
                    }
                } else {
                    message = "Error occurred while fetching the bond";
                }
                this.props.addNotification({
                    title: "Error!", message: message, colour: "error"
                });
            }
        });
    }

    processBondResponse = (res) => {
        this.setState({
            bond_data: {
                ...this.state.bond_data,
                [res.data['isin_number']]: res.data
            }
        })
    }

    getPageTitle() {
        return "Listed Bonds"
    }

    processBondsResponse = (res) => {
        this.setState({
            bonds: res.data.results, totalPosts: res.data.count,
        })
    }

    set_search_query(value) {
        if (this.search_timeout) clearTimeout(this.search_timeout);
        this.search_timeout = setTimeout(() => {
            this.setState({
                query_str: value
            })
            this.fetchBonds(this.state.offset, this.state.tenure, this.state.frequency, this.state.rating, this.state.sort, this.state.volume_available, this.state.tax_free, this.state.discount, this.state.bond_type, value)
        }, 1000);
    }

    get_symbol_name(symbol, series) {
        return `${symbol}${series ? `-${series}` : ''}`
    }

    createColumnDefinitions() {
        return [
            {
                dataField: "bond.short_name",
                text: 'Bond',
            },
            {
                dataField: "bond.symbol",
                text: 'Symbol',
                formatter: (cell, row) =>
                    (
                        <code>{this.get_symbol_name(row['symbol'], row['series'])}</code>
                    )
            },
            {
                dataField: "bond.coupon",
                text: 'Coupon',
                formatter: (cell) =>
                    (
                        `${Number(cell).toFixed(2)}%`
                    )
            },
            {
                dataField: "bond.maturity_date",
                text: 'Maturity',
            },
            {
                dataField: "bond.rating",
                text: 'Rating',
            },
            {
                dataField: "bond.frequency",
                text: 'Interest payment',
                formatter: (cell) =>
                    (
                        FREQUENCY[cell] || '-'
                    )
            },
            {
                dataField: "bond.is_taxable",
                text: 'Taxable',
                formatter: (cell) =>
                    (
                        cell ? '-' : <Badge color="success">Tax-Free</Badge>
                    )
            },
            {
                dataField: "bond.face_value",
                text: 'Face Value',
            },
            {
                dataField: "price",
                text: 'LTP(₹)',
            },
            {
                dataField: "xirr",
                text: 'Returns (CAGR)',
                formatter: (cell) =>
                    (
                        cell ? `${(Number(cell).toFixed(4) * 100).toFixed(2)}%` : '-'
                    )
            },
            {
                dataField: "volume",
                text: 'Volume',
                formatter: (cell) =>
                    (
                        Number(cell)
                    )
            },
        ];
    }

    getBSEBondDetail(exchange_bonds) {
        for (let i = 0; i < exchange_bonds.length; i++) {
            let item = exchange_bonds[i];
            if (item['exchange'] === 'BSE') {
                return `${item['symbol']}${item['series'] ? `-${item['series']}` : ''}`
            }
        }
        return null
    }

    render() {
        const columnDefs = this.createColumnDefinitions();
        const expandRow = {
            renderer: row => {
                const detail = this.state.bond_data[row['bond']['isin_number']]
                if (!detail) {
                    this.fetchBond(row['bond']['isin_number'])
                }
                let bse_bond = null;
                if (detail) {
                    bse_bond = this.getBSEBondDetail(detail['exchange_bonds'])
                }
                return (
                    <Row>
                        <Col md={6}>
                            <dl className="row">
                                {detail ?
                                    <>
                                        <dd className="col-sm-12 text-center">{detail.name}</dd>
                                    </> : <></>
                                }

                                <dt className="col-sm-6 text-right">Isin Number</dt>
                                <dd className="col-sm-6"><code>{row['bond']['isin_number']}</code></dd>

                                <dl className="row col-sm-12">
                                    {bse_bond ?
                                        <>
                                            <dt className="col-sm-6 text-left">
                                                <code>NSE/{this.get_symbol_name(row['symbol'], row['series'])}</code>
                                            </dt>
                                            <dt className="col-sm-6 text-right"><code>BSE/{bse_bond}</code></dt>
                                        </> : <>
                                            <dt className="col-sm-12 text-center">
                                                <code>NSE/{this.get_symbol_name(row['symbol'], row['series'])}</code>
                                            </dt>
                                        </>
                                    }
                                </dl>
                                <dt className="col-sm-6 text-right">Issue Date</dt>
                                <dd className="col-sm-6">{row['bond']['issue_date']}</dd>

                                {detail ?
                                    <>
                                        <dt className="col-sm-6 text-right">Rating</dt>
                                        <dd className="col-sm-6">{detail['rating_raw']}</dd>
                                    </> : <></>
                                }
                            </dl>
                        </Col>
                        <Col md={6}>
                            {detail && detail['future_cashflows'] ?
                                <dl className="row">
                                    <dt className="col-sm-12 text-center">Future {Object.keys(detail['future_cashflows']).slice(0, 5).length} Cash-flows</dt>
                                    {Object.keys(detail['future_cashflows']).reverse().slice(0, 5).map((key, index) =>
                                        (<Fragment key={index}>
                                            <dt className="col-sm-6 text-right">{key}</dt>
                                            <dd className="col-sm-6 mb-0">{Number(detail['future_cashflows'][key]).toFixed(2)}</dd>
                                        </Fragment>)
                                    )}
                                </dl> : <></>
                            }
                        </Col>
                    </Row>
                );
            },
            showExpandColumn: true,
            expandHeaderColumnRenderer: ({isAnyExpands}) => isAnyExpands ? (
                <i className="fa fa-angle-down fa-fw fa-lg text-muted"></i>
            ) : (
                <i className="fa fa-angle-right fa-fw fa-lg text-muted"></i>
            ),
            expandColumnRenderer: ({expanded}) =>
                expanded ? (
                    <i className="fa fa-angle-down fa-fw fa-lg text-muted"></i>
                ) : (
                    <i className="fa fa-angle-right fa-fw fa-lg text-muted"></i>
                )
        }

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
                                                 currentPage: 1,
                                             })
                                             this.fetchBonds(this.state.offset, this.state.tenure, this.state.frequency, this.state.rating, e.target.value)
                                         }}>
                                {Object.keys(SORT_BY).map((key, index) => {
                                    return (<option id="Name" value={SORT_BY[key]} key={index}>{SORT_BY[key]}</option>);
                                })}
                            </CustomInput>
                        </NavItem>
                    </Nav>
                    <Nav vertical className="mb-3">
                        <div className="d-inline-flex">
                            <Input
                                type="search"
                                name="search"
                                id="search"
                                placeholder="Search..."
                                className="ml-auto"
                                bsSize="sm"
                                onChange={(e) => {
                                    this.set_search_query(e.target.value);
                                }}
                                onBlur={(e) => {
                                    this.setState({
                                        query_str: e.target.value
                                    })
                                }}
                                defaultValue={this.state.query_str || ""}
                            />
                        </div>
                    </Nav>
                    <Nav vertical className="mb-3">
                        <NavItem className="mb-2">
                            <span>
                                Interest Payment
                            </span>
                            <i className="fa fa-calendar-check-o align-self-center ml-2"/>
                        </NavItem>
                        {Object.keys(FREQUENCY).map((key, index) => {
                            return (<NavItem className="d-flex px-2 mb-2" key={index}>
                                <CustomInput type="radio" id={`radio_${key}`} label={FREQUENCY[key]} inline
                                             checked={this.state.frequency === key}
                                             onChange={() => {
                                                 this.setState({
                                                     frequency: key,
                                                     currentPage: 1,
                                                 })
                                                 this.fetchBonds(this.state.offset, this.state.tenure, key, this.state.rating)
                                             }}
                                />
                            </NavItem>);
                        })}
                    </Nav>
                    <Nav vertical className="mb-3">
                        <NavItem className="mb-2">
                            <span>
                                Rating
                            </span>
                            <i className="fa fa-star-half-full align-self-center ml-2"/>
                        </NavItem>
                        {Object.keys(RATING).map((key, index) => {
                            return (<NavItem className="d-flex px-2 mb-2" key={index}>
                                <CustomInput type="radio" id={`radio_${key}`} label={RATING[key][1]} inline
                                             checked={this.state.rating === RATING[key][0]}
                                             onChange={() => {
                                                 this.setState({
                                                     rating: RATING[key][0],
                                                     currentPage: 1,
                                                 })
                                                 this.fetchBonds(this.state.offset, this.state.tenure, this.state.frequency, RATING[key][0])
                                             }}
                                />
                            </NavItem>);
                        })}
                    </Nav>
                    <Nav vertical className="mb-3">
                        <NavItem className="mb-2">
                            <span>
                                Tenure left
                            </span>
                            <i className="fa fa-clock-o align-self-center ml-2"/>
                        </NavItem>
                        {Object.keys(TENURE_LEFT).map((key, index) => {
                            return (<NavItem className="d-flex px-2 mb-2" key={index}>
                                <CustomInput type="checkbox" id={`radio_${key}`} label={TENURE_LEFT[key][1]} inline
                                             checked={this.state.tenure.has(TENURE_LEFT[key][0])}
                                             onChange={(e) => {
                                                 let new_tenure = this.state.tenure;
                                                 if (e.target.checked) {
                                                     new_tenure.add(TENURE_LEFT[key][0])
                                                 } else {
                                                     new_tenure.delete(TENURE_LEFT[key][0])
                                                 }
                                                 this.setState({
                                                     tenure: new_tenure,
                                                     currentPage: 1,
                                                 })
                                                 this.fetchBonds(this.state.offset, new_tenure, this.state.frequency, this.state.rating)
                                             }}
                                />
                            </NavItem>);
                        })}
                    </Nav>
                    <Nav vertical className="mb-3">
                        <NavItem className="mb-2">
                            <span>
                                Type
                            </span>
                            <i className="fa fa-institution align-self-center ml-2"/>
                        </NavItem>
                        {Object.keys(BOND_TYPE).map((key, index) => {
                            return (<NavItem className="d-flex px-2 mb-2" key={index}>
                                <CustomInput type="radio" id={`radio_${key}`} label={BOND_TYPE[key]} inline
                                             checked={this.state.bond_type === key}
                                             onChange={() => {
                                                 this.setState({
                                                     bond_type: key,
                                                     currentPage: 1,
                                                 })
                                                 this.fetchBonds(this.state.offset, this.state.tenure, this.state.frequency, this.state.rating, this.state.sort, this.state.volume_available, this.state.tax_free, this.state.discount, key)
                                             }}
                                />
                            </NavItem>);
                        })}
                    </Nav>
                    <Nav vertical className="mb-3">
                        <NavItem className="mb-2">
                            <span>
                                Volume
                            </span>
                            <i className="fa fa-line-chart align-self-center ml-2"/>
                        </NavItem>
                        <NavItem className="d-flex px-2 mb-2">
                            <CustomInput type="checkbox" id="checkbox" label="Available" inline
                                         checked={this.state.volume_available}
                                         onChange={(e) => {
                                             this.setState({
                                                 volume_available: e.target.checked,
                                                 currentPage: 1,
                                             })
                                             this.fetchBonds(this.state.offset, this.state.tenure, this.state.frequency, this.state.rating, this.state.sort, e.target.checked, this.state.tax_free)
                                         }}
                            />
                        </NavItem>
                    </Nav>
                    <Nav vertical className="mb-3">
                        <NavItem className="mb-2">
                            <span>
                                Tax
                            </span>
                            <i className="fa fa-inr align-self-center ml-2"/>
                        </NavItem>
                        <NavItem className="d-flex px-2 mb-2">
                            <CustomInput type="checkbox" id="checkbox2" label="Free" inline
                                         checked={this.state.tax_free}
                                         onChange={(e) => {
                                             this.setState({
                                                 tax_free: e.target.checked,
                                                 currentPage: 1,
                                             })
                                             this.fetchBonds(this.state.offset, this.state.tenure, this.state.frequency, this.state.rating, this.state.sort, this.state.volume_available, e.target.checked)
                                         }}
                            />
                        </NavItem>
                    </Nav>
                    <Nav vertical className="mb-3">
                        <NavItem className="mb-2">
                            <span>
                                Price at
                            </span>
                            <i className="fa fa-inr align-self-center ml-2"/>
                        </NavItem>
                        {Object.keys(PRICE_AT).map((key, index) => {
                            return (<NavItem className="d-flex px-2 mb-2" key={index}>
                                <CustomInput type="radio" id={`radio_${key}`} label={PRICE_AT[key]} inline
                                             checked={this.state.discount === key}
                                             onChange={() => {
                                                 this.setState({
                                                     discount: key,
                                                     currentPage: 1,
                                                 })
                                                 this.fetchBonds(this.state.offset, this.state.tenure, this.state.frequency, this.state.rating, this.state.sort, this.state.volume_available, this.state.tax_free, key)
                                             }}
                                />
                            </NavItem>);
                        })}
                    </Nav>
                    <Nav vertical className="mb-3">
                        <NavItem className="mb-2">
                            <span>
                                Other Settings
                            </span>
                            <i className="fa fa-cog align-self-center ml-2"/>
                        </NavItem>
                        <NavItem className="d-flex px-2 mb-2">
                            <CustomInput type="checkbox" id="checkbox3" label="Ignore Record Period (28 days)" inline
                                         checked={this.state.ignore_record_period}
                                         onChange={(e) => {
                                             this.setState({
                                                 ignore_record_period: e.target.checked,
                                                 currentPage: 1,
                                             })
                                             this.fetchBonds(this.state.offset, this.state.tenure, this.state.frequency, this.state.rating, this.state.sort, this.state.volume_available, this.state.tax_free, this.state.discount, this.state.bond_type,
                                                 this.state.query_str, e.target.checked)
                                         }}
                            />
                        </NavItem>
                    </Nav>
                    <Button color="link" block
                            onClick={() => {
                                this.setState({
                                    ...this.getInitialFilterSort(),
                                    currentPage: 1,
                                });
                                this.fetchBonds(this.state.offset, new Set(), null, null, SORT_BY.NAME_ASC, true, null, null, "NB")
                            }}>
                        Reset to Default
                    </Button>
                </Col>
                <Col lg={10}>
                    <Card className="mb-3">
                        {this.state.bonds.length > 0 ?
                            <BootstrapTable
                                classes="table-responsive-lg"
                                bordered={false}
                                expandRow={expandRow}
                                responsive
                                hover
                                keyField='bond.isin_number'
                                data={this.state.bonds}
                                columns={columnDefs}
                            /> : <CardImg className="figure-img card-img"
                                          src={image404}
                            />}
                        <CardFooter className="justify-content-end">
                            <div className="d-flex">
                                <p className={`d-flex justify-content-start`}>
                                    {`Showing ${this.state.totalPosts > 0 ? ((this.state.currentPage - 1) * POSTS_PER_PAGE + 1) : 0} to 
                                    ${this.state.currentPage * POSTS_PER_PAGE > this.state.totalPosts ? this.state.totalPosts : this.state.currentPage * POSTS_PER_PAGE} of ${this.state.totalPosts} Results`}
                                </p>
                                <Paginations page_count={Math.ceil(this.state.totalPosts / POSTS_PER_PAGE)}
                                             max_boxes={8}
                                             active={this.state.currentPage}
                                             style="ml-auto"
                                             goToPage={(page_number) => {
                                                 const offset = (page_number - 1) * POSTS_PER_PAGE;
                                                 this.setState({
                                                     currentPage: page_number,
                                                 });
                                                 this.fetchBonds(offset);
                                             }}/>
                            </div>
                        </CardFooter>
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

export default connect(null, mapDispatchToProps)(withPageConfig(BondFilter));

BondFilter.propTypes = {
    addNotification: PropTypes.func,
    history: PropTypes.object,
    pageConfig: PropTypes.object,
    type: PropTypes.oneOf(["Public", "Preview"]),
};

