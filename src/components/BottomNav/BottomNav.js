import React, { Component } from "react";
import { withRouter, Link, NavLink } from "react-router-dom";

import firebase from "config/firebase";
import styles from "./BottomNav.scss";
import classNames from "classnames/bind";
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
        tabName: "peeker peeker-ic-navi-select",
        idx: 0,
        path: "/"
    },
    {
        tabName: "peeker peeker-fill-1",
        idx: 1,
        path: "/feed"
    },
    {
        tabName: "peeker peeker-ic-navi-upload",
        idx: 2,
        path: "/upload"
    },
    {
        tabName: "peeker peeker-ic-navi-my",
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
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.cameraUpload.click();
            } else {
                alert("로그인이 필요한 서비스입니다.");
                return;
            }
        });
    };

    render() {
        let isNavPage =
            this.props.location.pathname === "/login" ||
            this.props.location.pathname === "/signup";
        const bottomNav = (
            <div className="row nav-btns-wrapper">
                {LinkText.map((link, i) => {
                    return i === 2 ? (
                        <div className="col-3 link-container">
                            <a
                                className={
                                    this.props.location.pathname === "upload"
                                        ? "active"
                                        : ""
                                }
                                onClick={this.handlePreWrite}
                            >
                                <span class="peeker peeker-ic-navi-upload" />
                            </a>

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
                            <NavLink
                                key={`link-${link.path}`}
                                to={link.path}
                                exact
                            >
                                <span className={link.tabName} />
                            </NavLink>
                        </div>
                    );
                })}
            </div>
        );

        return (
            <div className={cx("bottom-nav")}>
                {isNavPage ? null : bottomNav}
            </div>
        );
    }
}

export default withRouter(BottomNav);
