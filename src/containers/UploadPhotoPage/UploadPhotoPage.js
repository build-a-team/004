import React, { Component } from "react";
import uuidv1 from "uuid/v1";
import Select from "react-select";
import "react-select/dist/react-select.css";

import firebase from "config/firebase";
import classNames from "classnames/bind";
import styles from "./UploadPhotoPage.scss";
const cx = classNames.bind(styles);

class UploadPhotoPage extends Component {
    state = {
        downloadURL: "", // 파이어베이스에 업로드 된 URL
        src: "", // 미리보기 화면에 이미지를 띄우기 위한 로컬 경로,
        options: [
            { label: "무난", value: "notbad" },
            { label: "걸크러시", value: "girlCrush" },
            { label: "화사", value: "starry" },
            { label: "시크", value: "chic" },
            { label: "패션왕", value: "passionKing" }
        ],
        value: "",
        userId: ""
    };

    handlePreUpload = event => {
        const file = event.target.files[0];
        const nextState = {};
        const reader = new FileReader();
        reader.onload = e => {
            nextState.src = e.target.result;
            this.setState(nextState);
        };
        reader.readAsDataURL(file);
        this.setState({
            file
        });
    };

    // 업로드 이벤트
    handleUpload = () => {
        const { file } = this.state;
        const { name } = file;
        const storageRef = firebase.storage().ref();
        const metadata = {
            contentType: "image/jpeg"
        };

        const uploadTask = storageRef
            .child(`${name}${uuidv1()}`)
            .put(file, metadata);
        console.log(uploadTask);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    snapshot.bytesTransferred / snapshot.totalBytes * 100;
                console.log("Upload is " + progress + "% done");
                // switch (snapshot.state) {
                //     case firebase.storage.TaskState.PAUSED: // or 'paused'
                //         console.log("Upload is paused");
                //         break;
                //     case firebase.storage.TaskState.RUNNING: // or 'running'
                //         console.log("Upload is running");
                //         break;
                //     default:
                //         console.log("Upload status");
                // }
            },
            () => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                console.log("err");
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                // 파이어베이스에 받아오는 url.
                const downloadURL = uploadTask.snapshot.downloadURL;
                console.log(downloadURL);
                this.setState({
                    downloadURL
                });
                this.handlePostUpload();
            }
        );
    };

    // tag용 함수
    handleSelectChange = value => {
        this.setState({ value });
    };

    handlePostUpload = () => {
        const { userId, downloadURL } = this.state;

        const rootRef = firebase.database().ref();
        const tasksRef = rootRef.child("feeds");

        const feed = {
            userId,
            downloadURL
        };

        tasksRef.push(feed);
    };

    componentDidMount() {
        // const userInfo = firebase.auth().currentUser;
        // firebase
        //     .database()
        //     .ref("/feeds")
        //     .once("value")
        //     .then(snapshot => {
        //         const feedsObjectJson = snapshot.val();
        //         const feeds = new Map();
        //         for (const [key, value] of Object.entries(feedsObjectJson)) {
        //             feeds.set(key, value);
        //         }
        //         console.log(feeds);
        //     });
    }

    render() {
        return (
            <div className="App">
                <input
                    type="file"
                    capture="camera"
                    accept="image/*"
                    ref={input => {
                        this.cameraUpload = input;
                    }}
                    id="cameraInput"
                    name="cameraInput"
                    onChange={this.handlePreUpload}
                />
                <br />
                <img
                    src={this.state.src}
                    alt="미리보기"
                    height="300"
                    width="400"
                />
                <br />
                <Select
                    // closeOnSelect={!stayOpen}
                    // disabled={disabled}
                    multi
                    onChange={this.handleSelectChange}
                    options={this.state.options}
                    placeholder="태그를 입력해주세요"
                    // removeSelected={this.state.removeSelected}
                    // rtl={this.state.rtl}
                    simpleValue
                    value={this.state.value}
                />
                <br />
                <button onClick={this.handleUpload}>업로드하기</button>
            </div>
        );
    }
}

export default UploadPhotoPage;
