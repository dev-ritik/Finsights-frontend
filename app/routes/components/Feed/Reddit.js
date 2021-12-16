import React from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Container,
    ListGroup,
    ListGroupItem,
    UncontrolledTooltip
} from './../../../components';
import axios from "axios";
import {Reddit} from "../Post/Reddit";
import {API_URL, POSTS_PER_PAGE} from "../../../constants";
import {Paginations} from "../Paginations";
import PropTypes from "prop-types";
import {timeSince} from "../../../utilities";


export class RedditFeed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redditPosts: [],
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
        axios.get(`${API_URL}/news/${exchange}/${this.props.symbol}/reddit`, {
            params: {
                limit: POSTS_PER_PAGE,
                offset: offset,
            }
        }).then(res => {
            this.setState({
                redditPosts: res.data.results,
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
                    <div className="d-flex mb-2">
                        <CardTitle tag="h4" className="mb-4">
                            Reddit
                        </CardTitle>
                        <span className="ml-auto text-right">
                            <i className="ml-auto text-right fa fa-fw fa-info-circle" id="next_update_reddit"/>
                        </span>
                        <UncontrolledTooltip placement="top" target="next_update_reddit">
                            Updating {timeSince(this.props.next_update)}
                        </UncontrolledTooltip>
                    </div>
                    <ListGroup flush>
                        {this.state.redditPosts.map(function (data, index) {
                            return <ListGroupItem key={index}><Reddit {...data}/></ListGroupItem>;
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

RedditFeed.propTypes = {
    symbol: PropTypes.string,
    next_update: PropTypes.string,
};