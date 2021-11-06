import React from 'react';
import {CardColumns, Container} from './../../../components';

import {HeaderMain} from "../../components/HeaderMain";
import {RedditFeed} from "../../components/Feed/Reddit";
import {TwitterFeed} from "../../components/Feed/Twitter";
import {TelegramFeed} from "../../components/Feed/Telegram";
import {YoutubeFeed} from "../../components/Feed/Youtube";


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
                <TelegramFeed/>
                <YoutubeFeed/>
            </CardColumns>
        </Container>;
    }
}