import React from 'react';
import {
    Card,
    CardBody,
    CardColumns,
    CardFooter,
    CardTitle,
    Container,
    ListGroup,
    ListGroupItem
} from './../../../components';

import {HeaderMain} from "../../components/HeaderMain";
import {ChatCardFooter} from "../../components/Chat/ChatCardFooter";
import axios from "axios";
import {Reddit} from "../../components/Post/Reddit";
import {API_URL} from "../../../constants";
import {Twitter} from "../../components/Post/Twitter";


export class News extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redditPosts: [],
            twitterPosts: [],
        };
        axios.get(`${API_URL}/news/reddit`).then(res => {
            this.setState({redditPosts: res.data});
        });
        axios.get(`${API_URL}/news/twitter`).then(res => {
            this.setState({twitterPosts: res.data});
        })
    }

    render() {
        return <Container>
            <HeaderMain
                title="News"
                className="mb-5 mt-4"
            />
            <CardColumns>
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
                    <CardFooter>
                        <ChatCardFooter/>
                    </CardFooter>
                </Card>
                <Card className="mb-3">
                    <CardBody>
                        <CardTitle tag="h6" className="mb-4">
                            Twitter
                        </CardTitle>
                        <ListGroup flush>
                            {this.state.twitterPosts.map(function (data, index) {
                                return <ListGroupItem key={index}><Twitter {...data}/></ListGroupItem>;
                            })}
                        </ListGroup>
                    </CardBody>
                </Card>
                <Card className="mb-3">
                    <CardBody>
                        <CardTitle tag="h6" className="mb-4">
                            Youtube
                        </CardTitle>
                    </CardBody>
                </Card>
                <Card className="mb-3">
                    <CardBody>
                        <CardTitle tag="h6" className="mb-4">
                            Telegram
                        </CardTitle>
                    </CardBody>
                </Card>
            </CardColumns>
        </Container>;
    }
}