import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./LoginPage.scss";
const cx = classNames.bind(styles);

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    handleChange = ev => {
        this.setState({
            [ev.target.name]: ev.target.value
        });
    };

    render() {
        return (
            <div className={cx("login-page")}>
                <h1>Login Page</h1>
                <div className={cx("form")}>
                    <div className="form-group">
                        <label>이메일</label>
                        <input type="text" name="email" />
                    </div>
                    <div className="form-group">
                        <label>비밀번호</label>
                        <input type="password" name="password" />
                    </div>
                    <div className="form-group">
                        <button>로그인</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
