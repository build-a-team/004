import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import firebase from "config/firebase";
import styles from "./BottomNav.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

const linkStyles = {
    link: {
        display: "block",
        fontFamily: "Gotham",
        fontSize: 32,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: " -0.5px",
        textAlign: "center",
        textDecoration: "none"
    }
};
const LinkText = [
    {
        tabName: "Select",
        idx: 0,
        path: "/"
    },
    {
        tabName: "Feed",
        idx: 1,
        path: "/feed"
    },
    {
        tabName: "Upload",
        idx: 2,
        path: "/upload"
    },
    {
        tabName: "My",
        idx: 3,
        path: "/my-page"
    }
];

class BottomNav extends Component {
    state = {
        currentIdx: this.props.currentIdxs
    };

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
                    {LinkText.map((link, i) => {
                        return i === 2 ? (
                            <div className="col-3">
                                <button onClick={this.handlePreWrite}>
                                    글쓰기
                                </button>
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
                        ) : (
                            <div className="col-3 link-container">
                                <Link
                                    key={`link-${link.path}`}
                                    to={link.path}
                                    style={{
                                        color:
                                            this.state.currentIdx === link.idx
                                                ? "#1d20ff"
                                                : "#d8d8d8",
                                        borderTop: `2px solid ${
                                            this.state.currentIdx === link.idx
                                                ? "#1d20ff"
                                                : "transparent"
                                        }`,
                                        ...linkStyles.link
                                    }}
                                >
                                    {link.tabName}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default withRouter(BottomNav);
