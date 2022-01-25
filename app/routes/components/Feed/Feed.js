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
import {API_URL, PLATFORM_CONSTANTS, POSTS_PER_PAGE, REDDIT, TELEGRAM, TWITTER, YOUTUBE} from "../../../constants";
import {Paginations} from "../Paginations";
import PropTypes from "prop-types";
import {timeSince} from "../../../utilities";
import './../../../styles/custom.scss';
import {Reddit} from "../Post/Reddit";
import {Telegram} from "../Post/Telegram";
import {Youtube} from "../Post/Youtube";
import {Twitter} from "../Post/Twitter";

export class Feed extends React.Component {

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
        axios.get(`${API_URL}/news/${exchange}/${this.props.symbol}/${PLATFORM_CONSTANTS[this.props.platform].search_slug}`,
            {
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
        const Post = (data) => {
            if (this.props.platform === REDDIT) {
                return <Reddit {...data}/>
            } else if (this.props.platform === TELEGRAM) {
                return <Telegram {...data}/>
            } else if (this.props.platform === YOUTUBE) {
                return <Youtube {...data}/>
            } else if (this.props.platform === TWITTER) {
                return <Twitter {...data}/>
            } else {
                return <></>
            }
        }

        return <Container className="pr-0 pl-0">
            <Card className="mb-3">
                <CardBody className={`bg-${PLATFORM_CONSTANTS[this.props.platform].search_slug}`}>
                    <div className="d-flex mb-2">
                        <span className="mr-2 text-left">
                                <Button className="text-decoration-none align-self-center" disabled id="delete">
                                    <i className={`fa fa-lg ${PLATFORM_CONSTANTS[this.props.platform].icon}`}/>
                                </Button>
                            </span>
                        <CardTitle tag="h3" className="mb-2 mt-1">
                            {PLATFORM_CONSTANTS[this.props.platform].label}
                        </CardTitle>
                        <span className="ml-auto text-right">
                            <i className="ml-auto text-right fa fa-fw fa-info-circle" id="next_update"/>
                        </span>
                        <UncontrolledTooltip placement="top" target="next_update">
                            Updating {timeSince(this.props.next_update)}
                        </UncontrolledTooltip>
                    </div>
                    <ListGroup flush>
                        {this.state.posts.map((data, index) => {
                            return <ListGroupItem
                                className="p-2"
                                key={index}
                            >
                                <Post {...data}/>
                            </ListGroupItem>
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

Feed.propTypes = {
    platform: PropTypes.oneOf([REDDIT, TELEGRAM, YOUTUBE, TWITTER]),
    symbol: PropTypes.string,
    next_update: PropTypes.string,
    sort: PropTypes.string,
    refresh: PropTypes.bool,
};