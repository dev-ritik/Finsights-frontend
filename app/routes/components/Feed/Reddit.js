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
import {Reddit} from "../Post/Reddit";
import {API_URL, POSTS_PER_PAGE} from "../../../constants";
import {Paginations} from "../Paginations";
import PropTypes from "prop-types";
import {timeSince} from "../../../utilities";
import {
    ButtonGroup,
    ButtonToolbar,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledButtonDropdown
} from "../../../components";
import './../../../styles/custom.scss';


export class RedditFeed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redditPosts: [],
            currentPage: 1,
            pageCount: 1,
            symbol: this.props.symbol,
            sort: 'relevance',
        };
        this.performQuery(0);
    }

    performQuery(offset, sort = this.state.sort) {
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
                sort: sort,
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
        return <Container className="pr-0 pl-0">
            <Card className="mb-3">
                <CardBody className="bg-reddit">
                    <div className="d-flex mb-2">
                        <span className="mr-2 text-left">
                                <Button className="text-decoration-none align-self-center" disabled id="delete">
                                    <i className="fa fa-lg fa-reddit"/>
                                </Button>
                            </span>
                        <CardTitle tag="h3" className="mb-2 mt-1">
                            Reddit
                        </CardTitle>
                        <span className="ml-auto text-right">
                            <i className="ml-auto text-right fa fa-fw fa-info-circle" id="next_update_reddit"/>
                        </span>
                        <UncontrolledTooltip placement="top" target="next_update_reddit">
                            Updating {timeSince(this.props.next_update)}
                        </UncontrolledTooltip>
                    </div>
                    <div className="flex-column flex-md-row d-flex white-background">
                        <ButtonToolbar className="ml-auto">
                            <ButtonGroup className="mr-2">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" caret>
                                        Sort by {this.state.sort}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem
                                            onClick={() => {
                                                this.setState({
                                                    sort: 'relevance'
                                                });
                                                this.performQuery(0, 'relevance');
                                            }}
                                        >
                                            relevance
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={() => {
                                                this.setState({
                                                    sort: 'date'
                                                });
                                                this.performQuery(0, 'date');
                                            }}
                                        >
                                            date
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                    <hr className="p-1 m-0 white-background"/>
                    <ListGroup flush>
                        {this.state.redditPosts.map(function (data, index) {
                            return <ListGroupItem className="p-2" key={index}><Reddit {...data}/></ListGroupItem>;
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