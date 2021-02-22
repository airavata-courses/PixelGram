import React, { Component } from "react";
import {Dropdown} from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

export default class home extends Component {
    state = {
        selectedFile: null
    }
    fileSelectHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }
    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile,this.state.selectedFile.name);
        //axios.post();
          
       
    }
    
     render() {
        return (
            <div>

                <input type = "file" onChange= {this.fileSelectHandler}/>
                <button onClick={this.fileUploadHandler}>Upload</button>
            </div>
        )
     }}