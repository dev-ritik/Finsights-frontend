import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    DropdownToggle,
    ExtendedDropdown,
    Input,
    InputGroup,
    InputGroupAddon,
    ListGroup,
    ListGroupItem,
    Media,
    UncontrolledDropdown
} from './../../components';
import axios from "axios";

import './../../styles/components/search.scss';
import {API_URL} from "../../constants";

export class NavbarSearch extends Component {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object
    }

    state = {
        stocks: [],
        dropdownOpen: false,
        message: ""
    }

    constructor(props) {
        super(props);
        this.timeout = 0;
    }

    doSearch = (searchText) => {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            if (searchText.length <= 3) {
                // Ignoring small string
                this.setState({message: "Start searching with 4 letters", dropdownOpen: true});
                return;
            }

            axios.get( `${API_URL}/instrument/all`, {
                params: {
                    query_str: `${searchText}`,
                    exchange: 'NSE',
                    stock: 'true',
                    index: 'true'
                }
            }).then(res => {
                let message = ""
                if (res.data.length === 0) {
                    message = "No results found"
                }
                this.setState({stocks: res.data, dropdownOpen: true, message: message});
            }).catch(function (error) {
                this.setState({stocks: [], dropdownOpen: true, message: error.response.data});
            });
        }, 800);
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        return (
            <UncontrolledDropdown nav inNavbar isOpen={this.state.dropdownOpen} {...this.props}>
                <DropdownToggle nav>
                    <InputGroup>
                        <Input placeholder="Search Stock..." onChange={(e) => this.doSearch(e.target.value)}/>
                        <InputGroupAddon addonType="append">
                            <Button color="secondary" outline>
                                <i className="fa fa-search"/>
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </DropdownToggle>
                <ExtendedDropdown right>
                    {this.state.stocks.length > 0 ? (
                        <ExtendedDropdown.Section list>
                            <ListGroup>
                                {this.state.stocks.map((stock, index) => (
                                    <ListGroupItem tag={ExtendedDropdown.Link}
                                                   to={`/analysis/${stock.instrument_type}/NSE/${stock.symbol}/seasonal`}
                                                   key={index}
                                                   action>
                                        <Media onClick={() => {
                                            this.setState({dropdownOpen: false})
                                        }
                                        }>

                                            <Media body>
                                            <span className="d-flex justify-content-start">
                                        <span className="h6 pb-0 mb-0 d-flex align-items-center">
                                            {stock.symbol}
                                        </span>
                                        <span
                                            className="ml-auto small"> {this.capitalize(stock.instrument_type)}, {stock.exchange}</span>
                                    </span>
                                                <p className="mt-2 mb-1">
                                                    {stock.name}
                                                </p>
                                            </Media>
                                        </Media>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </ExtendedDropdown.Section>
                    ) : (
                        <ExtendedDropdown.Section className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">{this.state.message}</h6>
                        </ExtendedDropdown.Section>
                    )}

                    {/*<ExtendedDropdown.Section className="text-center" tag={ExtendedDropdown.Link} to="/apps/inbox">*/}
                    {/*    View All*/}
                    {/*    <i className="fa fa-angle-right fa-fw ml-2"/>*/}
                    {/*</ExtendedDropdown.Section>*/}
                </ExtendedDropdown>
            </UncontrolledDropdown>
        )
    }
}
