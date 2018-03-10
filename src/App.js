import React, { Component } from "react";
import LoginPage from "containers/LoginPage";
import MainPage from "containers/MainPage";
import SignupPage from "containers/SignupPage";
import VoteResult from "containers/VoteResult";
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
                        <Route path="/vote-result" component={VoteResult} />
                        {/* Route Page */}
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
