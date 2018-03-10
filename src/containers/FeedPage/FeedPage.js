import React, { Component } from "react";
import firebase from "config/firebase";
import classNames from "classnames/bind";
import styles from "./FeedPage.scss";
import BottomNav from "components/BottomNav";
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
                    <div className="col-12 tag-Img">#데이트룩</div>
                    <div className="col-12 tag-Img">#데이트룩</div>
                    <div className="col-12 tag-Img">#데이트룩</div>
                </div>
                <BottomNav className="bottom-nav"/>          
            </div>
        );
    }
}

export default FeedPage;