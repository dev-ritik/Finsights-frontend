import React from 'react';
import {Card, CardBody, CardFooter, CardTitle, Container, ListGroup, ListGroupItem} from './../../../components';
import axios from "axios";
import {API_URL} from "../../../constants";
import {Paginations} from "../Paginations";
import {Twitter} from "../Post/Twitter";


export class TwitterFeed extends React.Component {

    PER_PAGE = 10;

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            currentPage: 1,
            pageCount: 1,
        };
        this.performQuery(0);
    }

    performQuery(offset) {
        axios.get(`${API_URL}/news/twitter`, {
            params: {
                limit: this.PER_PAGE,
                offset: offset,
            }
        }).then(res => {
            this.setState({
                posts: res.data.results,
                pageCount: Math.ceil(res.data.count / this.PER_PAGE),
            })
        });
    }

    render() {
        return <Container>
            <Card className="mb-3">
                <CardBody>
                    <CardTitle tag="h6" className="mb-4">
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