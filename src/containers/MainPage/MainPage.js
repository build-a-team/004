import React, { Component } from "react";
import styles from "./MainPage.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

class MainPage extends Component {
    render() {
        return (
            <div className={cx("main-page")}>
            	<nav className={cx("main-nav")}>
            		<button className="hash-tag">#해시태그</button>
            		<button className="hash-tag">#해시태그</button>
            		<button className="show-result">결과보기</button>
            	</nav>
                <div className="img">이미지</div>
                <div className="row select-btns-wrapper">
				  <div className="col-6">
				  	<button>스투핏</button>
				  </div>
				  <div className="col-6">
				  	<button>그뤠잇</button>
				  </div>
				</div>
				<div className="row nav-btns-wrapper">
				  <div className="col-3">
				  	<button>그뤠잇</button>
				  </div>
				  <div className="col-3">
				  	<button>해시태그</button>
				  </div>
				  <div className="col-3">
				  	<button>글쓰기</button>
				  </div>
				  <div className="col-3">
				  	<button>마이페이지</button>
				  </div>
				</div>
            </div>
        );
    }
}

export default MainPage;
