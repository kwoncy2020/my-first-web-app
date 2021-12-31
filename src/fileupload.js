import React, { Component } from "react";
// We are using axios as the http library
import axios from "axios";
// import * as styles from "./FileUpload.module.css";

export default class FileUpload extends Component {
    // fileToUpload contains the actual file object
    // uploadSuccess becomes true when the file upload is complete
    state = {
        fileToUpload: undefined,
        uploadSuccess: undefined,
        error: undefined
    };
    uploadFile() {
        // When the upload file button is clicked, 
        // first we need to get the presigned URL
        // URL is the one you get from AWS API Gateway
        console.log(this.state.fileToUpload.name)
        axios(
            "https://vd219u8xdc.execute-api.ap-northeast-2.amazonaws.com/fileupload/presigned-url?fileName=" +
                this.state.fileToUpload.name        
        ).then(response => {
            // Getting the url from response
            console.log(`url: ${response.data.fileUploadURL}`)
            const url = response.data.fileUploadURL;
   
            // Initiating the PUT request to upload file    
            axios({
                method: "PUT",
                url: url,
                data: this.state.fileToUpload,
                headers: { "Content-Type": "multipart/form-data" }
            }).then(res => {
                    console.log(`put result: ${res}`)
                    this.setState({
                        uploadSuccess: "File upload successfull",
                        error: undefined
                    });
                })
                .catch(err => {
                    console.log(`err result: ${err}`)
                    this.setState({
                        error: "Error Occured while uploading the file",
                        uploadSuccess: undefined
                    });
                });
        });
    }
    render() {
        return (
            <div>
                {/* <div>
                    File Upload to S3 with Lambda, And React axios Application
                </div> */}
                <div>
                    <form>
                        <div className="form-group">
                            <input
                                type="file"
                                className="form-control-file"
                                id="fileUpload"
                                onChange={e => {
                                    this.setState({
                                        fileToUpload: e.target.files[0]
                                    });
                                }}
                            />
                            {this.state.fileToUpload ? (
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={e => {
                                        this.uploadFile();
                                    }}
                                >
                                    Upload to aws s3
                                </button>
                            ) : null}
                            <div>
                                <span>
                                    {this.state.uploadSuccess
                                        ? "File Upload Successfully"
                                        : ""}
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}