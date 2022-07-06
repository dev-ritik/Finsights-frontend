import React from 'react';

import {Card, CustomInput, Nav, withPageConfig} from './../../../components';
import axios from "axios";
import {API_URL, image404, POSTS_PER_PAGE} from "../../../constants";
import PropTypes from "prop-types";
import _ from "lodash";
import {Badge, Button, CardFooter, CardImg, Col, NavItem, Row, Table} from "../../../components";
import {connect} from "react-redux";
import {addNotification} from "../../../redux/Notification";
import {FREQUENCY, PRICE_AT, RATING, SORT_BY, TENURE_LEFT} from "./constants";
import {Paginations} from "../../components/Paginations";


class BondFilter extends React.Component {

    INITIAL_FILTER_SORT = {
        volume_available: false, // Filter out bonds with volume
        tax_free: false,
        discount: null,
        frequency: null,
        rating: null,
        tenure: null,
        exchange: 'NSE' // Default exchange is NSE
    }

    INITIAL_STATE = {
        bonds: [], sort: SORT_BY.NAME_ASC, ...this.INITIAL_FILTER_SORT, offset: 0, currentPage: 1, totalPosts: 1,
    }

    constructor(props) {
        super(props);
        this.state = _.clone(this.INITIAL_STATE);
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

    fetchBonds(offset = this.state.offset, tenure = this.state.tenure, frequency = this.state.frequency, rating = this.state.rating, sort = this.state.sort, volume_available = this.state.volume_available, tax_free = this.state.tax_free, discount = this.state.discount) {
        const params = {
            limit: POSTS_PER_PAGE,
            offset: offset,
            sort: sort,
            tenure: tenure,
            rating: rating,
            frequency: frequency,
            exchange: this.state.exchange,
            volume_available: volume_available,
            tax_free: tax_free,
            discount: discount,
        }

        axios.get(`${API_URL}/instrument/bond/all`, {
            params: params
        }).then(this.processBondResponse).catch((error) => {
            if (error.response.status === 404) {
                this.props.history.push(`/pages/error-404`)
            } else {
                this.props.addNotification({
                    title: "Error!", message: "Error occurred while fetching bonds", colour: "error"
                });
            }
        });
    }

    getPageTitle() {
        return "Listed Bonds"
    }

    processBondResponse = (res) => {
        this.setState({
            bonds: res.data.results, totalPosts: res.data.count,
        })
    }

    render() {
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
                                <CustomInput type="radio" id={`radio_${key}`} label={TENURE_LEFT[key][1]} inline
                                             checked={this.state.tenure === TENURE_LEFT[key][0]}
                                             onChange={() => {
                                                 this.setState({
                                                     tenure: TENURE_LEFT[key][0],
                                                     currentPage: 1,
                                                 })
                                                 this.fetchBonds(this.state.offset, TENURE_LEFT[key][0], this.state.frequency, this.state.rating)
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
                    <Button color="link" block
                            onClick={() => {
                                this.setState({
                                    ...this.INITIAL_FILTER_SORT,
                                    currentPage: 1,
                                });
                                this.fetchBonds(this.state.offset, null, null, null, null, null, null, null)
                            }}>
                        Reset to Default
                    </Button>
                </Col>
                <Col lg={9}>
                    <Card className="mb-3">
                        {this.state.bonds.length > 0 ? <Table className="mb-0" hover responsive>
                            <thead>
                            <tr>
                                <th className="bt-0">Bond</th>
                                <th className="bt-0">Symbol</th>
                                <th className="bt-0">Coupon%</th>
                                <th className="bt-0">Maturity</th>
                                <th className="bt-0">Rating</th>
                                <th className="bt-0">Interest payment</th>
                                <th className="bt-0">Taxable</th>
                                <th className="bt-0">Face Value</th>
                                <th className="bt-0">LTP(₹)</th>
                                <th className="bt-0">Returns (CAGR)</th>
                                <th className="bt-0">Volume</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.bonds.map((t, k) => {
                                return <tr key={k}>
                                    <td>{t['bond']['short_name']}</td>
                                    <td><code>{t['symbol']}-{t['series']}</code></td>
                                    <td>{Number(t['bond']['coupon']).toFixed(2)}</td>
                                    <td>{t['bond']['maturity_date']}</td>
                                    <td>{t['bond']['rating']}</td>
                                    <td>{FREQUENCY[t['bond']['frequency']] || '-'}</td>
                                    <td>{t['bond']['is_taxable'] ? '-' : <Badge color="success">Tax-Free</Badge>}</td>
                                    <td>{t['bond']['face_value']}</td>
                                    <td>{t['price']}</td>
                                    <td>{(Number(t['xirr']).toFixed(4) * 100).toFixed(2)}%</td>
                                    <td>{(Number(t['volume']))}</td>
                                </tr>
                            })}
                            </tbody>
                        </Table> : <CardImg className="figure-img card-img"
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

