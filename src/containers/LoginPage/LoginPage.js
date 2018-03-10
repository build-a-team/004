import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
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

    signupWithFacebook = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope("user_birthday");
        firebase.auth().languageCode = "fr_FR";
        provider.setCustomParameters({
            display: "popup"
        });

        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function(result) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...

                alert("Facebook 로그인");
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    };

    gotoMain = () => {
        this.props.history.push("/");
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
                        <div
                            className="form-group"
                            style={{ marginBottom: "20px" }}
                        >
                            <button className={cx("login-button")}>
                                로그인
                            </button>
                        </div>
                        <div
                            className="form-group row"
                            style={{ marginTop: "24px" }}
                        >
                            <div
                                className={cx("col-6")}
                                style={{ paddingRight: "0" }}
                            >
                                <button
                                    className={cx("facebook-login-button")}
                                    onClick={this.signupWithFacebook}
                                >
                                    페이스북으로 시작
                                </button>
                            </div>
                            <div className={cx("col-6")}>
                                <button
                                    className={cx("around-button")}
                                    onClick={this.gotoMain}
                                >
                                    둘러보기
                                </button>
                            </div>
                        </div>

                        <div
                            className={cx("help-text")}
                            style={{ marginTop: "48.5px" }}
                        >
                            <span>비밀번호 찾기</span>
                            <span> | </span>
                            <Link to="/signup">
                                <span>이메일로 회원가입</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginPage);
