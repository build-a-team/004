import React, { Component } from "react";
import _ from "lodash";
import Feed from "./Feed";
import firebase from "config/firebase";
import classNames from "classnames/bind";
import styles from "./FeedPage.scss";
import BottomNav from "components/BottomNav";
import testImg from "assets/images/img-card.png";
const cx = classNames.bind(styles);

class FeedPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: []
        };
    }

    componentDidMount() {
        const rootRef = firebase.database().ref();
        const tagsRef = rootRef.child("tags");
        const feedsRef = rootRef.child("feeds");

        let tags = [];
        let feeds = [];

        feedsRef.on("value", feedShots => {
            feeds = [];
            feedShots.forEach(feed => {
                feeds.push({
                    ...feed.val(),
                    id: feed.key
                });
            });

            console.log(feeds);
        });

        tagsRef.on("value", dataSnapShots => {
            tags = [];
            console.log(dataSnapShots);

            dataSnapShots.forEach(obj => {
                let containFeeds = _.filter(feeds, feed => {
                    return _.includes(feed.tagList, obj.val());
                });
                console.log(containFeeds[0].downloadURL);
                tags.push({
                    id: obj.key,
                    name: obj.val(),
                    img: containFeeds[0].downloadURL,
                    count: containFeeds.length
                });
            });
            tags = tags.reverse();

            this.setState({
                tags
            });
        });

        // this.setState({
        //     tags
        // });
    }

    render() {
        return (
            <div className={cx("feed-page")}>
                <div className="main-header">
                    <h1 className="main-title">Feed</h1>
                </div>
                <div className={cx("feed-search-tag")}>
                    <span className={cx("tag")}>#Girl</span>
                    <span className={cx("tag")}>#Daily_look</span>
                    <span className={cx("tag")}>#Lovely</span>
                </div>
                <div className="container-tagImg">
                    {this.state.tags.map(tag => {
                        return (
                            <Feed
                                img={tag.img}
                                key={tag.id}
                                hashtag={"#" + tag.name}
                                count={tag.count}
                            />
                        );
                    })}
                </div>
                <BottomNav className="bottom-nav" />
            </div>
        );
    }
}

export default FeedPage;
