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

import './../../styles/components/search.scss';
import {connect} from "react-redux";
import {hideDropdown, newSearch, newSymbolSelection} from "../../redux/SearchedSymbol";

class NavbarSearch extends Component {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        history: PropTypes.object,
        stocks: PropTypes.array,
        message: PropTypes.string,
        dropdownOpen: PropTypes.bool,
        search: PropTypes.func,
        hideDropdown: PropTypes.func,
        newSymbolSelection: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.timeout = 0;
    }

    doSearch = (searchText) => {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.props.search(searchText)
        }, 800);
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        return (
            <UncontrolledDropdown nav inNavbar isOpen={this.props.dropdownOpen} className={this.props.className}>
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
                    {this.props.stocks.length > 0 ? (
                        <ExtendedDropdown.Section list>
                            <ListGroup>
                                {this.props.stocks.map((stock, index) => (
                                    <ListGroupItem tag={ExtendedDropdown.Link}
                                                   to={`/analysis/${stock.instrument_type}/NSE/${stock.symbol}/seasonal`}
                                                   key={index}
                                                   action>
                                        <Media onClick={() => {
                                            this.props.hideDropdown()
                                            this.props.newSymbolSelection({
                                                'type': `${stock.instrument_type}`,
                                                'symbol': `${stock.symbol}`,
                                            })

                                        }}>

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
                            <h6 className="mb-0">{this.props.message}</h6>
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

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        message: state.searchedSymbol.message,
        stocks: state.searchedSymbol.stocks,
        dropdownOpen: state.searchedSymbol.dropdownOpen,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        search: (text) => {
            dispatch(newSearch(text))
        },
        newSymbolSelection: (newSymbol) => {
            dispatch(newSymbolSelection(newSymbol))
        },
        hideDropdown: () => {
            dispatch(hideDropdown())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarSearch);