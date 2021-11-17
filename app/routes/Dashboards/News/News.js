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


class News extends React.Component {

    constructor(props) {
        super(props);
        if (this.get_symbol_slug(this.props) !== "all") {
            this.props.newSymbolSelection({
                'type': `${this.props.match.params.type}`,
                'symbol': `${this.props.match.params.symbol}`,
            })
        }
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

    render() {
        return <Container>
            <HeaderMain
                title={`News${this.get_symbol_slug(this.props) === "all" ? "" : ": " + this.get_symbol_slug(this.props)}`}
                className="mb-5 mt-4"
            />
            <CardColumns>
                <RedditFeed symbol={this.get_symbol_slug(this.props)}/>
                <TwitterFeed symbol={this.get_symbol_slug(this.props)}/>
                <TelegramFeed symbol={this.get_symbol_slug(this.props)}/>
                <YoutubeFeed symbol={this.get_symbol_slug(this.props)}/>
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