import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./SignupPage.scss";
const cx = classNames.bind(styles);

class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    render() {
        return (
            <div className={cx("login-page")}>
                <h1>Signup Page</h1>
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

export default SignupPage;
