import React, { Component } from "react";
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

    render() {
        return (
            <div className={cx("signup-page")}>
                <h1>Signup Page</h1>
                <div className={cx("form")}>
                    <form onSubmit={event => this.handleSignup(event)}>
                        <div className="form-group">
                            <label>이메일</label>
                            <input
                                type="text"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>비밀번호</label>
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <button>회원가입</button>
                            <button onClick={this.signupWithFacebook}>
                                Facebook 으로 시작하기
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignupPage;
