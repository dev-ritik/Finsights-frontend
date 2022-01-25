import React from 'react';
import {
    Button,
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
import {API_URL, POSTS_PER_PAGE} from "../../../constants";
import {Paginations} from "../Paginations";
import {Twitter} from "../Post/Twitter";
import PropTypes from "prop-types";
import {timeSince} from "../../../utilities";
import './../../../styles/custom.scss';


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

    performQuery(offset, sort = this.props.sort) {
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
                sort: sort,
            }
        }).then(res => {
            this.setState({
                posts: res.data.results,
                pageCount: Math.ceil(res.data.count / POSTS_PER_PAGE),
                symbol: this.props.symbol,
            })
        });
    }

    componentDidUpdate(prevProps, prevState, ss) {
        // Typical usage (don't forget to compare props):
        if (this.state.symbol !== this.props.symbol ||
            this.props.refresh !== prevProps.refresh ||
            this.props.sort !== prevProps.sort) {
            this.performQuery(0);
        }
    }

    render() {
        return <Container className="pr-0 pl-0">
            <Card className="mb-3">
                <CardBody className="bg-twitter">
                    <div className="d-flex mb-2">
                        <span className="mr-2 text-left">
                                <Button className="text-decoration-none align-self-center" disabled id="delete">
                                    <i className="fa fa-lg fa-twitter"/>
                                </Button>
                            </span>
                        <CardTitle tag="h3" className="mb-2 mt-1">
                            Twitter
                        </CardTitle>
                        <span className="ml-auto text-right">
                            <i className="ml-auto text-right fa fa-fw fa-info-circle" id="next_update_twitter"/>
                        </span>
                        <UncontrolledTooltip placement="top" target="next_update_twitter">
                            Updating {timeSince(this.props.next_update)}
                        </UncontrolledTooltip>
                    </div>
                    <ListGroup flush>
                        {this.state.posts.map(function (data, index) {
                            return <ListGroupItem className="p-2" key={index}><Twitter {...data}/></ListGroupItem>;
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
    next_update: PropTypes.string,
    sort: PropTypes.string,
    refresh: PropTypes.bool,
};