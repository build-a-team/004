import React, { Component } from "react";
import styles from "./MainPage.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

class MainPage extends Component {
    render() {
        return (
            <div classNames={cx("main-page")}>
                <h1>Main Page</h1>
            </div>
        );
    }
}

export default MainPage;
