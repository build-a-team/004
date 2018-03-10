import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import InputField from "components/UI/InputField";
import firebase from "config/firebase";
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

    handleLogin = ev => {
        let email = this.state.email,
            password = this.state.password;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                alert("로그인 성공");
                this.props.history.push("/");
            })
            .catch(error => {
                // Handle Errors here.

                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                if (errorCode === "auth/wrong-password") {
                    alert("Wrong password.");
                } else {
                    alert(errorMessage);
                }
            });

        ev.preventDefault();
    };

    render() {
        return (
            <div className={cx("login-page")}>
                <h1>Login Page</h1>
                <div className={cx("form")}>
                    <form onSubmit={this.handleLogin}>
                        <InputField
                            type="text"
                            name="email"
                            placeholder="이메일"
                            onChange={this.handleChange}
                        />
                        <InputField
                            type="password"
                            name="password"
                            placeholder="비밀번호"
                            onChange={this.handleChange}
                        />
                        <div className="form-group">
                            <button className={cx("login-button")}>
                                로그인
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginPage);
