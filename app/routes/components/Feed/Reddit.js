import React from 'react';
import {Card, CardBody, CardFooter, CardTitle, Container, ListGroup, ListGroupItem} from './../../../components';
import axios from "axios";
import {Reddit} from "../Post/Reddit";
import {API_URL} from "../../../constants";
import {Paginations} from "../Paginations";


export class RedditFeed extends React.Component {

    PER_PAGE = 10;

    constructor(props) {
        super(props);
        this.state = {
            redditPosts: [],
            currentPage: 1,
            pageCount: 1,
        };
        this.performQuery(0);
    }

    performQuery(offset) {
        axios.get(`${API_URL}/news/reddit`, {
            params: {
                limit: this.PER_PAGE,
                offset: offset,
            }
        }).then(res => {
            this.setState({
                redditPosts: res.data.results,
                pageCount: Math.ceil(res.data.count / this.PER_PAGE),
            })
        });
    }

    render() {
        return <Container>
            <Card className="mb-3">
                <CardBody>
                    <CardTitle tag="h6" className="mb-4">
                        Reddit
                    </CardTitle>
                    <ListGroup flush>
                        {this.state.redditPosts.map(function (data, index) {
                            return <ListGroupItem key={index}><Reddit {...data}/></ListGroupItem>;
                        })}
                    </ListGroup>
                </CardBody>
                <CardFooter className="justify-content-center">
                    <Paginations page_count={this.state.pageCount} active={this.state.currentPage}
                                 goToPage={(page_number) => {
                                     const offset = (page_number - 1) * this.PER_PAGE;
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