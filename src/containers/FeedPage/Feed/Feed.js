import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./Feed.scss";
const cx = classNames.bind(styles);

const feed = props => {
    console.log(props);
    return (
        <div className={cx("feed")}>
            <div className={cx("feed-img-wrap")}>
                <img src={props.img} />
            </div>
            <div className={cx("feed-body")}>
                <h3 className={cx("hash-tag")}>{props.hashtag}</h3>
                <span className={cx("feed-count")}>{props.count}</span>
            </div>
        </div>
    );
};

export default feed;
