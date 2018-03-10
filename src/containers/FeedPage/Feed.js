import React, { Component } from 'react';
import _ from 'lodash';
import firebase from 'config/firebase';

const rootRef = firebase.database().ref();
const feedsRef = rootRef.child('feeds');
const timeRef = firebase.database.ServerValue.TIMESTAMP;

class Feed extends Component {
    constructor(props) {
        super(props);
    }

    sumRate(rates) {
        return _.reduce(rates, function(result, value, key) {
            return result + _.parseInt(value);
        }, 0)
    }

    updateRateDown = () => {
        const { key } = this.props.data;
        feedsRef.child(key).child('rates').push({ id: timeRef, rate: -1 });
    }
    updateRateUp = (data) => {
        const { key } = this.props.data;
        feedsRef.child(key).child('rates').push({ id: timeRef, rate: 1 });
    }

    render() {
        return (
            <div>
                <div>
                    <img src={this.props.data.imageUrl} alt="" />
                </div>
                <div>{this.sumRate(this.props.data.rates)}</div>
                <div>
                    <button onClick={this.updateRateDown}>Up</button>
                    <button onClick={this.updateRateUp}>Down</button>
                </div>
            </div>
            
        );
    }
}

export default Feed;