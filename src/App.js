import React, { Component } from "react";
import LoginPage from "containers/LoginPage";
import MainPage from "containers/MainPage";
import SignupPage from "containers/SignupPage";
import VoteResult from "containers/VoteResult";
import FeedPage from "containers/FeedPage";
<<<<<<< HEAD
import UploadPhotoPage from "containers/UploadPhotoPage";
=======
import MyPage from "containers/MyPage";
>>>>>>> my page style
import { BrowserRouter, Route, Switch } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./App.scss";

const cx = classNames.bind(styles);

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className={cx("app")}>
                    <Switch>
                        <Route path="/" exact component={MainPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/signup" component={SignupPage} />
                        <Route path="/upload" component={UploadPhotoPage} />
                        <Route path="/vote-result" component={VoteResult} />
                        <Route path="/feed" component={FeedPage} />
                        <Route path="/my-page" component={MyPage} />
                        {/* Route Page */}
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
