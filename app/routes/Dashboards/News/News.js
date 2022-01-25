import React from 'react';
import {CardColumns, Container} from './../../../components';

import {HeaderMain} from "../../components/HeaderMain";
import {RedditFeed} from "../../components/Feed/Reddit";
import {TwitterFeed} from "../../components/Feed/Twitter";
import {TelegramFeed} from "../../components/Feed/Telegram";
import {YoutubeFeed} from "../../components/Feed/Youtube";
import PropTypes from "prop-types";
import {newSymbolSelection} from "../../../redux/SearchedSymbol";
import {connect} from "react-redux";
import axios from "axios";
import {API_URL} from "../../../constants";
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


class News extends React.Component {

    constructor(props) {
        super(props);
        if (this.get_symbol_slug(this.props) !== "all") {
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
            sort: 'relevance',
            refresh: false,
        };
        this.performQuery();
    }

    performQuery() {
        axios.get(`${API_URL}/news/next_update`).then(res => {
            this.setState({
                redditNextUpdate: res.data.re,
                telegramNextUpdate: res.data.te,
                youtubeNextUpdate: res.data.yt,
                twitterNextUpdate: res.data.tw,
            })
        });
    }

    get_symbol_slug(page_props) {
        if (typeof page_props === 'undefined' || typeof page_props.match === 'undefined'
            || typeof page_props.match.params === 'undefined' || typeof page_props.match.params.symbol === 'undefined') {
            return "all";
        } else {
            return page_props.match.params.symbol;
        }
    }

    get_symbol_representation(symbol_slug) {
        if (symbol_slug === 'all')
            return "";
        return symbol_slug;
    }

    componentDidUpdate(prevProps, prevState, ss) {
        // Typical usage (don't forget to compare props):
        if (this.state.refresh !== prevState.refresh ) {
            this.performQuery();
        }
    }

    render() {
        return <Container>
            <div className="d-flex mt-3 mb-5">
                <HeaderMain
                    title={`News${this.get_symbol_slug(this.props) === "all" ? "" : ": " + this.get_symbol_slug(this.props)}`}
                    className="mt-0"
                />
                <ButtonToolbar className="ml-auto">
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
                <RedditFeed symbol={this.get_symbol_slug(this.props)}
                            next_update={this.state.redditNextUpdate}
                            sort={this.state.sort}
                            refresh={this.state.refresh}
                />
                <TwitterFeed symbol={this.get_symbol_slug(this.props)}
                             next_update={this.state.twitterNextUpdate}
                             sort={this.state.sort}
                             refresh={this.state.refresh}
                />
                <TelegramFeed symbol={this.get_symbol_slug(this.props)}
                              next_update={this.state.telegramNextUpdate}
                              sort={this.state.sort}
                              refresh={this.state.refresh}
                />
                <YoutubeFeed symbol={this.get_symbol_slug(this.props)}
                             next_update={this.state.youtubeNextUpdate}
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

export default connect(null, mapDispatchToProps)(News);

News.propTypes = {
    match: PropTypes.shape({params: PropTypes.any}),
    newSymbolSelection: PropTypes.func,
};