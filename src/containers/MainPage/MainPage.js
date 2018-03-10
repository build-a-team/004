import React, { Component } from "react";
import styles from "./MainPage.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

class MainPage extends Component {
    render() {
        return (
            <div className={cx("main-page")}>
                <h1>Main Page</h1>
                <h1>이미지</h1>
                <div className="row">
				  <div className="col-sm-6">스투핏</div>
				  <div className="col-sm-6">그뤠잇</div>
				</div>
            </div>
        );
    }
}

export default MainPage;
