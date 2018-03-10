import React, { Component } from 'react';
import _ from 'lodash';
import firebase from 'config/firebase';
import classNames from "classnames/bind";
import styles from "./FeedPage.scss";
const cx = classNames.bind(styles);

const rootRef = firebase.database().ref();
const feedsRef = rootRef.child('feeds');
const timeRef = firebase.database.ServerValue.TIMESTAMP;

class FeedPage extends Component {
    state = { 
        feeds: [
            {
                imageUrl: '"https://firebasestorage.googleapis.com/v0/b/build004-f298c.appspot.com/o/cat.jpg61a07880-246a-11e8-a78e-69fff36fa26a?alt=media&token=cd671040-944b-4f7a-b60e-c233440cc073"',
                rates: {
                    '1': -1,
                    '2': 1,
                    '3': -1,
                    '4': 1
                },
                tags: {}
            },
            {
                imageUrl: '"https://firebasestorage.googleapis.com/v0/b/build004-f298c.appspot.com/o/cat.jpg61a07880-246a-11e8-a78e-69fff36fa26a?alt=media&token=cd671040-944b-4f7a-b60e-c233440cc073"',
                rates: {
                    '1': 1,
                    '2': 0,
                    '3': 1,
                    '4': 0
                },
                tags: {}
            }
        ]
    }

    componentDidMount() {
        feedsRef.on('value', snap => {
            const feeds = [];
            snap.forEach(shot => {
                feeds.push({ ...shot.val(), key: shot.key });
            });
            // this.setState({ feeds });
        });
    }

    sumRate(rates) {
        return _.reduce(rates, function(result, value, key) {
            return result + _.parseInt(value);
        }, 0)
    }

    updateRate = (feed, rate) => {
        const { key } = feed;
        feedsRef.child(key).child('rates').push({ id: timeRef, rate: rate });
    };

    render() {
        return (
            <div>
                {
                    _.map(this.state.feeds, (feed) => {
                        return <div>
                            <div>
                                <img src={feed.imageUrl} alt="" />
                            </div>
                            <div>{this.sumRate(feed.rates)}</div>
                            <div>
                                <button onClick={this.updateRate(feed, -1)}>Up</button>
                                <button onClick={this.updateRate(feed, 1)}>Down</button>
                            </div>
                        </div>
                    })
                }
            </div>
        );
    }
}

export default FeedPage;