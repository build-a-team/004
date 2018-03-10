import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import firebase from "config/firebase";
import styles from "./BottomNav.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

class BottomNav extends Component {
    handleWrite = event => {
        const file = event.target.files[0];
        this.setState({
            file
        });
        this.props.history.push({
            pathname: "/upload",
            state: { updatingImage: file }
        });
    };

    handlePreWrite = event => {
        firebase.auth().onAuthStateChanged(({ email }) => {
            if (email) {
                this.cameraUpload.click();
            } else {
                alert("로그인이 필요한 서비스입니다.");
                return;
            }
        });
    };

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
                        <button onClick={this.handlePreWrite}>글쓰기</button>
                        <input
                            type="file"
                            style={{ display: "none" }}
                            capture="camera"
                            accept="image/*"
                            ref={input => {
                                this.cameraUpload = input;
                            }}
                            id="cameraInput"
                            name="cameraInput"
                            onChange={this.handleWrite}
                        />
                    </div>
                    <div className="col-3">
                        <button>마이페이지</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(BottomNav);
