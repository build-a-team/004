import React, { Component } from "react";
import { Link } from 'react-router-dom';
import styles from "./MainPage.scss";
import classNames from "classnames/bind";
import BottomNav from "components/BottomNav";
import _ from 'lodash';
import firebase from 'config/firebase';
const cx = classNames.bind(styles);

const rootRef = firebase.database().ref();
const feedsRef = rootRef.child('feeds');
const timeRef = firebase.database.ServerValue.TIMESTAMP;

class MainPage extends Component {
    state = { 
		feeds: [],
		feed: {}
	}

    componentDidMount() {
        feedsRef.on('value', snap => {
            const feeds = [];
            snap.forEach(shot => {
                feeds.push({ ...shot.val(), key: shot.key });
			});
			debugger;
            this.setState({
				feeds: feeds,
				feed: feeds[0]
			});
        });
    }

    sumRate(rates) {
        return _.reduce(rates, function(result, value, key) {
            return result + _.parseInt(value.rate);
        }, 0)
    }

    updateRateDown = () => {
        const { key } = this.state.feed;
        feedsRef.child(key).child('rates').push({ id: timeRef, rate: -1 });
	}
	
    updateRateUp = (data) => {
        const { key } = this.state.feed;
        feedsRef.child(key).child('rates').push({ id: timeRef, rate: 1 });
    }
	
    render() {
        return (
			<div className={cx("main-page")}>
            	<nav className={cx("main-nav")}>
					{
						_.map(this.state.feed.tags, tag => {
							return <button className="hash-tag">#{tag}}</button>
						})
					}
            		<button className="show-result"><Link to="/vote-result">결과보기</Link>{this.sumRate(this.state.feed.rates)}</button>
            	</nav>
                <div className="img">
					<img src={this.state.feed.downloadURL} alt="" width="100%;" height="100%;" />
				</div>
                <div className="row select-btns-wrapper">
				  <div className="col-6">
				  	<button onClick={this.updateRateDown}>스투핏</button>
				  </div>
				  <div className="col-6">
				  	<button onClick={this.updateRateUp}>그뤠잇</button>
				  </div>
				</div>
				<BottomNav></BottomNav>
            </div>
        );
    }
}

export default MainPage;
