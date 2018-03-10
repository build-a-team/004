import React, { Component } from 'react';
import _ from 'lodash';
import firebase from 'config/firebase';
import classNames from "classnames/bind";
import styles from "./FeedPage.scss";
import Feed from "./Feed"
const cx = classNames.bind(styles);

const rootRef = firebase.database().ref();
const feedsRef = rootRef.child('feeds');
const timeRef = firebase.database.ServerValue.TIMESTAMP;

class FeedPage extends Component {
    state = { 
        feeds: []
    }

    componentDidMount() {
        feedsRef.on('value', snap => {
            const feeds = [];
            snap.forEach(shot => {
                feeds.push({ ...shot.val(), key: shot.key });
            });
            this.setState({ feeds });
        });
    }

    render() {
        return (
            <div>
                {
                    _.map(this.state.feeds, (feed) => {
                        return <Feed data={feed} />
                    })
                }
            </div>
        );
    }
}

export default FeedPage;