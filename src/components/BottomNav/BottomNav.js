import React, { Component } from "react";
import styles from "./BottomNav.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

class BottomNav extends Component {
    render() {
        return (
            <div className={cx("bottom-nav")}>
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

export default BottomNav;
