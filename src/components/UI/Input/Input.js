import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./LoginPage.scss";
const cx = classNames.bind(styles);

const input = props => {
    return (
        <div className={cx("input-wrap")}>
            <label>
                <input className={cx("input")} {...props} />
            </label>
        </div>
    );
};

export default input;
