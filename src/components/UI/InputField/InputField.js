import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./InputField.scss";
const cx = classNames.bind(styles);

const inputField = props => {
    return (
        <div className={cx("input-wrap")}>
            <label>
                <input className={cx("input")} {...props} />
            </label>
        </div>
    );
};

export default inputField;
