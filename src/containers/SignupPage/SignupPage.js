import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import InputField from "components/UI/InputField";
import firebase from "config/firebase";
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

    handleChange = ev => {
        this.setState({
            [ev.target.name]: ev.target.value
        });
    };

    handleSignup = ev => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(
                this.state.email,
                this.state.password
            )
            .then(response => {
                alert("가입완료");
                this.setState({
                    email: "",
                    password: ""
                });
                this.props.history.push("/");
                console.log(response);
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                if (errorCode === "auth/email-already-in-use") {
                    alert("이미 가입된 이메일 주소입니다.");
                } else if (errorCode === "auth/invalid-email") {
                    alert("유효하지않은 이메일 주소입니다.");
                } else if (errorCode === "auth/weak-password") {
                    alert("비밀번호 강도가 약합니다.");
                }
            });

        ev.preventDefault();
    };

    render() {
        return (
            <div className={cx("signup-page")}>
                <h1>Signup Page</h1>
                <div className={cx("form")}>
                    <form onSubmit={this.handleLogin}>
                        <InputField
                            type="text"
                            name="email"
                            placeholder="이메일"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <InputField
                            type="password"
                            name="password"
                            placeholder="비밀번호"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <div
                            className="form-group"
                            style={{ marginBottom: "20px" }}
                        >
                            <button
                                className={cx("login-button")}
                                onClick={this.handleSignup}
                            >
                                회원가입
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(SignupPage);
