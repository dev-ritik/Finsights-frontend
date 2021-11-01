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


export class News extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
        axios.get(`${API_URL}/news/reddit`).then(res => {
            this.setState({posts: res.data});
        });
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
                            {this.state.posts.map(function (data, index) {
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