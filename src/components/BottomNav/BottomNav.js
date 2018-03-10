import React, { Component } from "react";
import { withRouter } from "react-router-dom";

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
        this.cameraUpload.click();
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
