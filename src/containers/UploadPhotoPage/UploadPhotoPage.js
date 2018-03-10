import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import uuidv1 from "uuid/v1";
import { Creatable } from "react-select";
import "react-select/dist/react-select.css";

import firebase from "config/firebase";
import classNames from "classnames/bind";
import styles from "./UploadPhotoPage.scss";
const cx = classNames.bind(styles);

class UploadPhotoPage extends Component {
    state = {
        downloadURL: "", // 파이어베이스에 업로드 된 URL
        src: "", // 미리보기 화면에 이미지를 띄우기 위한 로컬 경로,
        options: [], // 파이어베이스에서 tag 리스트를 받아온다.
        value: "",
        email: ""
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
                this.setState({
                    downloadURL
                });
                this.handlePostUpload();
            }
        );
    };

    // tag용 함수
    handleSelectChange = value => {
        const comma = /\s*,\s*/;
        const tagList = value.split(comma);
        this.setState({ value, tagList });
    };

    handlePostUpload = () => {
        const { email, downloadURL, tagList } = this.state;

        const rootRef = firebase.database().ref();
        const feedsRef = rootRef.child("feeds");
        const tagsRef = rootRef.child("tags");

        const feed = {
            email,
            downloadURL,
            tagList
        };

        feedsRef.push(feed);

        const { tags } = this.state;

        for (const tag of tagList) {
            if (!tags || !tags.includes(tag)) {
                tagsRef.push(tag);
            }
        }
        this.props.history.push("/");
    };

    componentDidMount() {
        const updatingImage = this.props.location.state
            ? this.props.location.state.updatingImage
            : null;

        const nextState = {};
        const reader = new FileReader();
        reader.onload = e => {
            nextState.src = e.target.result;
            this.setState(nextState);
        };
        reader.readAsDataURL(updatingImage);

        this.setState({
            file: updatingImage
        });

        firebase.auth().onAuthStateChanged(({ email }) => {
            if (email) {
                this.setState({
                    email
                });
            } else {
                console.log("You are not signed in");
            }
        });

        firebase
            .database()
            .ref("/tags")
            .once("value")
            .then(snapshot => {
                const tagsJson = snapshot.val();
                let tags = [];
                for (const tag of Object.values(tagsJson)) {
                    tags = [...tags, tag];
                }
                const options = tags.map(tag => {
                    return {
                        label: tag,
                        value: tag
                    };
                });

                this.setState({
                    options,
                    tags
                });
            });
    }

    render() {
        return (
            <div className="App">
                {/* <input
                    type="file"
                    capture="camera"
                    accept="image/*"
                    ref={input => {
                        this.cameraUpload = input;
                    }}
                    id="cameraInput"
                    name="cameraInput"
                    onChange={this.handlePreUpload}
                /> */}
                <br />
                <img
                    src={this.state.src}
                    alt="미리보기"
                    height="300"
                    width="400"
                />
                <br />
                <Creatable
                    // closeOnSelect
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

export default withRouter(UploadPhotoPage);
