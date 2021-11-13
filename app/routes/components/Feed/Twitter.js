import React from 'react';
import {Card, CardBody, CardFooter, CardTitle, Container, ListGroup, ListGroupItem} from './../../../components';
import axios from "axios";
import {API_URL, POSTS_PER_PAGE} from "../../../constants";
import {Paginations} from "../Paginations";
import {Twitter} from "../Post/Twitter";
import PropTypes from "prop-types";


export class TwitterFeed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            currentPage: 1,
            pageCount: 1,
            symbol: this.props.symbol,
        };
        this.performQuery(0);
    }

    performQuery(offset) {
        let exchange;
        if (this.props.symbol === "all") {
            exchange = "all"
        } else {
            exchange = "NSE"
        }

        axios.get(`${API_URL}/news/${exchange}/${this.props.symbol}/twitter`, {
            params: {
                limit: POSTS_PER_PAGE,
                offset: offset,
            }
        }).then(res => {
            this.setState({
                posts: res.data.results,
                pageCount: Math.ceil(res.data.count / POSTS_PER_PAGE),
                symbol: this.props.symbol,
            })
        });
    }

    render() {
        if (this.state.symbol !== this.props.symbol) {
            this.performQuery(0);
        }
        return <Container>
            <Card className="mb-3">
                <CardBody>
                    <CardTitle tag="h3" className="mb-4">
                        Twitter
                    </CardTitle>
                    <ListGroup flush>
                        {this.state.posts.map(function (data, index) {
                            return <ListGroupItem key={index}><Twitter {...data}/></ListGroupItem>;
                        })}
                    </ListGroup>
                </CardBody>
                <CardFooter className="justify-content-center">
                    <Paginations page_count={this.state.pageCount} active={this.state.currentPage}
                                 goToPage={(page_number) => {
                                     const offset = (page_number - 1) * POSTS_PER_PAGE;
                                     this.setState({
                                         currentPage: page_number,
                                     });
                                     this.performQuery(offset);
                                 }}/>
                </CardFooter>
            </Card>
        </Container>;
    }
}

TwitterFeed.propTypes = {
    symbol: PropTypes.string,
};