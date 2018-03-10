import React, { Component } from "react";
import { Link } from 'react-router-dom';
import styles from "./VoteResult.scss";
import classNames from "classnames/bind";
import BottomNav from "components/BottomNav";
const cx = classNames.bind(styles);

class VoteResult extends Component {
    render() {
        return (
        <div className={cx("vote-result")}>
          <button><Link to="/">뒤로가기</Link></button>
          <div className="img">이미지</div>
          <div className="vote-results-wrapper">
            <div className="row">
              <div className="col-6">
                <button>스투핏</button>
              </div>
              <div className="col-6">
                <button>그뤠잇</button>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <button>남</button>
              </div>
              <div className="col-6">
                <button>여</button>
              </div>
            </div>
            <div className="row">
              <p>“ 20대 중반이
많이 그뤠잇한 패션”</p>
            </div>
          </div>
          <BottomNav></BottomNav>
        </div>
        );
    }
}

export default VoteResult;
