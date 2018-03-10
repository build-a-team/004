import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./MainPage.scss";
import classNames from "classnames/bind";
import BottomNav from "components/BottomNav";
import _ from "lodash";
import firebase from "config/firebase";
import Cards from "components/SwipeCard/Cards";
import Card from "components/SwipeCard/CardSwitcher";
import { log } from "ruucm-util";

const data = ["Alexandre", "Thomas", "Lucien"];
const CustomAlertLeft = () => {
    return <span>Nop</span>;
};
const CustomAlertRight = () => <span>Ok</span>;

const cx = classNames.bind(styles);

const rootRef = firebase.database().ref();
const feedsRef = rootRef.child("feeds");
const timeRef = firebase.database.ServerValue.TIMESTAMP;

class MainPage extends Component {
    state = {
        feeds: [],
        feed: {},
        user: {}
    };
    action(name) {
        console.log(name);
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            debugger;
            if (user) {
                this.setState({
                    user
                });
            } else {
                console.log("You are not signed in");
            }
        });
        
        feedsRef.on("value", snap => {
            const feeds = [];
            snap.forEach(shot => {
                feeds.push({ ...shot.val(), key: shot.key });
            });
            this.setState({
                feeds: feeds,
                feed: feeds[0]
            });
        });
    }

    sumRate(rates) {
        return _.reduce(
            rates,
            function(result, value, key) {
                return result + _.parseInt(value.rate);
            },
            0
        );
    }

    nextFeed = () => {
        this.setState({
            feeds: this.state.feeds.slice(1),
            feed: this.state.feeds.slice(1)[0]
        });
    };

    updateRateDown = () => {
        const { key } = this.state.feed;
        feedsRef
            .child(key)
            .child("rates")
            .push({
                id: this.state.user.uid,
                rate: -1
            });
        this.nextFeed();
    };

    updateRateUp = () => {
        const { key } = this.state.feed;
        feedsRef
            .child(key)
            .child("rates")
            .push({
                id: this.state.user.uid,
                rate: 1
            });
        this.nextFeed();
    };

    updateRateSkip = () => {
        const { key } = this.state.feed;
        feedsRef
            .child(key)
            .child("rates")
            .push({
                id: this.state.user.uid,
                rate: 0
            });
        this.nextFeed();
    };
    render() {
        return (
			<div className={cx("main-page")}>
            	<nav className={cx("main-nav")}>
					{
						_.map(this.state.feed.tags, tag => {
							return <button className="hash-tag">#{tag}}</button>
						})
					}
            	</nav>
                <div className="main-page-wrapper">
                  <div className="main-header">
					  <h1 className="main-title">Peeker</h1>
					  <button className="btn-skip">SIKP</button>
				  </div>
				  <div className="cards-wrapper">
					  <Cards
					    alertRight={<CustomAlertRight />} 
					    alertLeft={<CustomAlertLeft />} 
					    onEnd={this.action('end')}
					    className='master-root'>
					    {data.map((item, key) => 
					      <Card
					          key={key}
					          onSwipeLeft={()=>{this.action('swipe left!!!!!')}}
					          onSwipeRight={()=>{this.action('swipe right!!!!')}}>
					        <img src={this.state.feed.downloadURL} alt="" width="100%;" height="100%;" />
					      </Card>
					    )}

					  </Cards>
					  <span class="peeker peeker-ic-select-info"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
				  </div>
				</div>
                <div className="row select-btns-wrapper">
				  <div className="col-6">
				  	<button onClick={this.updateRateDown}>Stupid 😅</button>
				  </div>
				  <div className="col-6">
				  	<button onClick={this.updateRateUp}>Great 😍</button>
				  </div>
				</div>
            </div>
        );
    }
}

export default MainPage;
