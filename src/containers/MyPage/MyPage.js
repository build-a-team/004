import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./MyPage.scss";
import classNames from "classnames/bind";
import BottomNav from "components/BottomNav";
const cx = classNames.bind(styles);

class MyPage extends Component {
    render() {
        return (
            <div className={cx("my-page")}>
                <nav className={cx("myPage-nav")}>
                    <button className="show-result">
                        <Link to="/vote-result">스타일통계</Link>
                    </button>
                </nav>
                <h1>닉네임</h1>
                <div className="col-12 mypage-comment">한줄 총평</div>
                <div className="row container-btn">
                    <div className="col-6 mypage-btn">
                        <button>history</button>
                    </div>
                    <div className="col-6 mypage-btn">
                        <button>like</button>
                    </div>
                </div>
                <div className="container-tagImg">
                    <div className="row container-tagImg">
                        <div className="col-6 tag-Img">#데이트룩</div>
                        <div className="col-6 tag-Img">#데이트룩</div>
                    </div>
                    <div className="row container-tagImg">
                        <div className="col-6 tag-Img">#데이트룩</div>
                        <div className="col-6 tag-Img">#데이트룩</div>
                    </div>
                    <div className="row container-tagImg">
                        <div className="col-6 tag-Img">#데이트룩</div>
                        <div className="col-6 tag-Img">#데이트룩</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyPage;
