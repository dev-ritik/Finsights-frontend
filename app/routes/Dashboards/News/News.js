import React from 'react';
import {CardColumns, Container, withPageConfig} from './../../../components';

import {HeaderMain} from "../../components/HeaderMain";
import PropTypes from "prop-types";
import {newSymbolSelection} from "../../../redux/SearchedSymbol";
import {connect} from "react-redux";
import axios from "axios";
import {API_URL, REDDIT, TELEGRAM, TWITTER, YOUTUBE} from "../../../constants";
import moment from "moment";
import {
    Button,
    ButtonGroup,
    ButtonToolbar,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledButtonDropdown
} from "../../../components";
import {Feed} from "../../components/Feed/Feed";
import _ from "lodash";
import {DURATIONS} from "./durations";

function get_symbol_slug(page_props) {
    if (typeof page_props === 'undefined' || typeof page_props.match === 'undefined'
        || typeof page_props.match.params === 'undefined' || typeof page_props.match.params.symbol === 'undefined') {
        return "";
    } else {
        return page_props.match.params.symbol;
    }
}

class News extends React.Component {

    constructor(props) {
        super(props);
        if (get_symbol_slug(this.props) !== "") {
            this.props.newSymbolSelection({
                'type': `${this.props.match.params.type}`,
                'symbol': `${this.props.match.params.symbol}`,
            })
        }
        this.state = {
            redditNextUpdate: moment().toISOString(),
            telegramNextUpdate: moment().toISOString(),
            youtubeNextUpdate: moment().toISOString(),
            twitterNextUpdate: moment().toISOString(),
            duration: DURATIONS.All,
            sort: 'relevance',
            refresh: false,
        };
        this.performQuery();
    }

    performQuery() {
        axios.get(`${API_URL}/news/next_update`).then(res => {
            this.setState({
                redditNextUpdate: res.data[REDDIT],
                telegramNextUpdate: res.data[TELEGRAM],
                youtubeNextUpdate: res.data[YOUTUBE],
                twitterNextUpdate: res.data[TWITTER],
            })
        });
    }

    get_symbol_representation(symbol_slug) {
        if (symbol_slug === 'all')
            return "";
        return symbol_slug;
    }

    getPageTitle() {
        return `News${get_symbol_slug(this.props) === "" ? "" : ` - ${get_symbol_slug(this.props)}`}`
    }

    componentDidUpdate(prevProps, prevState, ss) {
        if (this.state.refresh !== prevState.refresh) {
            this.performQuery();
        }
        if (get_symbol_slug(this.props) !== get_symbol_slug(prevProps)) {
            this.props.pageConfig.changeMeta({
                pageTitle: this.getPageTitle()
            });
        }
    }

    componentDidMount() {
        this.prevConfig = _.pick(this.props.pageConfig,
            ['pageTitle', 'pageDescription', 'pageKeywords']);
        this.props.pageConfig.changeMeta({
            pageTitle: this.getPageTitle()
        });
    }

    componentWillUnmount() {
        this.props.pageConfig.changeMeta(this.prevConfig);
    }


    render() {
        return <Container>
            <div className="d-flex mt-3 mb-5">
                <HeaderMain
                    title={`News${get_symbol_slug(this.props) === "" ? "" : ": " + get_symbol_slug(this.props)}`}
                    className="mt-0"
                />
                <ButtonToolbar className="ml-auto">
                    <ButtonGroup className="align-self-start mr-2">
                        <UncontrolledButtonDropdown className="ml-auto flex-column">
                            <DropdownToggle color="link" className="text-left pl-0 text-decoration-none mb-2">
                                <i className="fa fa-fw fa-calendar text-body mr-2"/>
                                {this.state.duration}<i className="fa fa-angle-down text-body ml-2"/>
                            </DropdownToggle>
                            <div className="small">
                                Duration filter
                            </div>
                            <DropdownMenu>
                                {Object.entries(DURATIONS).map(([key, value]) => (
                                    <DropdownItem active={this.state.duration === value}
                                                  onClick={
                                                      () => {
                                                          this.setState({duration: value});
                                                      }
                                                  }
                                                  key={key}
                                    >
                                        {value}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </ButtonGroup>
                    <ButtonGroup className="align-self-start mr-2">
                        <UncontrolledButtonDropdown className="ml-auto flex-column">
                            <DropdownToggle color="link" className="text-left pl-0 text-decoration-none mb-2">
                                <i className="fa fa-fw fa-sort text-body mr-2"/>
                                {this.state.sort}<i className="fa fa-angle-down text-body ml-2"/>
                            </DropdownToggle>
                            <div className="small">
                                Sort by
                            </div>
                            <DropdownMenu>
                                <DropdownItem active={this.state.sort === 'relevance'}
                                              onClick={
                                                  () => {
                                                      this.setState({sort: 'relevance'});
                                                  }
                                              }>
                                    relevance
                                </DropdownItem>
                                <DropdownItem active={this.state.sort === 'date'}
                                              onClick={
                                                  () => {
                                                      this.setState({sort: 'date'});
                                                  }
                                              }>
                                    date
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </ButtonGroup>
                    <ButtonGroup className="align-self-start">
                        <Button color="primary" className="mb-2 mr-2 px-3" onClick={() => {
                            // Toggle the refresh to update child
                            this.setState({
                                refresh: !this.state.refresh
                            });
                        }}>
                            Refresh
                        </Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </div>
            <CardColumns>
                {/* Weird warning, gets fixed when we replace proptypes from variables to actual string */}
                <Feed platform={TELEGRAM}
                      symbol={get_symbol_slug(this.props)}
                      next_update={this.state.telegramNextUpdate}
                      duration={this.state.duration}
                      sort={this.state.sort}
                      refresh={this.state.refresh}
                />
                <Feed platform={YOUTUBE}
                      symbol={get_symbol_slug(this.props)}
                      next_update={this.state.youtubeNextUpdate}
                      duration={this.state.duration}
                      sort={this.state.sort}
                      refresh={this.state.refresh}
                />
                <Feed platform={TWITTER}
                      symbol={get_symbol_slug(this.props)}
                      next_update={this.state.twitterNextUpdate}
                      duration={this.state.duration}
                      sort={this.state.sort}
                      refresh={this.state.refresh}
                />
                <Feed platform={REDDIT}
                      symbol={get_symbol_slug(this.props)}
                      next_update={this.state.redditNextUpdate}
                      duration={this.state.duration}
                      sort={this.state.sort}
                      refresh={this.state.refresh}
                />
            </CardColumns>
        </Container>;
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        newSymbolSelection: (newSymbol) => {
            dispatch(newSymbolSelection(newSymbol))
        },
    }
}

export default connect(null, mapDispatchToProps)(withPageConfig(News));

News.propTypes = {
    match: PropTypes.shape({params: PropTypes.any}),
    newSymbolSelection: PropTypes.func,
    pageConfig: PropTypes.object
};