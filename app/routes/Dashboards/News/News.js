import React from 'react';
import {Card, CardBody, CardColumns, CardTitle, Container} from './../../../components';

import {HeaderMain} from "../../components/HeaderMain";
import {RedditFeed} from "../../components/Feed/Reddit";
import {TwitterFeed} from "../../components/Feed/Twitter";


export class News extends React.Component {
    render() {
        return <Container>
            <HeaderMain
                title="News"
                className="mb-5 mt-4"
            />
            <CardColumns>
                <RedditFeed/>
                <TwitterFeed/>
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