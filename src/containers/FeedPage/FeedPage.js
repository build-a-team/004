import React, { Component } from "react";
import firebase from "config/firebase";
import classNames from "classnames/bind";
import styles from "./FeedPage.scss";
const cx = classNames.bind(styles);


class FeedPage extends Component {
    render() {
        return (
            <div className={cx("feed-page")}>
                <header className=""></header>        
            </div>
        );
    }
}

export default FeedPage;