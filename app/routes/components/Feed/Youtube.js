import React from 'react';
import {Card, CardBody, CardFooter, CardTitle, Container, ListGroup, ListGroupItem} from './../../../components';
import axios from "axios";
import {Youtube} from "../Post/Youtube";
import {API_URL, POSTS_PER_PAGE} from "../../../constants";
import {Paginations} from "../Paginations";


export class YoutubeFeed extends React.Component {

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
        axios.get(`${API_URL}/news/youtube`, {
            params: {
                limit: POSTS_PER_PAGE,
                offset: offset,
            }
        }).then(res => {
            this.setState({
                posts: res.data.results,
                pageCount: Math.ceil(res.data.count / POSTS_PER_PAGE),
            })
        });
    }

    render() {
        return <Container>
            <Card className="mb-3">
                <CardBody>
                    <CardTitle tag="h3" className="mb-4">
                        Youtube
                    </CardTitle>
                    <ListGroup flush>
                        {this.state.posts.map(function (data, index) {
                            return <ListGroupItem key={index}><Youtube {...data}/></ListGroupItem>;
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