import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./BottomNav.scss";
import classNames from "classnames/bind";
import { Link, NavLink } from "react-router-dom";
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
    constructor(props) {
        super(props);
        this.state = {
            currentIdx: this.props.currentIdxs
        };
    }
    render() {
        let isNavPage =
            this.props.location.pathname === "/login" ||
            this.props.location.pathname === "/signup";
        const bottomNav = (
            <div className="row nav-btns-wrapper">
                {LinkText.map(link => {
                    return (
                        <div className="col-3 link-container">
                            <NavLink
                                key={`link-${link.path}`}
                                to={link.path}
                                exact
                                // style={{
                                // 	color: this.state.currentIdx === link.idx ? '#1d20ff' : '#d8d8d8',
                                // 	borderTop: `2px solid ${this.state.currentIdx === link.idx ? '#1d20ff' : 'transparent'}`,
                                // 	...linkStyles.link,
                                // }}
                            >
                                {link.tabName}
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
