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
        debugger;
        return _.reduce(rates, function(result, value, key) {
            return result + _.parseInt(value.rate);
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
                    <img src={this.props.data.downloadURL} alt="" width="100px;" height="100px;" />
                </div>
                <div>
                    {this.props.data.userId}
                </div>
                <div>{this.sumRate(this.props.data.rates)}</div>
                <div>
                    <button onClick={this.updateRateDown}>Down</button>
                    <button onClick={this.updateRateUp}>Up</button>
                </div>
            </div>
            
        );
    }
}

export default Feed;