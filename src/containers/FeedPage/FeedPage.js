import React, { Component } from "react";
import Feed from "./Feed";
import firebase from "config/firebase";
import classNames from "classnames/bind";
import styles from "./FeedPage.scss";
import BottomNav from "components/BottomNav";
import testImg from "assets/images/img-card.png";
const cx = classNames.bind(styles);

class FeedPage extends Component {
    render() {
        return (
            <div className={cx("feed-page")}>
                <nav className={cx("feed-nav")}>
                    <button className="col-4 hash-tag">#해시태그</button>
                    <button className="col-4 hash-tag">#해시태그</button>
                    <button className="col-4 plus">+</button>
                </nav>
                <div className="container-tagImg">
                    <Feed img={testImg} hashtag="#Date_look" count="1000" />
                    <Feed img={testImg} hashtag="#Girl_crush" count="355,000" />
                    <Feed img={testImg} hashtag="#rain" count="2000" />
                </div>
                <BottomNav className="bottom-nav" />
            </div>
        );
    }
}

export default FeedPage;
