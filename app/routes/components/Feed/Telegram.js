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
import {Telegram} from "../Post/Telegram";
import PropTypes from "prop-types";
import {timeSince} from "../../../utilities";


export class TelegramFeed extends React.Component {

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
        axios.get(`${API_URL}/news/${exchange}/${this.props.symbol}/telegram`, {
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
        return <Container className="pr-0 pl-0">
            <Card className="mb-3">
                <CardBody className="bg-primary">
                    <div className="d-flex mb-2">
                        <span className="mr-2 text-left">
                                <Button className="text-decoration-none align-self-center" disabled id="delete">
                                    <i className="fa fa-lg fa-send"/>
                                </Button>
                            </span>
                        <CardTitle tag="h3" className="mb-2 mt-1">
                            Telegram
                        </CardTitle>
                        <span className="ml-auto text-right">
                            <i className="ml-auto text-right fa fa-fw fa-info-circle" id="next_update_telegram"/>
                        </span>
                        <UncontrolledTooltip placement="top" target="next_update_telegram">
                            Updating {timeSince(this.props.next_update)}
                        </UncontrolledTooltip>
                    </div>
                    <ListGroup flush>
                        {this.state.posts.map(function (data, index) {
                            return <ListGroupItem className="p-2" key={index}><Telegram {...data}/></ListGroupItem>;
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

TelegramFeed.propTypes = {
    symbol: PropTypes.string,
    next_update: PropTypes.string,
};