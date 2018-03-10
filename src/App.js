import React, { Component } from "react";
import LoginPage from "containers/LoginPage";
import MainPage from "containers/MainPage";
import SignupPage from "containers/SignupPage";
import VoteResult from "containers/VoteResult";
import FeedPage from "containers/FeedPage";
import UploadPhotoPage from "containers/UploadPhotoPage";
import MyPage from "containers/MyPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./App.scss";
import Cards from "components/SwipeCard/Cards";
import Card from "components/SwipeCard/CardSwitcher";
import { log } from "ruucm-util";

const cx = classNames.bind(styles);

const data = ["Alexandre", "Thomas", "Lucien"];
const CustomAlertLeft = () => <span>Nop</span>;
const CustomAlertRight = () => <span>Ok</span>;
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
